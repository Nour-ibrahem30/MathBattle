import { TrendingDown, TrendingUp, Minus, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { useAppStore } from '@/stores/appStore';
import { buildLeaderboard } from '@/data/seed';

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  same: Minus,
};

const trendColors = {
  up: 'text-success',
  down: 'text-error',
  same: 'text-on-surface-variant',
};

export default function LeaderboardPage() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);
  const profile = data.studentProfiles.find((p) => p.userId === user.id);

  const entries = buildLeaderboard(data.studentProfiles, data.users);
  const myRank = entries.findIndex((e) => e.userId === user.id) + 1;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">Leaderboard</h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Top students ranked by total XP — Grade {profile?.grade ?? 5}
          </p>
        </div>
        <Card variant="metric" className="!p-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-tertiary" />
            <div>
              <p className="text-label-sm text-on-surface-variant">Your rank</p>
              <p className="text-headline-md font-bold">#{myRank || '—'}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/60 bg-surface-container-low">
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Rank</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Student</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Grade</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Title</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">XP</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Trend</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => {
                const TrendIcon = trendIcons[entry.trend];
                const isMe = entry.userId === user.id;
                return (
                  <tr
                    key={entry.userId}
                    className={`border-b border-outline-variant/30 ${isMe ? 'bg-primary-container/5' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <span className={`font-bold ${i < 3 ? 'text-tertiary' : ''}`}>#{i + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={entry.fullName} size="sm" />
                        <span className={`font-medium ${isMe ? 'text-primary' : ''}`}>
                          {entry.fullName}{isMe ? ' (You)' : ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{entry.grade}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="normal-case capitalize">{entry.rank}</Badge>
                    </td>
                    <td className="px-6 py-4 font-semibold">{entry.totalXp.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <TrendIcon className={`h-4 w-4 ${trendColors[entry.trend]}`} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
