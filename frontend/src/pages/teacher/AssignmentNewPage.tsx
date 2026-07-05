import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/stores/appStore';

export default function AssignmentNewPage() {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);
  const addAssignment = useAppStore((s) => s.addAssignment);

  const myClasses = data.classes.filter((c) => c.teacherUserId === user.id);
  const publishedQuestions = data.questions.filter((q) => q.status === 'published');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [classId, setClassId] = useState(myClasses[0]?.id ?? '');
  const [dueDate, setDueDate] = useState('');
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [publish, setPublish] = useState(true);
  const [error, setError] = useState('');

  const toggleQuestion = (id: string) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!classId) {
      setError('Select a class.');
      return;
    }
    if (selectedQuestionIds.length === 0) {
      setError('Select at least one question.');
      return;
    }
    addAssignment({
      classId,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      status: publish ? 'published' : 'draft',
      questionIds: selectedQuestionIds,
      publishedAt: publish ? new Date().toISOString() : undefined,
    });
    navigate('/teacher/assignments');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <Link to="/teacher/assignments" className="mb-4 inline-flex items-center gap-2 text-label-md text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to assignments
        </Link>
        <h1 className="text-headline-lg font-bold text-on-surface">Create Assignment</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">Assign practice questions to your class.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="space-y-5">
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
            <CardDescription>Students will receive a notification when published.</CardDescription>
          </CardHeader>

          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-label-md font-medium">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="class" className="text-label-md font-medium">Class</label>
            <select
              id="class"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="h-11 rounded-xl border border-outline-variant bg-surface-container-low px-4 focus:border-primary focus:outline-none"
            >
              {myClasses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <Input label="Due date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

          <div>
            <p className="mb-3 text-label-md font-medium">Questions ({selectedQuestionIds.length} selected)</p>
            <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl border border-outline-variant p-3">
              {publishedQuestions.map((q) => (
                <label
                  key={q.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg p-3 transition ${
                    selectedQuestionIds.includes(q.id) ? 'bg-primary-fixed' : 'hover:bg-surface-container-low'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedQuestionIds.includes(q.id)}
                    onChange={() => toggleQuestion(q.id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-body-md">{q.questionText}</p>
                    <Badge variant="outline" className="mt-1 normal-case">{q.topic} · Grade {q.grade}</Badge>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3">
            <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} />
            <span className="text-body-md">Publish immediately</span>
          </label>

          {error && <p className="text-label-md text-error" role="alert">{error}</p>}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => navigate('/teacher/assignments')}>
              Cancel
            </Button>
            <Button type="submit">Create Assignment</Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
