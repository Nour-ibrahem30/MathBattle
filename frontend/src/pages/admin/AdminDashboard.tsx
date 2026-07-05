import { Link } from 'react-router-dom';
import { Activity, BookOpen, GraduationCap, Shield, Users } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/stores/appStore';

export default function AdminDashboard() {
  const data = useAppStore((s) => s.data);

  const students = data.users.filter((u) => u.role === 'student');
  const teachers = data.users.filter((u) => u.role === 'teacher');
  const activeUsers = data.users.filter((u) => u.status === 'active').length;
  const suspendedUsers = data.users.filter((u) => u.status === 'suspended').length;
  const publishedQuestions = data.questions.filter((q) => q.status === 'published').length;
  const totalMatches = data.matches.length;
  const completedLessons = data.lessonAttempts.filter((a) => a.status === 'completed').length;

  const kpis = [
    { label: 'Total Users', value: data.users.length, icon: Users, color: 'text-primary' },
    { label: 'Students', value: students.length, icon: GraduationCap, color: 'text-secondary' },
    { label: 'Teachers', value: teachers.length, icon: BookOpen, color: 'text-tertiary' },
    { label: 'Active Users', value: activeUsers, icon: Activity, color: 'text-success' },
    { label: 'Published Questions', value: publishedQuestions, icon: BookOpen, color: 'text-primary' },
    { label: 'Lessons Completed', value: completedLessons, icon: GraduationCap, color: 'text-secondary' },
    { label: 'Total Matches', value: totalMatches, icon: Activity, color: 'text-tertiary' },
    { label: 'Suspended', value: suspendedUsers, icon: Shield, color: 'text-error' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Admin Dashboard</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Platform overview for {data.school.name}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} variant="metric">
            <div className="flex items-center gap-3">
              <Icon className={`h-8 w-8 ${color}`} />
              <div>
                <p className="text-headline-md font-bold">{value.toLocaleString()}</p>
                <p className="text-label-sm text-on-surface-variant">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { label: 'Manage Users', href: '/admin/users' },
              { label: 'School Settings', href: '/admin/school' },
              { label: 'View Reports', href: '/admin/reports' },
              { label: 'Security Overview', href: '/admin/security' },
              { label: 'System Monitoring', href: '/admin/monitoring' },
              { label: 'Audit Log', href: '/admin/audit' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="rounded-xl border border-outline-variant px-4 py-3 text-label-md font-medium transition hover:border-primary hover:bg-primary-fixed/20"
              >
                {label}
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {[
              { action: 'User login', detail: 'Jordan Lee signed in', time: '2 min ago' },
              { action: 'Question published', detail: 'Ms. Rivera published q-002', time: '1 hr ago' },
              { action: 'Match completed', detail: 'Jordan Lee vs Sam Patel', time: '3 hrs ago' },
              { action: 'Assignment created', detail: 'Fractions Practice — Week 3', time: 'Yesterday' },
            ].map((item) => (
              <div key={item.detail} className="flex items-start justify-between rounded-lg bg-surface-container-low px-3 py-2">
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-label-sm text-on-surface-variant">{item.detail}</p>
                </div>
                <span className="shrink-0 text-label-sm text-on-surface-variant">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card variant="ai">
        <div className="flex items-center gap-3">
          <Badge variant="success" className="normal-case">System Healthy</Badge>
          <p className="text-body-md text-on-surface-variant">
            All services operational. Last health check: just now.
          </p>
          <Link to="/admin/monitoring" className="ml-auto text-label-md text-primary hover:underline">
            View monitoring →
          </Link>
        </div>
      </Card>
    </div>
  );
}
