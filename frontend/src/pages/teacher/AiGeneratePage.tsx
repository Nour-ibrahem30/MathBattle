import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/stores/appStore';
import type { Question } from '@/types';

export default function AiGeneratePage() {
  const generateAiQuestions = useAppStore((s) => s.generateAiQuestions);

  const [grade, setGrade] = useState(5);
  const [topic, setTopic] = useState('Fractions');
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Question[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    try {
      const questions = await generateAiQuestions({ grade, topic, count });
      setResults(questions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">AI Question Generator</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Generate draft questions for teacher review. All AI content requires approval before publishing.
        </p>
      </div>

      <Card variant="ai">
        <div className="flex items-start gap-3">
          <Sparkles className="h-6 w-6 shrink-0 text-secondary" />
          <p className="text-body-md text-on-surface-variant">
            Generated questions are saved as drafts. Review each question in the Question Bank before assigning to students.
          </p>
        </div>
      </Card>

      <form onSubmit={handleGenerate}>
        <Card className="space-y-5">
          <CardHeader>
            <CardTitle>Generation Parameters</CardTitle>
            <CardDescription>Specify grade level, topic, and number of questions.</CardDescription>
          </CardHeader>

          <Input label="Grade" type="number" min={1} max={12} value={grade} onChange={(e) => setGrade(Number(e.target.value))} />
          <Input label="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Fractions, Algebra" required />
          <Input label="Number of questions" type="number" min={1} max={10} value={count} onChange={(e) => setCount(Number(e.target.value))} />

          <Button type="submit" loading={loading} className="w-full" size="lg">
            <Sparkles className="h-4 w-4" /> Generate Questions
          </Button>
        </Card>
      </form>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Generated {results.length} Questions
            </CardTitle>
            <CardDescription>Saved as drafts — review and publish from the Question Bank.</CardDescription>
          </CardHeader>
          <div className="space-y-3">
            {results.map((q) => (
              <div key={q.id} className="rounded-xl border border-outline-variant p-4">
                <p className="font-medium">{q.questionText}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className="normal-case">Grade {q.grade}</Badge>
                  <Badge variant="secondary" className="normal-case">{q.topic}</Badge>
                  <Badge variant="warning" className="normal-case">Draft</Badge>
                </div>
              </div>
            ))}
          </div>
          <Link to="/teacher/questions" className="mt-4 inline-block text-label-md text-primary hover:underline">
            Review in Question Bank →
          </Link>
        </Card>
      )}
    </div>
  );
}
