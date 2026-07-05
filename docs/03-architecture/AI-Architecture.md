# AI Architecture — MathBattle

**Version:** 1.0.0

---

## Purpose

This document defines the architecture of the MathBattle AI engine, including question generation, weakness analysis, difficulty estimation, duplicate detection, and personalized recommendations. The AI engine is an assistant to teachers and students — it does not make autonomous decisions about student learning without human oversight.

---

## AI Design Principles

1. **Human review required.** All AI-generated questions enter `pending_review` status. A teacher must approve before any question is used in a student-facing context.
2. **Transparency.** AI recommendations surface their reasoning (e.g., "Recommended because you scored < 60% on Fractions in the last 3 lessons").
3. **Graceful degradation.** If the AI provider is unavailable, the platform falls back to rule-based recommendations and manual question creation. No feature is blocked entirely.
4. **Privacy by design.** No student PII is sent to the AI provider. Prompts use anonymized identifiers and aggregated performance data only.
5. **Token budget enforcement.** Each AI request has a maximum token budget to control costs and prevent abuse.
6. **Provider abstraction.** The AI client is abstracted behind an interface to allow provider switching without application changes.

---

## AI Engine Components

```
Diagram: AI Engine Architecture

┌─────────────────────────────────────────────────────────────────────────────┐
│                              AI Engine                                      │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                        AI Service Interface                          │  │
│  │  (Provider-agnostic; implementations: OpenAI, Anthropic, local)      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│  ┌──────────────┐  ┌──────────────┐│  ┌──────────────┐  ┌──────────────┐  │
│  │  Question    │  │  Weakness    ││  │  Difficulty  │  │  Duplicate   │  │
│  │  Generator   │  │  Analyzer    ││  │  Estimator   │  │  Detector    │  │
│  └──────┬───────┘  └──────┬───────┘│  └──────┬───────┘  └──────┬───────┘  │
│         │                 │        │          │                  │          │
│  ┌──────▼─────────────────▼────────▼──────────▼──────────────────▼───────┐ │
│  │                      Prompt Builder                                    │ │
│  │  - Template engine (Handlebars/Mustache)                               │ │
│  │  - Parameter injection (grade, topic, bloom_level, difficulty)         │ │
│  │  - Safety filters (no PII, no harmful content)                         │ │
│  │  - Token budget calculation                                            │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                        │
│  ┌─────────────────────────────────▼──────────────────────────────────────┐ │
│  │                      AI Provider Client                                │ │
│  │  - HTTP client with retry (3 attempts, exponential backoff)            │ │
│  │  - Timeout: 30 seconds                                                 │ │
│  │  - Response parser and validator                                       │ │
│  │  - Token usage tracker                                                 │ │
│  │  - Error classifier (retryable vs. non-retryable)                      │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                        │
│  ┌─────────────────────────────────▼──────────────────────────────────────┐ │
│  │                      Response Processor                                │ │
│  │  - Parse AI output into question objects                               │ │
│  │  - Validate required fields                                            │ │
│  │  - Run duplicate detection                                             │ │
│  │  - Run difficulty estimation                                           │ │
│  │  - Set status = pending_review                                         │ │
│  │  - Write to questions table                                            │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## AI Functions

### 1. Question Generation

**Purpose:** Generate curriculum-aligned questions from teacher-specified parameters.

**Input Parameters:**
- grade (1–12)
- subject (e.g., "Mathematics")
- topic (e.g., "Fractions")
- subtopic (optional, e.g., "Adding unlike fractions")
- bloom_level (remember | understand | apply | analyze | evaluate | create)
- difficulty (1–5)
- quantity (1–20)
- question_type (multiple_choice | true_false | short_answer)
- additional_instructions (optional, max 500 chars)

**Prompt Template Structure:**
```
You are a mathematics curriculum expert creating questions for Grade {grade} students.

Topic: {topic}
Subtopic: {subtopic}
Bloom's Taxonomy Level: {bloom_level}
Difficulty: {difficulty}/5
Question Type: {question_type}
Quantity: {quantity}

Generate {quantity} {question_type} questions about {topic}.
Each question must:
- Be appropriate for Grade {grade} students
- Match Bloom's level: {bloom_level}
- Have difficulty {difficulty}/5
- Include 4 answer options (for multiple choice)
- Mark the correct answer
- Include a brief solution explanation
- Include 1-2 hints

