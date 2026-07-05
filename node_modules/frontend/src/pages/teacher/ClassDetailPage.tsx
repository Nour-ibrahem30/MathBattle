import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/stores/appStore';

export default function ClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const data = useAppStore((s) => s.data);

  const cls = data.classes.find((c) => c.id === id);

  if (!cls) {
    return (
      <EmptyState
        title="Class not found"
        description="This class does not exist."
        actionLabel="Back to classes"
        onAction={() => window.history.back()}
      />
    );
  }

  const students = cls.studentIds.map((sid) => {
    const user = data.users.find((u) => u.id === sid)!;
    const profile = data.studentProfiles.find((p) => p.userId === sid);
    const attempts = data.lessonAttempts.filter((a) => a.studentUserId === sid && a.status === 'completed');
    const avgScore = attempts.length > 0
      ? Math.round(attempts.reduce((s, a) => s + (a.scorePercentage ?? 0), 0) / attempts.length)
      : null;
    return { user, profile, avgScore, attemptCount: attempts.length };
  });

  const classAvg = students.filter((s) => s.avgScore !== null).length > 0
    ? Math.round(
        students.filter((s) => s.avgScore !== null).reduce((sum, s) => sum + (s.avgScore ?? 0), 0) /
          students.filter((s) => s.avgScore !== null).length,
      )
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <Link to="/teacher/classes" className="mb-4 inline-flex items-center gap-2 text-label-md text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> All classes
        </Link>
        <h1 className="text-headline-lg font-bold text-on-surface">{cls.name}</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Grade {cls.grade} · {cls.studentIds.length} students
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold">{cls.studentIds.length}</p>
          <p className="text-label-sm text-on-surface-variant">Students</p>
        </Card>
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold">{classAvg}%</p>
          <p className="text-label-sm text-on-surface-variant">Class Avg Score</p>
        </Card>
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold">
            {data.assignments.filter((a) => a.classId === cls.id && a.status === 'published').length}
          </p>
          <p className="text-label-sm text-on-surface-variant">Active Assignments</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Roster & Performance</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/60">
                <th className="pb-3 text-label-sm font-semibold uppercase text-on-surface-variant">Student</th>
                <th className="pb-3 text-label-sm font-semibold uppercase text-on-surface-variant">Rank</th>
                <th className="pb-3 text-label-sm font-semibold uppercase text-on-surface-variant">XP</th>
                <th className="pb-3 text-label-sm font-semibold uppercase text-on-surface-variant">Lessons</th>
                <th className="pb-3 text-label-sm font-semibold uppercase text-on-surface-variant">Avg Score</th>
              </tr>
            </thead>
            <tbody>
              {students.map(({ user, profile, avgScore, attemptCount }) => (
                <tr key={user.id} className="border-b border-outline-variant/30">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.fullName} size="sm" />
                      <span className="font-medium">{user.fullName}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge variant="outline" className="normal-case capitalize">{profile?.rank ?? 'novice'}</Badge>
                  </td>
                  <td className="py-4">{profile?.totalXp ?? 0}</td>
                  <td className="py-4">{attemptCount}</td>
                  <td className="py-4">
                    {avgScore !== null ? (
                      <div className="flex items-center gap-2">
                        <ProgressBar className="w-24" value={avgScore} variant={avgScore >= 70 ? 'primary' : 'tertiary'} />
                        <span className="text-label-sm">{avgScore}%</span>
                      </div>
                    ) : (
                      <span className="text-on-surface-variant">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card variant="ai">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-5 w-5 shrink-0 text-secondary" />
          <p className="text-body-md text-on-surface-variant">
            Students scoring below 70% may benefit from targeted fraction practice. Consider assigning Fractions Practice — Week 3.
          </p>
        </div>
      </Card>
    </div>
  );
}
