import { Link, useParams } from 'react-router-dom';
import { Crown, RotateCcw, Swords, Trophy } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/stores/appStore';
import { formatRelativeDate } from '@/lib/utils';

export default function MatchResultPage() {
  const { id } = useParams<{ id: string }>();
  const user = useAppStore((s) => s.user)!;
  const getMatch = useAppStore((s) => s.getMatch);

  const match = id ? getMatch(id) : undefined;

  if (!match) {
    return (
      <EmptyState
        title="Result not found"
        description="This match result could not be loaded."
        actionLabel="Match history"
        onAction={() => window.location.assign('/matches/history')}
      />
    );
  }

  const isPlayer1 = match.player1UserId === user.id;
  const myScore = isPlayer1 ? match.player1Score ?? 0 : match.player2Score ?? 0;
  const oppScore = isPlayer1 ? match.player2Score ?? 0 : match.player1Score ?? 0;
  const opponentName = isPlayer1 ? match.player2Name : match.player1Name;
  const won = match.winnerUserId === user.id;
  const tied = match.winnerUserId === undefined && myScore === oppScore;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <Card variant="hero" className="text-center">
        {won ? (
          <Crown className="mx-auto mb-4 h-14 w-14 text-yellow-300" />
        ) : (
          <Trophy className="mx-auto mb-4 h-14 w-14 text-white/70" />
        )}
        <h1 className="text-headline-lg font-bold">
          {won ? 'Victory!' : tied ? 'Draw!' : 'Good Fight!'}
        </h1>
        <p className="mt-2 text-white/80">
          {won ? 'You dominated the arena.' : tied ? 'Evenly matched — rematch?' : `${opponentName} took this round.`}
        </p>
        {match.completedAt && (
          <p className="mt-2 text-sm text-white/60">{formatRelativeDate(match.completedAt)}</p>
        )}
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className={`!p-4 ${won ? 'ring-2 ring-success' : ''}`}>
          <div className="flex items-center gap-3">
            <Avatar name={user.fullName} size="lg" />
            <div>
              <p className="font-semibold">You</p>
              <p className="text-headline-lg font-bold text-primary">{myScore}</p>
              {won && <Badge variant="success" className="mt-1 normal-case">Winner</Badge>}
            </div>
          </div>
        </Card>
        <Card className={`!p-4 ${!won && !tied ? 'ring-2 ring-secondary' : ''}`}>
          <div className="flex items-center gap-3">
            <Avatar name={opponentName} size="lg" />
            <div>
              <p className="font-semibold">{opponentName}</p>
              <p className="text-headline-lg font-bold text-secondary">{oppScore}</p>
              {!won && !tied && <Badge variant="secondary" className="mt-1 normal-case">Winner</Badge>}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="!text-body-lg">Card Breakdown</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {match.cards.map((card, i) => {
            const myCorrect = isPlayer1 ? card.player1Correct : card.player2Correct;
            return (
              <div key={card.id} className="flex items-center justify-between rounded-lg bg-surface-container-low px-3 py-2 text-label-md">
                <span>Card {i + 1} ({card.cardPoints}pt)</span>
                <Badge variant={myCorrect ? 'success' : myCorrect === false ? 'error' : 'outline'} className="normal-case">
                  {myCorrect ? 'Correct' : myCorrect === false ? 'Wrong' : '—'}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex gap-4">
        <Link to="/matches" className="flex-1">
          <Button variant="outline" className="w-full">
            <RotateCcw className="h-4 w-4" /> New Match
          </Button>
        </Link>
        <Link to="/matches/history" className="flex-1">
          <Button className="w-full">
            <Swords className="h-4 w-4" /> Match History
          </Button>
        </Link>
      </div>
    </div>
  );
}
