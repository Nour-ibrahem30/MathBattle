import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Bell, HelpCircle, LogOut, Menu, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/appStore';
import { Avatar } from '@/components/ui/Avatar';
import { studentNav, teacherNav, adminNav, type NavItem } from '@/config/navigation';

function Sidebar({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  const logout = useAppStore((s) => s.logout);
  const user = useAppStore((s) => s.user);
  const navigate = useNavigate();
  const unread = useAppStore((s) =>
    s.data.notifications.filter((n) => n.userId === s.user?.id && !n.readAt).length,
  );

  return (
    <aside className="flex h-full w-64 flex-col border-r border-outline-variant/50 bg-surface-container-low p-4">
      <div className="mb-8 px-2">
        <h1 className="text-headline-md font-bold tracking-tight text-primary">MathBattle</h1>
        <p className="font-label text-label-sm text-on-surface-variant">AI-Powered Mastery</p>
      </div>
      <nav className="flex-1 space-y-1" aria-label="Main navigation">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn('flex items-center gap-3 px-3 py-2.5 text-label-md transition-all', isActive ? 'nav-active' : 'nav-inactive')
            }
          >
            <item.icon className="h-5 w-5 shrink-0" aria-hidden />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto space-y-2 border-t border-outline-variant/40 pt-4">
        <NavLink to="/notifications" className="nav-inactive flex items-center gap-3 px-3 py-2.5 text-label-md">
          <Bell className="h-5 w-5" />
          Notifications
          {unread > 0 && (
            <span className="ml-auto rounded-full bg-error px-1.5 py-0.5 text-[10px] font-bold text-white">{unread}</span>
          )}
        </NavLink>
        <button
          type="button"
          className="nav-inactive flex w-full items-center gap-3 px-3 py-2.5 text-label-md"
          onClick={() => { logout(); navigate('/login'); }}
        >
          <LogOut className="h-5 w-5" />
          Sign out
        </button>
        {user && (
          <div className="flex items-center gap-3 rounded-xl bg-surface-container-high p-3">
            <Avatar name={user.fullName} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-label-md font-medium">{user.fullName}</p>
              <p className="truncate text-label-sm capitalize text-on-surface-variant">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function MobileBottomNav({ items }: { items: NavItem[] }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant/50 bg-surface-container-lowest/90 backdrop-blur-lg lg:hidden" aria-label="Mobile navigation">
      <div className="flex justify-around px-2 py-2">
        {items.slice(0, 4).map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-medium transition-all',
                isActive ? 'bg-secondary-container text-white scale-105' : 'text-on-surface-variant',
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label.split(' ')[0]}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function TopBar() {
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'));
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setDark((d) => !d);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-outline-variant/40 bg-surface/80 px-4 backdrop-blur-md lg:px-8">
      <div className="lg:hidden font-semibold text-primary">MathBattle</div>
      <div className="ml-auto flex items-center gap-2">
        <button type="button" onClick={toggleTheme} className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high" aria-label={dark ? 'Light mode' : 'Dark mode'}>
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button type="button" className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high" aria-label="Help">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function AppShell({ navItems }: { navItems: NavItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40">
        <Sidebar items={navItems} />
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-inverse-surface/40" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full shadow-elevated">
            <Sidebar items={navItems} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="flex items-center lg:hidden border-b px-4 py-3">
          <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <TopBar />
        <main className="flex-1 custom-scrollbar pb-20 lg:pb-8">
          <div className="mx-auto max-w-content px-4 py-6 lg:px-8 lg:py-8 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileBottomNav items={navItems} />
    </div>
  );
}

export function StudentLayout() {
  return <AppShell navItems={studentNav} />;
}

export function TeacherLayout() {
  return <AppShell navItems={teacherNav} />;
}

export function AdminLayout() {
  return <AppShell navItems={adminNav} />;
}

export function ImmersiveLayout() {
  const navigate = useNavigate();
  const logout = useAppStore((s) => s.logout);
  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-14 items-center justify-between border-b border-outline-variant/40 px-4 lg:px-8">
        <button type="button" onClick={() => navigate(-1)} className="text-label-md text-primary hover:underline">
          ← Exit
        </button>
        <span className="font-semibold text-primary">MathBattle</span>
        <button type="button" onClick={() => { logout(); navigate('/login'); }} className="text-label-sm text-on-surface-variant">
          Sign out
        </button>
      </header>
      <main><Outlet /></main>
    </div>
  );
}

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}
