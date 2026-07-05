import { useNavigate } from 'react-router-dom';
import { Swords, Trophy, Zap } from 'lucide-react';
import { Card, CardDescription, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/stores/appStore';

export default function MatchLobbyPage() {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);
  const createMatch = useAppStore((s) => s.createMatch);

  const profile = data.studentProfiles.find((p) => p.userId === user.id);
  const myGrade = profile?.grade ?? 5;

  const opponents = data.users
    .filter((u) => u.role === 'student' && u.id !== user.id && u.status === 'active')
    .map((u) => {
      const p = data.studentProfiles.find((sp) => sp.userId === u.id);
      return { user: u, profile: p };
    })
    .filter((o) => (o.profile?.grade ?? 5) === myGrade);

  const handleChallenge = (opponentId: string) => {
    const match = createMatch(opponentId);
    navigate(`/matches/${match.id}`);
  };

  const recentWins = data.matches.filter(
    (m) => m.status === 'completed' && m.winnerUserId === user.id,
  ).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">Match Arena</h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Challenge classmates in real-time 1v1 math battles.
          </p>
        </div>
        <div className="flex gap-3">
          <Badge variant="secondary" className="normal-case">
            <Trophy className="mr-1 inline h-3.5 w-3.5" />
            {recentWins} wins
          </Badge>
          <Badge variant="primary" className="normal-case capitalize">{profile?.rank ?? 'novice'}</Badge>
        </div>
      </div>

      <Card variant="hero">
        <div className="flex items-center gap-4">
          <Swords className="h-10 w-10" />
          <div>
            <h2 className="text-headline-md font-bold">10-Card Battle</h2>
            <p className="text-white/80">Answer faster than your opponent. Green cards = 1 pt, Red cards = 5 pts. Wrong answers cost 1 pt.</p>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="mb-4 text-headline-md font-semibold">Grade {myGrade} Opponents</h2>
        {opponents.length === 0 ? (
          <EmptyState
            icon={Swords}
            title="No opponents available"
            description="Check back later for classmates in your grade."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {opponents.map(({ user: opp, profile: oppProfile }) => (
              <Card key={opp.id} hover>
                <div className="flex items-center gap-4">
                  <Avatar name={opp.fullName} size="lg" />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="!text-body-lg">{opp.fullName}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span className="capitalize">{oppProfile?.rank ?? 'novice'}</span>
                      <span>·</span>
                      <span>{oppProfile?.totalXp ?? 0} XP</span>
                    </CardDescription>
                  </div>
                </div>
                <Button className="mt-4 w-full" onClick={() => handleChallenge(opp.id)}>
                  <Zap className="h-4 w-4" /> Challenge
                </Button>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
