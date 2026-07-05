import { Target, Zap } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/stores/appStore';
import { formatRelativeDate } from '@/lib/utils';

export default function MissionsPage() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);

  const missions = data.studentMissions
    .filter((sm) => sm.studentUserId === user.id)
    .map((sm) => ({
      ...data.missions.find((m) => m.id === sm.missionId)!,
      progress: sm.progress,
      status: sm.status,
    }));

  const activeMissions = missions.filter((m) => m.status === 'active');
  const completedMissions = missions.filter((m) => m.status === 'completed');

  if (missions.length === 0) {
    return (
      <EmptyState
        icon={Target}
        title="No active missions"
        description="Check back soon for weekly challenges and bonus XP rewards."
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Missions</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Complete weekly goals to earn bonus XP and climb the leaderboard.
        </p>
      </div>

      {activeMissions.length > 0 && (
        <section>
          <h2 className="mb-4 text-headline-md font-semibold">Active Missions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {activeMissions.map((m) => (
              <Card key={m.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="!text-body-lg">{m.title}</CardTitle>
                    <Badge variant="primary" className="normal-case shrink-0">
                      <Zap className="mr-1 inline h-3 w-3" />+{m.xpReward} XP
                    </Badge>
                  </div>
                  <CardDescription>{m.description}</CardDescription>
                </CardHeader>
                <ProgressBar
                  value={m.progress}
                  max={m.targetCount}
                  label={`${m.progress} / ${m.targetCount}`}
                  variant="secondary"
                />
                <p className="mt-2 text-label-sm text-on-surface-variant">
                  Ends {formatRelativeDate(m.activeUntil)}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {completedMissions.length > 0 && (
        <section>
          <h2 className="mb-4 text-headline-md font-semibold">Completed</h2>
          <div className="space-y-3">
            {completedMissions.map((m) => (
              <Card key={m.id} className="!py-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{m.title}</span>
                  <Badge variant="success" className="normal-case">Completed</Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
