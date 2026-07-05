import { Link } from 'react-router-dom';
import { Flame, Sparkles, Swords, TrendingUp, Trophy } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/stores/appStore';
import { buildLeaderboard } from '@/data/seed';
import { getNextRankXp, RANK_THRESHOLDS } from '@/types';

export default function StudentDashboard() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);
  const profile = data.studentProfiles.find((p) => p.userId === user.id);
  const recommendation = data.aiRecommendations.find((r) => r.studentUserId === user.id);
  const path = data.learningPath;
  const recentMatches = data.matches.filter((m) => m.player1UserId === user.id || m.player2UserId === user.id).slice(0, 3);
  const recentAchievements = data.studentAchievements
    .filter((sa) => sa.studentUserId === user.id)
    .map((sa) => data.achievements.find((a) => a.id === sa.achievementId)!)
    .slice(0, 3);
  const missions = data.studentMissions
    .filter((sm) => sm.studentUserId === user.id)
    .map((sm) => ({ ...data.missions.find((m) => m.id === sm.missionId)!, ...sm }));

  const xp = profile?.totalXp ?? 0;
  const nextXp = getNextRankXp(xp);
  const xpProgress = ((xp - RANK_THRESHOLDS[profile?.rank ?? 'novice']) / (nextXp - RANK_THRESHOLDS[profile?.rank ?? 'novice'])) * 100;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">Welcome back, {user.fullName.split(' ')[0]}</h1>
          <p className="text-body-md text-on-surface-variant">Ready to continue your mathematics journey?</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="normal-case">
            <Flame className="mr-1 inline h-3.5 w-3.5 text-orange-500" />
            {profile?.streakCount ?? 0} day streak
          </Badge>
          <Badge variant="primary" className="normal-case capitalize">{profile?.rank ?? 'novice'}</Badge>
        </div>
      </div>

      <Card variant="hero" className="relative overflow-hidden">
        <div className="relative z-10 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <Badge className="mb-3 bg-white/20 text-white normal-case">Continue Learning</Badge>
            <h2 className="text-headline-md font-bold">
              {recommendation?.title ?? path.title}
            </h2>
            <p className="mt-2 text-white/80">
              {recommendation?.reason ?? path.description}
            </p>
            <Link
              to={recommendation?.lessonId ? `/learn/lessons/${recommendation.lessonId}` : '/learn'}
              className="mt-6 inline-flex h-11 items-center rounded-xl bg-white px-6 font-semibold text-primary-container transition hover:bg-white/90"
            >
              Continue →
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-white/90">
              <span>{xp.toLocaleString()} XP</span>
              <span>{nextXp.toLocaleString()} to next rank</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white transition-all" style={{ width: `${Math.min(100, xpProgress)}%` }} />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <section>
            <h2 className="mb-4 text-headline-md font-semibold">Active Missions</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {missions.map((m) => (
                <Card key={m.id} hover>
                  <CardHeader className="!mb-2">
                    <CardTitle className="!text-body-lg">{m.title}</CardTitle>
                    <CardDescription>{m.description}</CardDescription>
                  </CardHeader>
                  <ProgressBar value={m.progress} max={m.targetCount} variant="secondary" />
                  <p className="mt-2 text-label-sm text-on-surface-variant">+{m.xpReward} XP reward</p>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-headline-md font-semibold">Recent Matches</h2>
              <Link to="/matches/history" className="text-label-md text-primary hover:underline">View all</Link>
            </div>
            {recentMatches.length === 0 ? (
              <Card>
                <div className="flex items-center gap-4">
                  <Swords className="h-8 w-8 text-on-surface-variant" />
                  <div>
                    <p className="font-medium">No matches yet</p>
                    <Link to="/matches" className="text-label-md text-primary hover:underline">Find an opponent →</Link>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="space-y-3">
                {recentMatches.map((m) => (
                  <Card key={m.id} className="!py-4">
                    <div className="flex items-center justify-between">
                      <span>{m.player1UserId === user.id ? m.player2Name : m.player1Name}</span>
                      <Badge variant={m.winnerUserId === user.id ? 'success' : 'outline'}>
                        {m.player1Score}-{m.player2Score}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <Card variant="ai">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 shrink-0 text-secondary" />
              <div>
                <h3 className="font-semibold text-secondary">AI Insight</h3>
                <p className="mt-1 text-body-md text-on-surface-variant italic">
                  Focus on adding fractions — your last practice scored 60%. 15 min today closes the gap.
                </p>
              </div>
            </div>
          </Card>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-headline-md font-semibold">
              <Trophy className="h-5 w-5 text-tertiary" /> Achievements
            </h2>
            <div className="space-y-2">
              {recentAchievements.map((a) => (
                <Card key={a.id} className="!p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{a.icon}</span>
                    <div>
                      <p className="font-medium">{a.name}</p>
                      <p className="text-label-sm text-on-surface-variant">{a.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
              <Link to="/achievements" className="block text-center text-label-md text-primary hover:underline">View all achievements</Link>
            </div>
          </section>

          <Card>
            <div className="flex items-center gap-2 text-label-md font-semibold text-on-surface-variant">
              <TrendingUp className="h-4 w-4" /> Class rank
            </div>
            <ol className="mt-4 space-y-2">
              {buildLeaderboard(data.studentProfiles, data.users).slice(0, 5).map((entry, i) => (
                <li key={entry.userId} className={`flex items-center justify-between rounded-lg px-3 py-2 text-label-md ${entry.userId === user.id ? 'bg-primary-container/10 font-semibold' : ''}`}>
                  <span>#{i + 1} {entry.fullName}</span>
                  <span className="text-on-surface-variant">{entry.totalXp} XP</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
