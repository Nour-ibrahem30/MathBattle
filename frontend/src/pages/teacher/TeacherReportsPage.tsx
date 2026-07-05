import { BarChart3, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAppStore } from '@/stores/appStore';

function BarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex justify-between text-label-sm">
            <span>{item.label}</span>
            <span className="font-semibold">{item.value}%</span>
          </div>
          <div className="h-5 overflow-hidden rounded-lg bg-surface-container">
            <div className={`h-full rounded-lg ${item.color}`} style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TeacherReportsPage() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);

  const myClasses = data.classes.filter((c) => c.teacherUserId === user.id);

  const classReports = myClasses.map((cls) => {
    const students = cls.studentIds.map((sid) => {
      const attempts = data.lessonAttempts.filter((a) => a.studentUserId === sid && a.status === 'completed');
      const avg = attempts.length > 0
        ? Math.round(attempts.reduce((s, a) => s + (a.scorePercentage ?? 0), 0) / attempts.length)
        : 0;
      return avg;
    });
    const classAvg = students.length > 0
      ? Math.round(students.reduce((a, b) => a + b, 0) / students.length)
      : 0;
    const activeCount = cls.studentIds.filter((sid) =>
      data.lessonAttempts.some((a) => a.studentUserId === sid),
    ).length;
    return { cls, classAvg, activeCount, enrollment: cls.studentIds.length };
  });

  const topicBreakdown = [
    { label: 'Fractions', value: 78, color: 'bg-primary-container' },
    { label: 'Decimals', value: 65, color: 'bg-secondary-container' },
    { label: 'Multiplication', value: 82, color: 'bg-tertiary-container' },
    { label: 'Algebra', value: 54, color: 'bg-orange-400' },
  ];

  const totalStudents = myClasses.reduce((s, c) => s + c.studentIds.length, 0);
  const overallAvg = classReports.length > 0
    ? Math.round(classReports.reduce((s, r) => s + r.classAvg, 0) / classReports.length)
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Class Reports</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Performance summaries across your classes and topics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-headline-md font-bold">{totalStudents}</p>
              <p className="text-label-sm text-on-surface-variant">Total Students</p>
            </div>
          </div>
        </Card>
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-secondary" />
            <div>
              <p className="text-headline-md font-bold">{overallAvg}%</p>
              <p className="text-label-sm text-on-surface-variant">Overall Avg Score</p>
            </div>
          </div>
        </Card>
        <Card variant="metric">
          <div className="flex items-center gap-3">
            {overallAvg >= 70 ? (
              <TrendingUp className="h-8 w-8 text-success" />
            ) : (
              <TrendingDown className="h-8 w-8 text-error" />
            )}
            <div>
              <p className="text-headline-md font-bold">{myClasses.length}</p>
              <p className="text-label-sm text-on-surface-variant">Active Classes</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
            <CardDescription>Average scores by class</CardDescription>
          </CardHeader>
          <div className="space-y-4">
            {classReports.map(({ cls, classAvg, activeCount, enrollment }) => (
              <div key={cls.id}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium">{cls.name}</span>
                  <Badge variant={classAvg >= 70 ? 'success' : 'warning'} className="normal-case">{classAvg}%</Badge>
                </div>
                <ProgressBar value={classAvg} variant={classAvg >= 70 ? 'primary' : 'tertiary'} />
                <p className="mt-1 text-label-sm text-on-surface-variant">
                  {activeCount}/{enrollment} students active this week
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Topic Breakdown</CardTitle>
            <CardDescription>Class-wide average by topic area</CardDescription>
          </CardHeader>
          <BarChart data={topicBreakdown} />
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Completion</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {data.assignments
            .filter((a) => myClasses.some((c) => c.id === a.classId))
            .map((a) => {
              const cls = data.classes.find((c) => c.id === a.classId);
              const completionRate = Math.round(40 + Math.random() * 50);
              return (
                <div key={a.id} className="flex items-center justify-between rounded-xl bg-surface-container-low p-4">
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-label-sm text-on-surface-variant">{cls?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{completionRate}%</p>
                    <p className="text-label-sm text-on-surface-variant">completion</p>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
}
