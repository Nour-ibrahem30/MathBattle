import { useState } from 'react';
import { Ban, CheckCircle, Search, UserCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useAppStore } from '@/stores/appStore';
import type { UserRole } from '@/types';

export default function UsersPage() {
  const data = useAppStore((s) => s.data);
  const updateUserStatus = useAppStore((s) => s.updateUserStatus);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');

  const filtered = data.users.filter((u) => {
    if (search && !u.fullName.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    return true;
  });

  const handleSuspend = (userId: string, currentStatus: string) => {
    updateUserStatus(userId, currentStatus === 'suspended' ? 'active' : 'suspended');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">User Management</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          View and manage all platform users across roles.
        </p>
      </div>

      <Card className="!p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="search"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low pl-10 pr-4 focus:border-primary focus:outline-none"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
            className="h-11 rounded-xl border border-outline-variant bg-surface-container-low px-3"
          >
            <option value="all">All roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/60 bg-surface-container-low">
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">User</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Email</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Role</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Status</th>
                <th className="px-6 py-3 text-label-sm font-semibold uppercase text-on-surface-variant">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-outline-variant/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.fullName} size="sm" />
                      <span className="font-medium">{u.fullName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{u.email}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="normal-case capitalize">{u.role}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={u.status === 'active' ? 'success' : u.status === 'suspended' ? 'error' : 'warning'}
                      className="normal-case capitalize"
                    >
                      {u.status.replace(/_/g, ' ')}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {u.role !== 'admin' && (
                      <Button
                        variant={u.status === 'suspended' ? 'outline' : 'danger'}
                        size="sm"
                        onClick={() => handleSuspend(u.id, u.status)}
                      >
                        {u.status === 'suspended' ? (
                          <><UserCheck className="h-4 w-4" /> Reactivate</>
                        ) : (
                          <><Ban className="h-4 w-4" /> Suspend</>
                        )}
                      </Button>
                    )}
                    {u.status === 'active' && u.role === 'admin' && (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
