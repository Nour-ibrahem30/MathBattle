import { Bell, CheckCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/stores/appStore';
import { formatRelativeDate } from '@/lib/utils';

export default function NotificationsPage() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);
  const markNotificationRead = useAppStore((s) => s.markNotificationRead);
  const markAllNotificationsRead = useAppStore((s) => s.markAllNotificationsRead);

  const notifications = data.notifications
    .filter((n) => n.userId === user.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  const typeLabels: Record<string, string> = {
    assignment_published: 'Assignment',
    match_invitation: 'Match',
    achievement_earned: 'Achievement',
    system: 'System',
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">Notifications</h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={() => markAllNotificationsRead(user.id)}>
            <CheckCheck className="h-4 w-4" /> Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="When you receive assignments, match invites, or achievements, they'll appear here."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card
              key={n.id}
              className={`!p-4 cursor-pointer transition ${!n.readAt ? 'border-primary/30 bg-primary-container/5' : ''}`}
              onClick={() => !n.readAt && markNotificationRead(n.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{n.title}</p>
                    <Badge variant="outline" className="normal-case">
                      {typeLabels[n.type] ?? n.type}
                    </Badge>
                    {!n.readAt && <Badge variant="primary" className="normal-case">New</Badge>}
                  </div>
                  <p className="mt-1 text-body-md text-on-surface-variant">{n.body}</p>
                  <p className="mt-2 text-label-sm text-on-surface-variant">{formatRelativeDate(n.createdAt)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
