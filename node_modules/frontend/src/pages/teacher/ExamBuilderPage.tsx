import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, GripVertical, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { useAppStore } from '@/stores/appStore';

export default function ExamBuilderPage() {
  const data = useAppStore((s) => s.data);

  const [examTitle, setExamTitle] = useState('Unit Assessment');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>(5);

  const available = data.questions.filter((q) => {
    if (q.status !== 'published') return false;
    if (gradeFilter !== 'all' && q.grade !== gradeFilter) return false;
    return !selectedIds.includes(q.id);
  });

  const selected = selectedIds
    .map((id) => data.questions.find((q) => q.id === id))
    .filter(Boolean);

  const addQuestion = (id: string) => setSelectedIds((prev) => [...prev, id]);
  const removeQuestion = (id: string) => setSelectedIds((prev) => prev.filter((x) => x !== id));

  const moveQuestion = (index: number, direction: -1 | 1) => {
    const next = index + direction;
    if (next < 0 || next >= selectedIds.length) return;
    setSelectedIds((prev) => {
      const copy = [...prev];
      [copy[index], copy[next]] = [copy[next]!, copy[index]!];
      return copy;
    });
  };

  const totalPoints = selected.length * 10;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Exam Builder</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Click questions to add them to your exam. Reorder with arrow buttons.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Question Pool</CardTitle>
              <CardDescription>Published questions available to add</CardDescription>
            </CardHeader>
            <div className="mb-4">
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="h-10 w-full rounded-xl border border-outline-variant px-3"
              >
                <option value="all">All grades</option>
                {[5, 6, 7, 8].map((g) => (
                  <option key={g} value={g}>Grade {g}</option>
                ))}
              </select>
            </div>
            <div className="max-h-96 space-y-2 overflow-y-auto">
              {available.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => addQuestion(q.id)}
                  className="flex w-full items-start gap-2 rounded-xl border border-outline-variant p-3 text-left transition hover:border-primary hover:bg-primary-fixed/30"
                >
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-on-surface-variant" />
                  <div>
                    <p className="text-body-md">{q.questionText}</p>
                    <Badge variant="outline" className="mt-1 normal-case">{q.topic}</Badge>
                  </div>
                </button>
              ))}
              {available.length === 0 && (
                <p className="py-8 text-center text-on-surface-variant">No more questions available.</p>
              )}
            </div>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Exam Preview</CardTitle>
              <CardDescription>{selected.length} questions · {totalPoints} total points</CardDescription>
            </CardHeader>
            <Input label="Exam title" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} />
            <div className="mt-4 space-y-2">
              {selected.map((q, i) => (
                <div
                  key={q!.id}
                  className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-low p-3"
                >
                  <GripVertical className="h-4 w-4 shrink-0 text-on-surface-variant" />
                  <span className="w-6 shrink-0 text-label-sm font-bold text-on-surface-variant">{i + 1}.</span>
                  <p className="min-w-0 flex-1 truncate text-body-md">{q!.questionText}</p>
                  <div className="flex shrink-0 gap-1">
                    <Button variant="ghost" size="icon" onClick={() => moveQuestion(i, -1)} disabled={i === 0}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => moveQuestion(i, 1)} disabled={i === selectedIds.length - 1}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeQuestion(q!.id)}>
                      <Trash2 className="h-4 w-4 text-error" />
                    </Button>
                  </div>
                </div>
              ))}
              {selected.length === 0 && (
                <p className="py-8 text-center text-on-surface-variant">Click questions from the pool to build your exam.</p>
              )}
            </div>
            {selected.length > 0 && (
              <div className="mt-4 flex gap-3">
                <Link to="/teacher/assignments/new" className="flex-1">
                  <Button className="w-full">Create Assignment from Exam</Button>
                </Link>
              </div>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
}
