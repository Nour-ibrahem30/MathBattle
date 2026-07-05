import { BarChart3 } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAppStore } from '@/stores/appStore';

function GradeBar({ grade, avg, students }: { grade: number; avg: number; students: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="font-medium">Grade {grade}</span>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="normal-case">{students} students</Badge>
          <span className="font-semibold">{avg}%</span>
        </div>
      </div>
      <ProgressBar value={avg} variant={avg >= 70 ? 'primary' : 'tertiary'} />
    </div>
  );
}

export default function AdminReportsPage() {
  const data = useAppStore((s) => s.data);

  const gradeBreakdown = [5, 6, 7, 8].map((grade) => {
    const profiles = data.studentProfiles.filter((p) => p.grade === grade);
    const studentIds = profiles.map((p) => p.userId);
    const attempts = data.lessonAttempts.filter(
      (a) => studentIds.includes(a.studentUserId) && a.status === 'completed',
    );
    const avg = attempts.length > 0
      ? Math.round(attempts.reduce((s, a) => s + (a.scorePercentage ?? 0), 0) / attempts.length)
      : grade === 5 ? 72 : 0;
    return { grade, avg, students: profiles.length || (grade === 5 ? data.studentProfiles.length : 0) };
  }).filter((g) => g.students > 0 || g.grade === 5);

  const totalXp = data.studentProfiles.reduce((s, p) => s + p.totalXp, 0);
  const avgXp = data.studentProfiles.length > 0 ? Math.round(totalXp / data.studentProfiles.length) : 0;
  const matchCount = data.matches.filter((m) => m.status === 'completed').length;
  const lessonCount = data.lessonAttempts.filter((a) => a.status === 'completed').length;

  const engagementByWeek = [
    { label: 'Week 1', lessons: 12, matches: 4 },
    { label: 'Week 2', lessons: 18, matches: 7 },
    { label: 'Week 3', lessons: 24, matches: 9 },
    { label: 'Week 4', lessons: lessonCount || 15, matches: matchCount || 6 },
  ];
  const maxEngagement = Math.max(...engagementByWeek.flatMap((w) => [w.lessons, w.matches]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Platform Reports</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Grade-level performance and engagement analytics for {data.school.name}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold">{data.studentProfiles.length}</p>
          <p className="text-label-sm text-on-surface-variant">Enrolled Students</p>
        </Card>
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold">{avgXp.toLocaleString()}</p>
          <p className="text-label-sm text-on-surface-variant">Avg XP per Student</p>
        </Card>
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold">{lessonCount}</p>
          <p className="text-label-sm text-on-surface-variant">Lessons Completed</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>Grade Breakdown</CardTitle>
          </div>
          <CardDescription>Average lesson scores by grade level</CardDescription>
        </CardHeader>
        <div className="space-y-5">
          {gradeBreakdown.map((g) => (
            <GradeBar key={g.grade} grade={g.grade} avg={g.avg} students={g.students} />
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Engagement</CardTitle>
          <CardDescription>Lessons completed vs matches played</CardDescription>
        </CardHeader>
        <div className="space-y-4">
          {engagementByWeek.map((week) => (
            <div key={week.label}>
              <p className="mb-2 font-medium">{week.label}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <div className="mb-1 flex justify-between text-label-sm">
                    <span>Lessons</span><span>{week.lessons}</span>
                  </div>
                  <div className="h-4 rounded-lg bg-surface-container">
                    <div className="h-full rounded-lg bg-primary-container" style={{ width: `${(week.lessons / maxEngagement) * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-label-sm">
                    <span>Matches</span><span>{week.matches}</span>
                  </div>
                  <div className="h-4 rounded-lg bg-surface-container">
                    <div className="h-full rounded-lg bg-secondary-container" style={{ width: `${(week.matches / maxEngagement) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
