import { useState } from 'react';
import { Flame, Save, Settings, Shield } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAppStore } from '@/stores/appStore';
import { getNextRankXp, RANK_THRESHOLDS } from '@/types';

export default function ProfilePage() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);
  const profile = data.studentProfiles.find((p) => p.userId === user.id);

  const [displayName, setDisplayName] = useState(user.fullName);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [saved, setSaved] = useState(false);

  const xp = profile?.totalXp ?? 0;
  const rank = profile?.rank ?? 'novice';
  const nextXp = getNextRankXp(xp);
  const currentThreshold = RANK_THRESHOLDS[rank];
  const xpProgress = ((xp - currentThreshold) / (nextXp - currentThreshold)) * 100;

  const completedLessons = data.lessonAttempts.filter(
    (a) => a.studentUserId === user.id && a.status === 'completed',
  ).length;
  const matchWins = data.matches.filter((m) => m.winnerUserId === user.id).length;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Profile</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">Manage your account and preferences.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <Avatar name={user.fullName} size="lg" className="!h-20 !w-20 !text-headline-md" />
            <h2 className="mt-4 text-headline-md font-bold">{user.fullName}</h2>
            <p className="text-body-md text-on-surface-variant">{user.email}</p>
            <Badge variant="primary" className="mt-3 normal-case capitalize">{rank}</Badge>
            <div className="mt-4 flex gap-4 text-center">
              <div>
                <p className="text-headline-md font-bold">{xp.toLocaleString()}</p>
                <p className="text-label-sm text-on-surface-variant">Total XP</p>
              </div>
              <div>
                <p className="text-headline-md font-bold flex items-center justify-center gap-1">
                  <Flame className="h-5 w-5 text-orange-500" />
                  {profile?.streakCount ?? 0}
                </p>
                <p className="text-label-sm text-on-surface-variant">Day Streak</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>{nextXp - xp} XP to next rank</CardDescription>
          </CardHeader>
          <ProgressBar value={Math.min(100, xpProgress)} label={`${xp} / ${nextXp} XP`} />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-surface-container-low p-4 text-center">
              <p className="text-headline-md font-bold">{completedLessons}</p>
              <p className="text-label-sm text-on-surface-variant">Lessons Done</p>
            </div>
            <div className="rounded-xl bg-surface-container-low p-4 text-center">
              <p className="text-headline-md font-bold">{matchWins}</p>
              <p className="text-label-sm text-on-surface-variant">Match Wins</p>
            </div>
            <div className="rounded-xl bg-surface-container-low p-4 text-center">
              <p className="text-headline-md font-bold">Grade {profile?.grade ?? 5}</p>
              <p className="text-label-sm text-on-surface-variant">Current Grade</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-on-surface-variant" />
            <CardTitle>Settings</CardTitle>
          </div>
          <CardDescription>Preferences are saved locally in this demo.</CardDescription>
        </CardHeader>
        <div className="space-y-5">
          <Input
            label="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="h-4 w-4 rounded border-outline-variant"
            />
            <span className="text-body-md">Email notifications for assignments and matches</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={soundEffects}
              onChange={(e) => setSoundEffects(e.target.checked)}
              className="h-4 w-4 rounded border-outline-variant"
            />
            <span className="text-body-md">Sound effects during practice and matches</span>
          </label>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
            {saved ? 'Saved!' : 'Save Settings'}
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 shrink-0 text-on-surface-variant" />
          <div>
            <p className="font-semibold">Account Status</p>
            <p className="text-body-md text-on-surface-variant capitalize">
              {user.status.replace(/_/g, ' ')} · {data.school.name}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
