import { useState } from 'react';
import { GraduationCap, Save } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/stores/appStore';

export default function SchoolSettingsPage() {
  const data = useAppStore((s) => s.data);

  const [schoolName, setSchoolName] = useState(data.school.name);
  const [schoolCode, setSchoolCode] = useState(data.school.code);
  const [timezone, setTimezone] = useState('America/New_York');
  const [academicYear, setAcademicYear] = useState('2025-2026');
  const [gradeLevels, setGradeLevels] = useState('K,1,2,3,4,5,6,7,8');
  const [saved, setSaved] = useState(false);

  const studentCount = data.users.filter((u) => u.role === 'student').length;
  const teacherCount = data.users.filter((u) => u.role === 'teacher').length;
  const classCount = data.classes.length;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">School Settings</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Configure school-wide settings and enrollment.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold">{studentCount}</p>
          <p className="text-label-sm text-on-surface-variant">Students</p>
        </Card>
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold">{teacherCount}</p>
          <p className="text-label-sm text-on-surface-variant">Teachers</p>
        </Card>
        <Card variant="metric" className="text-center">
          <p className="text-headline-md font-bold">{classCount}</p>
          <p className="text-label-sm text-on-surface-variant">Classes</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <CardTitle>School Configuration</CardTitle>
          </div>
          <CardDescription>Changes are stored locally in this demo environment.</CardDescription>
        </CardHeader>
        <div className="space-y-5">
          <Input label="School name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
          <Input label="School code" value={schoolCode} onChange={(e) => setSchoolCode(e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-label-md font-medium">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="h-11 rounded-xl border border-outline-variant px-3"
              >
                <option value="America/New_York">Eastern (ET)</option>
                <option value="America/Chicago">Central (CT)</option>
                <option value="America/Denver">Mountain (MT)</option>
                <option value="America/Los_Angeles">Pacific (PT)</option>
              </select>
            </div>
            <Input label="Academic year" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} />
          </div>
          <Input label="Grade levels (comma-separated)" value={gradeLevels} onChange={(e) => setGradeLevels(e.target.value)} />
          <div className="flex flex-wrap gap-2">
            {gradeLevels.split(',').map((g) => (
              <Badge key={g} variant="outline" className="normal-case">Grade {g.trim()}</Badge>
            ))}
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
            {saved ? 'Saved!' : 'Save Settings'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
