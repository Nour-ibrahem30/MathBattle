import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoadingState } from '@/components/ui/EmptyState';
import { AdminLayout, ImmersiveLayout, PublicLayout, StudentLayout, TeacherLayout } from '@/components/layout/AppLayout';
import { GuestRoute, ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { useAppStore } from '@/stores/appStore';
import { getDefaultRoute } from '@/config/navigation';

const LandingPage = lazy(() => import('@/pages/public/LandingPage'));
const LoginPage = lazy(() => import('@/pages/public/LoginPage'));
const StudentDashboard = lazy(() => import('@/pages/student/StudentDashboard'));
const LearningPathsPage = lazy(() => import('@/pages/student/LearningPathsPage'));
const PathDetailPage = lazy(() => import('@/pages/student/PathDetailPage'));
const LessonPage = lazy(() => import('@/pages/student/LessonPage'));
const MatchLobbyPage = lazy(() => import('@/pages/student/MatchLobbyPage'));
const MatchArenaPage = lazy(() => import('@/pages/student/MatchArenaPage'));
const MatchResultPage = lazy(() => import('@/pages/student/MatchResultPage'));
const MatchHistoryPage = lazy(() => import('@/pages/student/MatchHistoryPage'));
const AchievementsPage = lazy(() => import('@/pages/student/AchievementsPage'));
const MissionsPage = lazy(() => import('@/pages/student/MissionsPage'));
const LeaderboardPage = lazy(() => import('@/pages/student/LeaderboardPage'));
const ProfilePage = lazy(() => import('@/pages/student/ProfilePage'));
const NotificationsPage = lazy(() => import('@/pages/student/NotificationsPage'));
const AnalyticsPage = lazy(() => import('@/pages/student/AnalyticsPage'));
const TeacherDashboard = lazy(() => import('@/pages/teacher/TeacherDashboard'));
const ClassesPage = lazy(() => import('@/pages/teacher/ClassesPage'));
const ClassDetailPage = lazy(() => import('@/pages/teacher/ClassDetailPage'));
const AssignmentsPage = lazy(() => import('@/pages/teacher/AssignmentsPage'));
const AssignmentNewPage = lazy(() => import('@/pages/teacher/AssignmentNewPage'));
const QuestionBankPage = lazy(() => import('@/pages/teacher/QuestionBankPage'));
const QuestionEditPage = lazy(() => import('@/pages/teacher/QuestionEditPage'));
const AiGeneratePage = lazy(() => import('@/pages/teacher/AiGeneratePage'));
const ExamBuilderPage = lazy(() => import('@/pages/teacher/ExamBuilderPage'));
const TeacherReportsPage = lazy(() => import('@/pages/teacher/TeacherReportsPage'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const UsersPage = lazy(() => import('@/pages/admin/UsersPage'));
const SchoolSettingsPage = lazy(() => import('@/pages/admin/SchoolSettingsPage'));
const AdminReportsPage = lazy(() => import('@/pages/admin/AdminReportsPage'));
const SecurityPage = lazy(() => import('@/pages/admin/SecurityPage'));
const MonitoringPage = lazy(() => import('@/pages/admin/MonitoringPage'));
const AuditLogPage = lazy(() => import('@/pages/admin/AuditLogPage'));
const AdminSettingsPage = lazy(() => import('@/pages/admin/AdminSettingsPage'));

function RoleRedirect() {
  const user = useAppStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={getDefaultRoute(user.role)} replace />;
}

export default function App() {
  const hydrate = useAppStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingState message="Loading MathBattle..." />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute roles={['student']} />}>
            <Route element={<StudentLayout />}>
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/learn" element={<LearningPathsPage />} />
              <Route path="/learn/paths/:id" element={<PathDetailPage />} />
              <Route path="/learn/lessons/:id" element={<LessonPage />} />
              <Route path="/matches" element={<MatchLobbyPage />} />
              <Route path="/matches/history" element={<MatchHistoryPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/missions" element={<MissionsPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>
            <Route element={<ImmersiveLayout />}>
              <Route path="/matches/:id" element={<MatchArenaPage />} />
              <Route path="/matches/:id/result" element={<MatchResultPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute roles={['teacher']} />}>
            <Route element={<TeacherLayout />}>
              <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher/classes" element={<ClassesPage />} />
              <Route path="/teacher/classes/:id" element={<ClassDetailPage />} />
              <Route path="/teacher/assignments" element={<AssignmentsPage />} />
              <Route path="/teacher/assignments/new" element={<AssignmentNewPage />} />
              <Route path="/teacher/questions" element={<QuestionBankPage />} />
              <Route path="/teacher/questions/new" element={<QuestionEditPage />} />
              <Route path="/teacher/questions/:id" element={<QuestionEditPage />} />
              <Route path="/teacher/ai/generate" element={<AiGeneratePage />} />
              <Route path="/teacher/exam-builder" element={<ExamBuilderPage />} />
              <Route path="/teacher/reports" element={<TeacherReportsPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute roles={['admin', 'operator']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/school" element={<SchoolSettingsPage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />
              <Route path="/admin/security" element={<SecurityPage />} />
              <Route path="/admin/monitoring" element={<MonitoringPage />} />
              <Route path="/admin/audit" element={<AuditLogPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
            </Route>
          </Route>

          <Route path="/home" element={<RoleRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
