import { Activity, BookOpen, Swords, Target } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/stores/appStore';
import { formatPercent } from '@/lib/utils';

function BarChart({ data, maxValue }: { data: { label: string; value: number; color: string }[]; maxValue: number }) {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex justify-between text-label-sm">
            <span>{item.label}</span>
            <span className="font-semibold">{item.value}</span>
          </div>
          <div className="h-6 overflow-hidden rounded-lg bg-surface-container">
            <div
              className={`h-full rounded-lg transition-all ${item.color}`}
              style={{ width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);
  const getLessonProgress = useAppStore((s) => s.getLessonProgress);

  const attempts = data.lessonAttempts.filter(
    (a) => a.studentUserId === user.id && a.status === 'completed',
  );
  const avgScore = attempts.length > 0
    ? Math.round(attempts.reduce((s, a) => s + (a.scorePercentage ?? 0), 0) / attempts.length)
    : 0;
  const totalXpFromLessons = attempts.reduce((s, a) => s + (a.xpEarned ?? 0), 0);

  const matches = data.matches.filter(
    (m) => (m.player1UserId === user.id || m.player2UserId === user.id) && m.status === 'completed',
  );
  const matchWins = matches.filter((m) => m.winnerUserId === user.id).length;

  const unitScores = data.learningPath.units.map((unit) => {
    const lessons = unit.lessons;
    const scores = lessons.map((l) => getLessonProgress(l.id)).filter((s) => s > 0);
    const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    return { label: unit.title, value: avg, color: 'bg-primary-container' };
  });

  const topicPerformance = [
    { label: 'Fractions', value: getLessonProgress('lesson-frac-add') || getLessonProgress('lesson-frac-intro'), color: 'bg-secondary-container' },
    { label: 'Decimals', value: getLessonProgress('lesson-decimals'), color: 'bg-tertiary-container' },
    { label: 'Multiplication', value: 72, color: 'bg-primary-container' },
    { label: 'Algebra', value: 45, color: 'bg-orange-400' },
  ].filter((t) => t.value > 0);

  const weeklyActivity = [
    { label: 'Mon', value: attempts.length > 0 ? 2 : 0 },
    { label: 'Tue', value: attempts.length > 1 ? 1 : 0 },
    { label: 'Wed', value: 0 },
    { label: 'Thu', value: attempts.length > 0 ? 3 : 0 },
    { label: 'Fri', value: 1 },
    { label: 'Sat', value: matches.length > 0 ? 2 : 0 },
    { label: 'Sun', value: 0 },
  ];
  const maxWeekly = Math.max(...weeklyActivity.map((d) => d.value), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Analytics</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Track your learning progress, strengths, and areas to improve.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <p className="text-headline-md font-bold">{attempts.length}</p>
              <p className="text-label-sm text-on-surface-variant">Lessons Completed</p>
            </div>
          </div>
        </Card>
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-secondary" />
            <div>
              <p className="text-headline-md font-bold">{formatPercent(avgScore)}</p>
              <p className="text-label-sm text-on-surface-variant">Avg Score</p>
            </div>
          </div>
        </Card>
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-tertiary" />
            <div>
              <p className="text-headline-md font-bold">{totalXpFromLessons}</p>
              <p className="text-label-sm text-on-surface-variant">Lesson XP</p>
            </div>
          </div>
        </Card>
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <Swords className="h-8 w-8 text-error" />
            <div>
              <p className="text-headline-md font-bold">{matchWins}/{matches.length}</p>
              <p className="text-label-sm text-on-surface-variant">Match Wins</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Unit Progress</CardTitle>
            <CardDescription>Average score per unit (%)</CardDescription>
          </CardHeader>
          <BarChart data={unitScores} maxValue={100} />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Lessons and matches per day</CardDescription>
          </CardHeader>
          <div className="flex items-end gap-2" style={{ height: '160px' }}>
            {weeklyActivity.map((d) => (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-primary-container transition-all"
                  style={{ height: `${(d.value / maxWeekly) * 120}px`, minHeight: d.value > 0 ? '8px' : '4px' }}
                />
                <span className="text-label-sm text-on-surface-variant">{d.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {topicPerformance.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Topic Performance</CardTitle>
              <CardDescription>Best scores by topic area</CardDescription>
            </CardHeader>
            <BarChart data={topicPerformance} maxValue={100} />
          </Card>
        )}
      </div>

      {data.aiRecommendations.filter((r) => r.studentUserId === user.id).length > 0 && (
        <Card variant="ai">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          {data.aiRecommendations
            .filter((r) => r.studentUserId === user.id)
            .map((r) => (
              <div key={r.id} className="mb-3 last:mb-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{r.title}</p>
                  <Badge variant={r.priority === 'high' ? 'error' : 'outline'} className="normal-case">{r.priority}</Badge>
                </div>
                <p className="text-body-md text-on-surface-variant">{r.reason}</p>
              </div>
            ))}
        </Card>
      )}
    </div>
  );
}
