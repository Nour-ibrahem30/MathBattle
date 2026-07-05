import { Lock, Trophy } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAppStore } from '@/stores/appStore';
import { formatRelativeDate } from '@/lib/utils';

export default function AchievementsPage() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);

  const earned = data.studentAchievements.filter((sa) => sa.studentUserId === user.id);
  const earnedIds = new Set(earned.map((e) => e.achievementId));
  const earnedCount = earned.length;
  const totalCount = data.achievements.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Achievements</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Unlock badges by completing lessons, winning matches, and maintaining streaks.
        </p>
      </div>

      <Card>
        <div className="flex items-center gap-4">
          <Trophy className="h-8 w-8 text-tertiary" />
          <div className="flex-1">
            <p className="font-semibold">{earnedCount} of {totalCount} unlocked</p>
            <ProgressBar className="mt-2" value={earnedCount} max={totalCount} variant="tertiary" />
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.achievements.map((ach) => {
          const record = earned.find((e) => e.achievementId === ach.id);
          const isEarned = earnedIds.has(ach.id);

          return (
            <Card key={ach.id} className={!isEarned ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{isEarned ? ach.icon : '🔒'}</span>
                  <Badge variant={isEarned ? 'success' : 'outline'} className="normal-case">
                    +{ach.xpReward} XP
                  </Badge>
                </div>
                <CardTitle className="!text-body-lg">{ach.name}</CardTitle>
                <CardDescription>{ach.description}</CardDescription>
              </CardHeader>
              {isEarned && record ? (
                <p className="text-label-sm text-success">Earned {formatRelativeDate(record.earnedAt)}</p>
              ) : (
                <p className="flex items-center gap-1 text-label-sm text-on-surface-variant">
                  <Lock className="h-3.5 w-3.5" /> Locked
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
