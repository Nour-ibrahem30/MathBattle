import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lightbulb, Trophy } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/stores/appStore';
import type { Lesson, Question } from '@/types';

function findLesson(units: { lessons: Lesson[] }[], lessonId: string): Lesson | null {
  for (const unit of units) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
}

function getLessonQuestions(questions: Question[], lesson: Lesson, pathGrade: number): Question[] {
  const published = questions.filter((q) => q.status === 'published' && q.grade === pathGrade);
  const count = Math.min(lesson.questionCount, published.length);
  return published.slice(0, count);
}

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = useAppStore((s) => s.data);
  const isLessonLocked = useAppStore((s) => s.isLessonLocked);
  const startLessonAttempt = useAppStore((s) => s.startLessonAttempt);
  const submitAnswer = useAppStore((s) => s.submitAnswer);
  const completeLessonAttempt = useAppStore((s) => s.completeLessonAttempt);

  const lesson = id ? findLesson(data.learningPath.units, id) : null;
  const questions = useMemo(
    () => (lesson ? getLessonQuestions(data.questions, lesson, data.learningPath.grade) : []),
    [lesson, data.questions, data.learningPath.grade],
  );

  const [phase, setPhase] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [questionStart, setQuestionStart] = useState(Date.now());
  const [results, setResults] = useState<{ score: number; xp: number } | null>(null);

  const currentQuestion = questions[currentIndex];
  const locked = lesson ? isLessonLocked(lesson) : false;

  useEffect(() => {
    setQuestionStart(Date.now());
    setSelectedAnswer(null);
    setShowHint(false);
  }, [currentIndex]);

  if (!lesson || !id) {
    return (
      <EmptyState
        title="Lesson not found"
        description="This lesson does not exist."
        actionLabel="Back to learning"
        onAction={() => navigate('/learn')}
      />
    );
  }

  if (locked) {
    return (
      <EmptyState
        title="Lesson locked"
        description="Complete the prerequisite lesson with at least 60% to unlock this content."
        actionLabel="View path"
        onAction={() => navigate(`/learn/paths/${data.learningPath.id}`)}
      />
    );
  }

  const handleStart = () => {
    const aid = startLessonAttempt(lesson.id);
    setAttemptId(aid);
    setPhase('quiz');
    setCurrentIndex(0);
  };

  const checkAnswer = (question: Question, answer: string): boolean => {
    if (question.questionType === 'multiple_choice' || question.questionType === 'true_false') {
      const opt = question.options?.find((o) => o.text === answer);
      if (opt) return opt.isCorrect;
      if (question.questionType === 'true_false') {
        return answer.toLowerCase() === question.correctAnswer?.toLowerCase();
      }
    }
    if (question.questionType === 'short_answer') {
      return answer.trim().toLowerCase() === question.correctAnswer?.trim().toLowerCase();
    }
    return false;
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !attemptId || !currentQuestion) return;
    const timeTaken = Math.round((Date.now() - questionStart) / 1000);
    const correct = checkAnswer(currentQuestion, selectedAnswer);
    submitAnswer(attemptId, currentQuestion.id, selectedAnswer, correct, timeTaken);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      const res = completeLessonAttempt(attemptId);
      setResults(res);
      setPhase('results');
    }
  };

  const renderAnswerOptions = (question: Question) => {
    if (question.questionType === 'true_false') {
      return ['True', 'False'].map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setSelectedAnswer(opt.toLowerCase())}
          className={`w-full rounded-xl border px-4 py-3 text-left text-body-md transition ${
            selectedAnswer === opt.toLowerCase()
              ? 'border-primary bg-primary-fixed font-medium'
              : 'border-outline-variant hover:border-primary/50'
          }`}
        >
          {opt}
        </button>
      ));
    }
    if (question.questionType === 'short_answer') {
      return (
        <input
          type="text"
          value={selectedAnswer ?? ''}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          className="h-11 w-full rounded-xl border border-outline-variant px-4 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
          placeholder="Type your answer"
        />
      );
    }
    return question.options?.map((opt) => (
      <button
        key={opt.text}
        type="button"
        onClick={() => setSelectedAnswer(opt.text)}
        className={`w-full rounded-xl border px-4 py-3 text-left text-body-md transition ${
          selectedAnswer === opt.text
            ? 'border-primary bg-primary-fixed font-medium'
            : 'border-outline-variant hover:border-primary/50'
        }`}
      >
        {opt.text}
      </button>
    ));
  };

  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <Link to={`/learn/paths/${data.learningPath.id}`} className="inline-flex items-center gap-2 text-label-md text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to path
        </Link>
        <Card>
          <CardHeader>
            <Badge variant="outline" className="mb-2 w-fit normal-case">{lesson.type.replace('_', ' ')}</Badge>
            <CardTitle>{lesson.title}</CardTitle>
            <CardDescription>{lesson.description ?? `Complete ${questions.length} questions to finish this lesson.`}</CardDescription>
          </CardHeader>
          <ul className="mb-6 space-y-2 text-body-md text-on-surface-variant">
            <li>• {questions.length} questions</li>
            <li>• Earn XP based on your score</li>
            <li>• Score 60%+ to unlock the next lesson</li>
          </ul>
          <Button size="lg" onClick={handleStart} disabled={questions.length === 0}>
            Start Lesson
          </Button>
        </Card>
      </div>
    );
  }

  if (phase === 'results' && results) {
    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <Card variant="hero" className="text-center">
          <Trophy className="mx-auto mb-4 h-12 w-12" />
          <h1 className="text-headline-lg font-bold">Lesson Complete!</h1>
          <p className="mt-2 text-white/80">Great work on {lesson.title}</p>
          <div className="mt-6 flex justify-center gap-8">
            <div>
              <p className="text-3xl font-bold">{results.score}%</p>
              <p className="text-sm text-white/70">Score</p>
            </div>
            <div>
              <p className="text-3xl font-bold">+{results.xp}</p>
              <p className="text-sm text-white/70">XP Earned</p>
            </div>
          </div>
        </Card>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" onClick={() => { setPhase('intro'); setResults(null); setAttemptId(null); }}>
            Retry Lesson
          </Button>
          <Button className="flex-1" onClick={() => navigate(`/learn/paths/${data.learningPath.id}`)}>
            Continue Path
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="normal-case">Question {currentIndex + 1} of {questions.length}</Badge>
        <ProgressBar className="w-32" value={currentIndex + 1} max={questions.length} variant="secondary" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="!text-body-lg">{currentQuestion?.questionText}</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {currentQuestion && renderAnswerOptions(currentQuestion)}
        </div>
        {currentQuestion && currentQuestion.hints.length > 0 && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-label-md text-secondary hover:underline"
            >
              <Lightbulb className="h-4 w-4" /> {showHint ? 'Hide hint' : 'Show hint'}
            </button>
            {showHint && (
              <p className="mt-2 rounded-lg bg-secondary-fixed p-3 text-body-md text-secondary">{currentQuestion.hints[0]}</p>
            )}
          </div>
        )}
        <Button className="mt-6 w-full" size="lg" disabled={!selectedAnswer} onClick={handleSubmit}>
          {currentIndex + 1 < questions.length ? 'Next Question' : 'Finish Lesson'}
          <CheckCircle2 className="h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
}
