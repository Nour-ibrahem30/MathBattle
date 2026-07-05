import { CheckCircle2, Lock, Shield, Users } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const rbacMatrix = [
  { resource: 'Student Dashboard', student: true, teacher: false, admin: false },
  { resource: 'Learning Paths', student: true, teacher: false, admin: false },
  { resource: 'Match Arena', student: true, teacher: false, admin: false },
  { resource: 'Class Management', student: false, teacher: true, admin: true },
  { resource: 'Question Bank', student: false, teacher: true, admin: true },
  { resource: 'AI Question Generation', student: false, teacher: true, admin: false },
  { resource: 'User Management', student: false, teacher: false, admin: true },
  { resource: 'School Settings', student: false, teacher: false, admin: true },
  { resource: 'Audit Logs', student: false, teacher: false, admin: true },
  { resource: 'System Monitoring', student: false, teacher: false, admin: true },
];

const securityFeatures = [
  { title: 'JWT Authentication', status: 'Active', desc: 'Access tokens expire in 15 minutes with refresh rotation.' },
  { title: 'Role-Based Access Control', status: 'Active', desc: 'Student, teacher, admin, and operator roles enforced on all routes.' },
  { title: 'COPPA Compliance', status: 'Active', desc: 'Parental consent flow for users under 13.' },
  { title: 'Data Encryption', status: 'Active', desc: 'TLS 1.3 in transit, AES-256 at rest for PII fields.' },
  { title: 'Rate Limiting', status: 'Active', desc: '100 req/min per IP on auth endpoints.' },
  { title: 'Session Management', status: 'Active', desc: 'Concurrent session limits and forced logout on password change.' },
];

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Security Overview</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Platform security posture and role-based access control matrix.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-success" />
            <div>
              <p className="text-headline-md font-bold">Secure</p>
              <p className="text-label-sm text-on-surface-variant">Overall Status</p>
            </div>
          </div>
        </Card>
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <Lock className="h-8 w-8 text-primary" />
            <div>
              <p className="text-headline-md font-bold">6/6</p>
              <p className="text-label-sm text-on-surface-variant">Features Active</p>
            </div>
          </div>
        </Card>
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-secondary" />
            <div>
              <p className="text-headline-md font-bold">4</p>
              <p className="text-label-sm text-on-surface-variant">User Roles</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Features</CardTitle>
          <CardDescription>Current security controls in place</CardDescription>
        </CardHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          {securityFeatures.map((f) => (
            <div key={f.title} className="rounded-xl border border-outline-variant p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{f.title}</p>
                <Badge variant="success" className="normal-case">{f.status}</Badge>
              </div>
              <p className="mt-1 text-label-md text-on-surface-variant">{f.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden !p-0">
        <CardHeader className="px-6 pt-6">
          <CardTitle>RBAC Matrix</CardTitle>
          <CardDescription>Permission mapping by role</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-outline-variant/60 bg-surface-container-low">
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Resource</th>
                <th className="px-6 py-3 text-center text-label-sm font-semibold uppercase text-on-surface-variant">Student</th>
                <th className="px-6 py-3 text-center text-label-sm font-semibold uppercase text-on-surface-variant">Teacher</th>
                <th className="px-6 py-3 text-center text-label-sm font-semibold uppercase text-on-surface-variant">Admin</th>
              </tr>
            </thead>
            <tbody>
              {rbacMatrix.map((row) => (
                <tr key={row.resource} className="border-b border-outline-variant/30">
                  <td className="px-6 py-3 font-medium">{row.resource}</td>
                  {[row.student, row.teacher, row.admin].map((allowed, i) => (
                    <td key={i} className="px-6 py-3 text-center">
                      {allowed ? (
                        <CheckCircle2 className="mx-auto h-5 w-5 text-success" />
                      ) : (
                        <span className="text-on-surface-variant">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
