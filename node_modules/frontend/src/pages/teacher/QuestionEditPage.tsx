import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/stores/appStore';
import type { BloomLevel, QuestionOption, QuestionType } from '@/types';

const emptyOption = (): QuestionOption => ({ text: '', isCorrect: false });

export default function QuestionEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);
  const addQuestion = useAppStore((s) => s.addQuestion);
  const updateQuestion = useAppStore((s) => s.updateQuestion);
  const publishQuestion = useAppStore((s) => s.publishQuestion);

  const isNew = id === 'new';
  const existing = !isNew ? data.questions.find((q) => q.id === id) : null;

  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>('multiple_choice');
  const [options, setOptions] = useState<QuestionOption[]>([
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [grade, setGrade] = useState(5);
  const [topic, setTopic] = useState('');
  const [unit, setUnit] = useState('');
  const [difficulty, setDifficulty] = useState(2);
  const [bloomLevel, setBloomLevel] = useState<BloomLevel>('apply');
  const [solutionExplanation, setSolutionExplanation] = useState('');
  const [hint, setHint] = useState('');

  useEffect(() => {
    if (existing) {
      setQuestionText(existing.questionText);
      setQuestionType(existing.questionType);
      setOptions(existing.options ?? [emptyOption(), emptyOption()]);
      setCorrectAnswer(existing.correctAnswer ?? '');
      setGrade(existing.grade);
      setTopic(existing.topic);
      setUnit(existing.unit);
      setDifficulty(existing.difficulty);
      setBloomLevel(existing.bloomLevel);
      setSolutionExplanation(existing.solutionExplanation);
      setHint(existing.hints[0] ?? '');
    }
  }, [existing]);

  const setCorrectOption = (index: number) => {
    setOptions((opts) => opts.map((o, i) => ({ ...o, isCorrect: i === index })));
  };

  const handleSave = (andPublish = false) => {
    if (!questionText.trim() || !topic.trim()) return;

    const payload = {
      questionText: questionText.trim(),
      questionType,
      options: questionType === 'multiple_choice' ? options.filter((o) => o.text.trim()) : undefined,
      correctAnswer: questionType !== 'multiple_choice' ? correctAnswer : undefined,
      grade,
      subject: 'Mathematics',
      topic: topic.trim(),
      unit: unit.trim() || topic.trim(),
      difficulty,
      bloomLevel,
      hints: hint ? [hint] : [],
      solutionExplanation: solutionExplanation.trim() || 'See teacher notes.',
      tags: [topic.toLowerCase()],
      status: andPublish ? ('published' as const) : existing?.status ?? ('draft' as const),
      aiGenerated: false,
      createdBy: user.id,
    };

    if (isNew) {
      const q = addQuestion(payload);
      if (andPublish) publishQuestion(q.id);
    } else if (existing) {
      updateQuestion(existing.id, payload);
      if (andPublish) publishQuestion(existing.id);
    }
    navigate('/teacher/questions');
  };

  if (!isNew && !existing) {
    return (
      <div className="py-16 text-center">
        <p className="text-on-surface-variant">Question not found.</p>
        <Link to="/teacher/questions" className="mt-4 text-primary hover:underline">Back to question bank</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <Link to="/teacher/questions" className="mb-4 inline-flex items-center gap-2 text-label-md text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Question bank
        </Link>
        <h1 className="text-headline-lg font-bold text-on-surface">
          {isNew ? 'Create Question' : 'Edit Question'}
        </h1>
        {existing && (
          <Badge variant="outline" className="mt-2 normal-case capitalize">{existing.status.replace('_', ' ')}</Badge>
        )}
      </div>

      <Card className="space-y-5">
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
          <CardDescription>All questions require teacher review before publishing to students.</CardDescription>
        </CardHeader>

        <div className="flex flex-col gap-1.5">
          <label className="text-label-md font-medium">Question text</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={3}
            className="rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-label-md font-medium">Type</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as QuestionType)}
              className="h-11 rounded-xl border border-outline-variant px-3"
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="true_false">True / False</option>
              <option value="short_answer">Short Answer</option>
            </select>
          </div>
          <Input label="Grade" type="number" min={1} max={12} value={grade} onChange={(e) => setGrade(Number(e.target.value))} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />
          <Input label="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Difficulty (1-5)" type="number" min={1} max={5} value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))} />
          <div className="flex flex-col gap-1.5">
            <label className="text-label-md font-medium">Bloom Level</label>
            <select value={bloomLevel} onChange={(e) => setBloomLevel(e.target.value as BloomLevel)} className="h-11 rounded-xl border border-outline-variant px-3">
              {(['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'] as BloomLevel[]).map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {questionType === 'multiple_choice' && (
          <div>
            <p className="mb-3 text-label-md font-medium">Answer Options</p>
            <div className="space-y-2">
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="radio" name="correct" checked={opt.isCorrect} onChange={() => setCorrectOption(i)} />
                  <input
                    value={opt.text}
                    onChange={(e) => setOptions((opts) => opts.map((o, j) => j === i ? { ...o, text: e.target.value } : o))}
                    placeholder={`Option ${i + 1}`}
                    className="h-10 flex-1 rounded-lg border border-outline-variant px-3"
                  />
                  {options.length > 2 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => setOptions((opts) => opts.filter((_, j) => j !== i))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setOptions((opts) => [...opts, emptyOption()])}>
                <Plus className="h-4 w-4" /> Add option
              </Button>
            </div>
          </div>
        )}

        {(questionType === 'true_false' || questionType === 'short_answer') && (
          <Input
            label={questionType === 'true_false' ? 'Correct answer (true/false)' : 'Correct answer'}
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        )}

        <Input label="Hint" value={hint} onChange={(e) => setHint(e.target.value)} />
        <div className="flex flex-col gap-1.5">
          <label className="text-label-md font-medium">Solution explanation</label>
          <textarea
            value={solutionExplanation}
            onChange={(e) => setSolutionExplanation(e.target.value)}
            rows={2}
            className="rounded-xl border border-outline-variant px-4 py-3 focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => navigate('/teacher/questions')}>Cancel</Button>
          <Button variant="secondary" onClick={() => handleSave(false)}>Save Draft</Button>
          <Button onClick={() => handleSave(true)}>Save & Publish</Button>
        </div>
      </Card>
    </div>
  );
}
