import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, FileText, Plus, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/stores/appStore';
import type { QuestionStatus } from '@/types';

export default function QuestionBankPage() {
  const data = useAppStore((s) => s.data);
  const publishQuestion = useAppStore((s) => s.publishQuestion);

  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<QuestionStatus | 'all'>('all');
  const [topicFilter, setTopicFilter] = useState('all');

  const topics = useMemo(
    () => [...new Set(data.questions.map((q) => q.topic))].sort(),
    [data.questions],
  );

  const filtered = data.questions.filter((q) => {
    if (search && !q.questionText.toLowerCase().includes(search.toLowerCase())) return false;
    if (gradeFilter !== 'all' && q.grade !== gradeFilter) return false;
    if (statusFilter !== 'all' && q.status !== statusFilter) return false;
    if (topicFilter !== 'all' && q.topic !== topicFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">Question Bank</h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Browse, filter, and manage your question library.
          </p>
        </div>
        <Link to="/teacher/questions/new">
          <Button>
            <Plus className="h-4 w-4" /> New Question
          </Button>
        </Link>
      </div>

      <Card className="!p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="search"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low pl-10 pr-4 focus:border-primary focus:outline-none"
            />
          </div>
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="h-11 rounded-xl border border-outline-variant bg-surface-container-low px-3"
          >
            <option value="all">All grades</option>
            {[5, 6, 7, 8].map((g) => (
              <option key={g} value={g}>Grade {g}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as QuestionStatus | 'all')}
            className="h-11 rounded-xl border border-outline-variant bg-surface-container-low px-3"
          >
            <option value="all">All statuses</option>
            <option value="draft">Draft</option>
            <option value="pending_review">Pending Review</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="h-11 rounded-xl border border-outline-variant bg-surface-container-low px-3"
          >
            <option value="all">All topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/60 bg-surface-container-low">
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Question</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Grade</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Topic</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Difficulty</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Status</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <tr key={q.id} className="border-b border-outline-variant/30">
                  <td className="max-w-xs px-6 py-4">
                    <p className="truncate font-medium">{q.questionText}</p>
                    {q.aiGenerated && (
                      <Badge variant="secondary" className="mt-1 normal-case">AI</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">{q.grade}</td>
                  <td className="px-6 py-4">{q.topic}</td>
                  <td className="px-6 py-4">{q.difficulty}/5</td>
                  <td className="px-6 py-4">
                    <Badge variant={q.status === 'published' ? 'success' : 'outline'} className="normal-case capitalize">
                      {q.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link to={`/teacher/questions/${q.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      {q.status === 'draft' && (
                        <Button variant="outline" size="sm" onClick={() => publishQuestion(q.id)}>
                          Publish
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <FileText className="mx-auto h-8 w-8 text-on-surface-variant" />
            <p className="mt-2 text-on-surface-variant">No questions match your filters.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
