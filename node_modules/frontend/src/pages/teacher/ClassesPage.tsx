import { Link } from 'react-router-dom';
import { ChevronRight, GraduationCap, Users } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/stores/appStore';

export default function ClassesPage() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);

  const classes = data.classes.filter((c) => c.teacherUserId === user.id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Classes</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Manage your class rosters and track student performance.
        </p>
      </div>

      {classes.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No classes assigned"
          description="Contact your school admin to be assigned to a class."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {classes.map((cls) => {
            const assignmentCount = data.assignments.filter((a) => a.classId === cls.id).length;
            return (
              <Link key={cls.id} to={`/teacher/classes/${cls.id}`}>
                <Card hover>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-fixed">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline" className="normal-case">Grade {cls.grade}</Badge>
                    </div>
                    <CardTitle>{cls.name}</CardTitle>
                    <CardDescription>
                      <span className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" /> {cls.studentIds.length} students
                        </span>
                        <span>{assignmentCount} assignments</span>
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <span className="flex items-center gap-1 text-label-md text-primary">
                    View roster <ChevronRight className="h-4 w-4" />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