Return as JSON array: [{question_text, options, correct_answer, solution_explanation, hints}]
```

**Output Processing:**
1. Parse JSON response
2. Validate each question has required fields
3. Run duplicate detection (semantic similarity against existing questions)
4. Estimate difficulty (validate against requested difficulty)
5. Set status = `pending_review`
6. Store in questions table with `ai_generated = true`

**Rate Limits:** 20 requests/hour per teacher; max 20 questions per request

**Fallback:** If AI provider unavailable, return 503 with message "AI generation temporarily unavailable. You can create questions manually."

---

### 2. Weakness Analysis

**Purpose:** Identify a student's weak topics based on their answer history to inform AI recommendations.

**Trigger:** Async job queued after every lesson completion.

**Input Data (anonymized):**
- Student ID (internal, not sent to AI provider)
- Last 30 lesson attempts: topic, score_percentage, correct_answers, incorrect_answers
- Last 10 match results: topics covered, accuracy per topic

**Analysis Logic (rule-based first, AI-enhanced in Phase 2):**

Phase 1 (rule-based):
1. Group answer history by topic
2. Calculate accuracy per topic (correct / total)
3. Topics with accuracy < 60% flagged as weak
4. Topics with accuracy < 40% flagged as critical
5. Topics not attempted in 14 days flagged as at-risk

Phase 2 (AI-enhanced):
- Send aggregated performance data (no PII) to AI for pattern analysis
- AI identifies non-obvious weakness patterns (e.g., "struggles with word problems across all topics")

**Output:**
```json
{
  "student_id": "internal_id",
  "weak_topics": [
    { "topic": "Fractions", "accuracy": 0.45, "severity": "critical" },
    { "topic": "Decimals", "accuracy": 0.58, "severity": "weak" }
  ],
  "at_risk_topics": ["Percentages"],
  "analysis_date": "2024-01-01T00:00:00Z"
}
```

**Storage:** Stored in `ai_recommendations` table; used by recommendation engine.

---

### 3. Next-Activity Recommendation

**Purpose:** Recommend the most beneficial next learning activity for a student.

**Logic:**
1. Retrieve student's current learning path position
2. Retrieve weakness analysis results
3. If critical weakness exists: recommend practice for that topic (even if not next in path)
4. If no critical weakness: recommend next item in learning path
5. If all path items complete: recommend challenge or match

**Response:**
```json
{
  "recommendation_type": "practice",
  "lesson_id": "uuid",
  "reason": "You scored 45% on Fractions in your last lesson. More practice will help.",
  "confidence": 0.85
}
```

**Fallback:** If no weakness data available, return next item in learning path.

---

### 4. Difficulty Estimation

**Purpose:** Validate or assign a difficulty score (1–5) to a question.

**Method (Phase 1):** Rule-based heuristics:
- Question length and complexity
- Number of steps required to solve
- Bloom's taxonomy level mapping
- Grade-level vocabulary analysis

**Method (Phase 2):** AI-based estimation using performance data from students who have answered the question.

**Output:** Difficulty score (1–5) with confidence level.

---

### 5. Duplicate Detection

**Purpose:** Prevent duplicate questions from entering the question bank.

**Method:**
1. Exact match: normalize question text (lowercase, remove punctuation), check for exact match in same grade/topic
2. Semantic similarity (Phase 2): embedding-based similarity score; threshold configurable (default: 0.85)

**Output:**
```json
{
  "is_duplicate": false,
  "similar_questions": [
    { "question_id": "uuid", "similarity_score": 0.72, "question_text": "..." }
  ]
}
```

**Threshold:** Questions with similarity > 0.85 are flagged as duplicates. Teacher must confirm before proceeding.

---

### 6. Document Import AI Processing

**Purpose:** Extract questions from uploaded PDF or Word documents.

**Process:**
1. Extract text from document (PDF: pdfjs or similar; Word: mammoth or similar)
2. Send extracted text to AI with prompt: "Identify and extract all questions from this text. Return as structured JSON."
3. Parse AI response into question objects
4. Run validation, duplicate detection, difficulty estimation
5. Set all imported questions to `pending_review`

**Supported Formats:** PDF, DOCX, XLSX, CSV
**File Size Limit:** 10MB
**Processing:** Async (background job); teacher notified on completion

---

## AI Job Queue Architecture

```
Teacher Request
      │
      ▼
REST API ──► Job Queue (BullMQ) ──► AI Worker ──► AI Provider
                                         │
                                         ▼
                                   Response Processor
                                         │
                                         ▼
                                   questions table (pending_review)
                                         │
                                         ▼
                                   Notification → Teacher
```

**Job Types:**
- `generate_questions` — question generation request
- `analyze_weakness` — student weakness analysis (triggered after lesson completion)
- `import_document` — document import processing
- `estimate_difficulty` — difficulty estimation for new questions

**Job Configuration:**
- Max attempts: 3
- Backoff: exponential (1s, 2s, 4s)
- Timeout: 60 seconds per job
- Dead-letter queue: failed jobs after 3 attempts; alert sent to operations team

---

## AI Provider Abstraction

```typescript
interface AIProvider {
  generateQuestions(params: GenerateQuestionsParams): Promise<GeneratedQuestion[]>;
  analyzeText(text: string, prompt: string): Promise<string>;
  estimateDifficulty(question: QuestionInput): Promise<DifficultyEstimate>;
}

// Implementations:
class OpenAIProvider implements AIProvider { ... }
class AnthropicProvider implements AIProvider { ... }
class MockAIProvider implements AIProvider { ... } // for testing
```

**Provider Selection:** Configured via environment variable `AI_PROVIDER`. Switching providers requires no application code changes.

---

## Privacy Controls for AI

| Control | Implementation |
|---|---|
| No student PII in prompts | Student ID replaced with internal anonymous ID; no names, emails, or DOB |
| No question answers in prompts | Correct answers not included in weakness analysis prompts |
| Data retention at provider | Review provider's data retention policy; use zero-retention API option if available |
| Prompt logging | Prompts logged internally (without PII) for debugging; 90-day retention |
| Response logging | AI responses logged for quality review; 90-day retention |

---

## AI Quality Metrics

| Metric | Target | Measurement |
|---|---|---|
| Question acceptance rate | ≥ 75% | Teacher review events |
| Duplicate detection precision | ≥ 90% | Manual audit sample |
| Recommendation click-through rate | ≥ 50% | Student action events |
| Difficulty estimation accuracy | ±1 level vs. teacher rating | Teacher feedback events |
| Generation latency (5 questions) | ≤ 15 seconds | Job queue timing |

---

*See `Component-Architecture.md` for AI Worker component details and `Queue-and-Jobs-Architecture.md` for job queue configuration.*
