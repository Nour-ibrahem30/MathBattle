import { Link } from 'react-router-dom';
import { Crown, Swords } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/stores/appStore';
import { formatRelativeDate } from '@/lib/utils';

export default function MatchHistoryPage() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);

  const matches = data.matches.filter(
    (m) => m.player1UserId === user.id || m.player2UserId === user.id,
  );

  const wins = matches.filter((m) => m.winnerUserId === user.id).length;
  const losses = matches.filter((m) => m.winnerUserId && m.winnerUserId !== user.id).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">Match History</h1>
          <p className="mt-1 text-body-md text-on-surface-variant">Your past 1v1 battles and results.</p>
        </div>
        <Link to="/matches" className="text-label-md text-primary hover:underline">
          Find new opponent →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold text-on-surface">{matches.length}</p>
          <p className="text-label-md text-on-surface-variant">Total Matches</p>
        </Card>
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold text-success">{wins}</p>
          <p className="text-label-md text-on-surface-variant">Wins</p>
        </Card>
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold text-error">{losses}</p>
          <p className="text-label-md text-on-surface-variant">Losses</p>
        </Card>
      </div>

      {matches.length === 0 ? (
        <EmptyState
          icon={Swords}
          title="No matches yet"
          description="Challenge a classmate to start your battle history."
          actionLabel="Go to lobby"
          onAction={() => window.location.assign('/matches')}
        />
      ) : (
        <div className="space-y-3">
          {matches.map((m) => {
            const isPlayer1 = m.player1UserId === user.id;
            const opponent = isPlayer1 ? m.player2Name : m.player1Name;
            const myScore = isPlayer1 ? m.player1Score ?? 0 : m.player2Score ?? 0;
            const oppScore = isPlayer1 ? m.player2Score ?? 0 : m.player1Score ?? 0;
            const won = m.winnerUserId === user.id;
            const date = m.completedAt ?? m.startedAt;

            return (
              <Link key={m.id} to={m.status === 'completed' ? `/matches/${m.id}/result` : `/matches/${m.id}`}>
                <Card hover className="!py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {won && <Crown className="h-5 w-5 text-tertiary" />}
                      <div>
                        <p className="font-semibold">vs {opponent}</p>
                        {date && (
                          <p className="text-label-sm text-on-surface-variant">{formatRelativeDate(date)}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={won ? 'success' : m.winnerUserId ? 'error' : 'outline'} className="normal-case">
                        {myScore} - {oppScore}
                      </Badge>
                      <Badge variant="outline" className="normal-case capitalize">{m.status}</Badge>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
