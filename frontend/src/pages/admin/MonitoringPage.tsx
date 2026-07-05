import { Activity, CheckCircle2, Clock, Database, Server, Wifi } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';

const services = [
  { name: 'API Server', status: 'healthy', uptime: '99.98%', latency: '42ms', icon: Server },
  { name: 'WebSocket Match Server', status: 'healthy', uptime: '99.95%', latency: '18ms', icon: Wifi },
  { name: 'PostgreSQL Database', status: 'healthy', uptime: '99.99%', latency: '8ms', icon: Database },
  { name: 'Redis Cache', status: 'healthy', uptime: '99.97%', latency: '2ms', icon: Activity },
  { name: 'BullMQ Job Queue', status: 'healthy', uptime: '99.96%', latency: '12ms', icon: Clock },
];

const metrics = [
  { label: 'CPU Usage', value: 34, max: 100, variant: 'primary' as const },
  { label: 'Memory Usage', value: 58, max: 100, variant: 'secondary' as const },
  { label: 'Disk Usage', value: 42, max: 100, variant: 'tertiary' as const },
  { label: 'Active Connections', value: 127, max: 500, variant: 'primary' as const },
  { label: 'Requests/min', value: 842, max: 2000, variant: 'secondary' as const },
  { label: 'Error Rate', value: 0.3, max: 5, variant: 'tertiary' as const },
];

export default function MonitoringPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">System Monitoring</h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Real-time health metrics and service status (mock data).
          </p>
        </div>
        <Badge variant="success" className="normal-case w-fit">
          <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" /> All Systems Operational
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ name, status, uptime, latency, icon: Icon }) => (
          <Card key={name} variant="metric">
            <div className="flex items-start justify-between">
              <Icon className="h-6 w-6 text-primary" />
              <Badge variant="success" className="normal-case capitalize">{status}</Badge>
            </div>
            <p className="mt-3 font-semibold">{name}</p>
            <div className="mt-2 flex gap-4 text-label-sm text-on-surface-variant">
              <span>Uptime: {uptime}</span>
              <span>Latency: {latency}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Metrics</CardTitle>
          <CardDescription>Last updated: just now · Auto-refreshes every 30s</CardDescription>
        </CardHeader>
        <div className="grid gap-5 sm:grid-cols-2">
          {metrics.map((m) => (
            <div key={m.label}>
              <ProgressBar
                value={m.value}
                max={m.max}
                label={`${m.label}: ${m.label.includes('Rate') ? `${m.value}%` : m.value}`}
                variant={m.variant}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {[
            { level: 'info', message: 'Scheduled maintenance window completed successfully', time: '6 hrs ago' },
            { level: 'warning', message: 'Match server connection spike detected — auto-scaled', time: '2 days ago' },
            { level: 'info', message: 'Database backup completed', time: '3 days ago' },
          ].map((alert) => (
            <div key={alert.message} className="flex items-start justify-between rounded-lg bg-surface-container-low px-4 py-3">
              <div className="flex items-start gap-2">
                <Badge variant={alert.level === 'warning' ? 'warning' : 'outline'} className="normal-case mt-0.5">
                  {alert.level}
                </Badge>
                <p className="text-body-md">{alert.message}</p>
              </div>
              <span className="shrink-0 text-label-sm text-on-surface-variant">{alert.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
