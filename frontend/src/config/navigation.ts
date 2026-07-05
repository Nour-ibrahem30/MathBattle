import type { LucideIcon } from 'lucide-react';
import {
  Award,
  BarChart3,
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Shield,
  Sparkles,
  Swords,
  Target,
  Users,
  Bell,
  User,
  Activity,
} from 'lucide-react';
import type { UserRole } from '@/types';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export const studentNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['student'] },
  { label: 'Learning', href: '/learn', icon: BookOpen, roles: ['student'] },
  { label: 'Matches', href: '/matches', icon: Swords, roles: ['student'] },
  { label: 'Achievements', href: '/achievements', icon: Award, roles: ['student'] },
  { label: 'Missions', href: '/missions', icon: Target, roles: ['student'] },
  { label: 'Leaderboard', href: '/leaderboard', icon: BarChart3, roles: ['student'] },
  { label: 'Analytics', href: '/analytics', icon: Activity, roles: ['student'] },
  { label: 'Notifications', href: '/notifications', icon: Bell, roles: ['student'] },
  { label: 'Profile', href: '/profile', icon: User, roles: ['student'] },
];

export const teacherNav: NavItem[] = [
  { label: 'Dashboard', href: '/teacher/dashboard', icon: LayoutDashboard, roles: ['teacher'] },
  { label: 'Classes', href: '/teacher/classes', icon: GraduationCap, roles: ['teacher'] },
  { label: 'Assignments', href: '/teacher/assignments', icon: ClipboardList, roles: ['teacher'] },
  { label: 'Question Bank', href: '/teacher/questions', icon: FileText, roles: ['teacher'] },
  { label: 'AI Generate', href: '/teacher/ai/generate', icon: Sparkles, roles: ['teacher'] },
  { label: 'Exam Builder', href: '/teacher/exam-builder', icon: BookOpen, roles: ['teacher'] },
  { label: 'Reports', href: '/teacher/reports', icon: BarChart3, roles: ['teacher'] },
];

export const adminNav: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['admin'] },
  { label: 'Users', href: '/admin/users', icon: Users, roles: ['admin'] },
  { label: 'School', href: '/admin/school', icon: GraduationCap, roles: ['admin'] },
  { label: 'Reports', href: '/admin/reports', icon: BarChart3, roles: ['admin'] },
  { label: 'Security', href: '/admin/security', icon: Shield, roles: ['admin'] },
  { label: 'Monitoring', href: '/admin/monitoring', icon: Activity, roles: ['admin'] },
  { label: 'Audit Log', href: '/admin/audit', icon: FileText, roles: ['admin'] },
  { label: 'Settings', href: '/admin/settings', icon: Settings, roles: ['admin'] },
];

export function getDefaultRoute(role: UserRole): string {
  switch (role) {
    case 'student':
      return '/dashboard';
    case 'teacher':
      return '/teacher/dashboard';
    case 'admin':
    case 'operator':
      return '/admin/dashboard';
    default:
      return '/login';
  }
}
