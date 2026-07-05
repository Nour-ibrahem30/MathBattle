import { useState } from 'react';
import { Bell, Globe, Save, Settings, Sparkles } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState('MathBattle');
  const [supportEmail, setSupportEmail] = useState('support@demo.mathbattle.io');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [aiGenerationEnabled, setAiGenerationEnabled] = useState(true);
  const [matchmakingEnabled, setMatchmakingEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [maxMatchDuration, setMaxMatchDuration] = useState(120);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Platform Settings</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Global configuration for the MathBattle platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>General</CardTitle>
          </div>
          <CardDescription>Basic platform identity and contact settings.</CardDescription>
        </CardHeader>
        <div className="space-y-5">
          <Input label="Platform name" value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
          <Input label="Support email" type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.checked)} />
            <div>
              <span className="font-medium">Maintenance mode</span>
              <p className="text-label-sm text-on-surface-variant">Restrict access to admins only during maintenance.</p>
            </div>
          </label>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary" />
            <CardTitle>Feature Flags</CardTitle>
          </div>
          <CardDescription>Enable or disable platform features globally.</CardDescription>
        </CardHeader>
        <div className="space-y-4">
          <label className="flex items-center justify-between rounded-xl border border-outline-variant p-4">
            <div>
              <p className="font-medium">AI Question Generation</p>
              <p className="text-label-sm text-on-surface-variant">Allow teachers to generate draft questions via AI.</p>
            </div>
            <input type="checkbox" checked={aiGenerationEnabled} onChange={(e) => setAiGenerationEnabled(e.target.checked)} />
          </label>
          <label className="flex items-center justify-between rounded-xl border border-outline-variant p-4">
            <div>
              <p className="font-medium">1v1 Matchmaking</p>
              <p className="text-label-sm text-on-surface-variant">Enable real-time multiplayer math battles.</p>
            </div>
            <input type="checkbox" checked={matchmakingEnabled} onChange={(e) => setMatchmakingEnabled(e.target.checked)} />
          </label>
          <div className="flex flex-wrap gap-2">
            <Badge variant={aiGenerationEnabled ? 'success' : 'outline'} className="normal-case">
              AI: {aiGenerationEnabled ? 'On' : 'Off'}
            </Badge>
            <Badge variant={matchmakingEnabled ? 'success' : 'outline'} className="normal-case">
              Matches: {matchmakingEnabled ? 'On' : 'Off'}
            </Badge>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-on-surface-variant" />
            <CardTitle>Match Settings</CardTitle>
          </div>
        </CardHeader>
        <Input
          label="Max match duration (seconds)"
          type="number"
          min={60}
          max={300}
          value={maxMatchDuration}
          onChange={(e) => setMaxMatchDuration(Number(e.target.value))}
        />
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-tertiary" />
            <CardTitle>Notifications</CardTitle>
          </div>
        </CardHeader>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
          <span className="text-body-md">Send system email notifications for critical events</span>
        </label>
      </Card>

      <Button onClick={handleSave} size="lg">
        <Save className="h-4 w-4" />
        {saved ? 'Settings Saved!' : 'Save Platform Settings'}
      </Button>
    </div>
  );
}
