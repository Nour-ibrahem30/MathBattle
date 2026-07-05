import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';

const sampleAuditRows = [
  { id: '1', timestamp: '2026-07-04T14:32:00Z', actor: 'Alex Chen', action: 'user.suspend', target: 'Sam Patel', ip: '192.168.1.10' },
  { id: '2', timestamp: '2026-07-04T11:15:00Z', actor: 'Ms. Rivera', action: 'question.publish', target: 'q-002', ip: '10.0.0.45' },
  { id: '3', timestamp: '2026-07-03T16:48:00Z', actor: 'Jordan Lee', action: 'auth.login', target: 'user-student-001', ip: '172.16.0.22' },
  { id: '4', timestamp: '2026-07-03T09:20:00Z', actor: 'Alex Chen', action: 'school.settings.update', target: 'school-demo-001', ip: '192.168.1.10' },
  { id: '5', timestamp: '2026-07-02T13:05:00Z', actor: 'Ms. Rivera', action: 'assignment.create', target: 'assign-001', ip: '10.0.0.45' },
];

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString();
}

export default function AuditLogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Audit Log</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Immutable record of security-relevant platform actions.
        </p>
      </div>

      <Card variant="ai" className="!py-4">
        <p className="text-body-md text-on-surface-variant">
          Live audit logging is not yet connected in this demo. Below are sample entries illustrating the expected format.
        </p>
      </Card>

      <Card className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/60 bg-surface-container-low">
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Timestamp</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Actor</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Action</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Target</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {sampleAuditRows.map((row) => (
                <tr key={row.id} className="border-b border-outline-variant/30">
                  <td className="px-6 py-4 text-label-md text-on-surface-variant">{formatTimestamp(row.timestamp)}</td>
                  <td className="px-6 py-4 font-medium">{row.actor}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="normal-case font-mono">{row.action}</Badge>
                  </td>
                  <td className="px-6 py-4 font-mono text-label-md">{row.target}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{row.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <EmptyState
        icon={FileText}
        title="Full audit trail coming soon"
        description="Production audit logs will be persisted to an append-only store with 7-year retention for compliance."
      />
    </div>
  );
}
