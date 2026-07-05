import { Link } from 'react-router-dom';
import { Calendar, ClipboardList, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/stores/appStore';
import { formatRelativeDate } from '@/lib/utils';

export default function AssignmentsPage() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);

  const myClassIds = data.classes.filter((c) => c.teacherUserId === user.id).map((c) => c.id);
  const assignments = data.assignments.filter((a) => myClassIds.includes(a.classId));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">Assignments</h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Create and manage homework for your classes.
          </p>
        </div>
        <Link to="/teacher/assignments/new">
          <Button>
            <Plus className="h-4 w-4" /> New Assignment
          </Button>
        </Link>
      </div>

      {assignments.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No assignments yet"
          description="Create your first assignment to give students structured practice."
          actionLabel="Create assignment"
          onAction={() => window.location.assign('/teacher/assignments/new')}
        />
      ) : (
        <div className="space-y-3">
          {assignments.map((a) => {
            const cls = data.classes.find((c) => c.id === a.classId);
            return (
              <Card key={a.id} hover className="!py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{a.title}</h3>
                      <Badge variant={a.status === 'published' ? 'success' : 'outline'} className="normal-case capitalize">
                        {a.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-body-md text-on-surface-variant">{a.description}</p>
                    <p className="mt-1 text-label-sm text-on-surface-variant">
                      {cls?.name} · {a.questionIds.length} questions
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-label-md text-on-surface-variant">
                    {a.dueDate && (
                      <>
                        <Calendar className="h-4 w-4" />
                        Due {formatRelativeDate(a.dueDate)}
                      </>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
