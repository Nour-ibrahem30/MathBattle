import { Link } from 'react-router-dom';
import { AlertTriangle, BookOpen, ClipboardList, TrendingDown, Users } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { useAppStore } from '@/stores/appStore';

export default function TeacherDashboard() {
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);

  const myClasses = data.classes.filter((c) => c.teacherUserId === user.id);
  const totalStudents = myClasses.reduce((s, c) => s + c.studentIds.length, 0);
  const publishedAssignments = data.assignments.filter((a) =>
    myClasses.some((c) => c.id === a.classId) && a.status === 'published',
  ).length;
  const draftQuestions = data.questions.filter((q) => q.createdBy === user.id && q.status === 'draft').length;

  const atRisk = myClasses.flatMap((cls) =>
    cls.studentIds.map((sid) => {
      const student = data.users.find((u) => u.id === sid)!;
      const profile = data.studentProfiles.find((p) => p.userId === sid);
      const attempts = data.lessonAttempts.filter((a) => a.studentUserId === sid && a.status === 'completed');
      const avgScore = attempts.length > 0
        ? attempts.reduce((s, a) => s + (a.scorePercentage ?? 0), 0) / attempts.length
        : 0;
      const rec = data.aiRecommendations.find((r) => r.studentUserId === sid);
      return { student, profile, avgScore, rec, className: cls.name, attemptCount: attempts.length };
    }),
  ).filter((s) => s.avgScore < 70 || s.rec?.priority === 'high' || s.attemptCount === 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Teacher Dashboard</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Overview of your classes, assignments, and student performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-headline-md font-bold">{totalStudents}</p>
              <p className="text-label-sm text-on-surface-variant">Students</p>
            </div>
          </div>
        </Card>
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-secondary" />
            <div>
              <p className="text-headline-md font-bold">{myClasses.length}</p>
              <p className="text-label-sm text-on-surface-variant">Classes</p>
            </div>
          </div>
        </Card>
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-tertiary" />
            <div>
              <p className="text-headline-md font-bold">{publishedAssignments}</p>
              <p className="text-label-sm text-on-surface-variant">Active Assignments</p>
            </div>
          </div>
        </Card>
        <Card variant="metric">
          <div className="flex items-center gap-3">
            <TrendingDown className="h-8 w-8 text-error" />
            <div>
              <p className="text-headline-md font-bold">{atRisk.length}</p>
              <p className="text-label-sm text-on-surface-variant">At-Risk Students</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-headline-md font-semibold">Your Classes</h2>
            <Link to="/teacher/classes" className="text-label-md text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {myClasses.map((cls) => (
              <Link key={cls.id} to={`/teacher/classes/${cls.id}`}>
                <Card hover className="!py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{cls.name}</p>
                      <p className="text-label-sm text-on-surface-variant">Grade {cls.grade} · {cls.studentIds.length} students</p>
                    </div>
                    <Badge variant="outline" className="normal-case">Active</Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-error" />
            <h2 className="text-headline-md font-semibold">At-Risk Students</h2>
          </div>
          {atRisk.length === 0 ? (
            <Card>
              <p className="text-body-md text-on-surface-variant">All students are on track. Great work!</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {atRisk.map(({ student, avgScore, rec, className, attemptCount }) => (
                <Card key={student.id} className="!py-4">
                  <div className="flex items-start gap-3">
                    <Avatar name={student.fullName} />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{student.fullName}</p>
                      <p className="text-label-sm text-on-surface-variant">{className}</p>
                      {attemptCount > 0 ? (
                        <ProgressBar className="mt-2" value={avgScore} label={`Avg score: ${Math.round(avgScore)}%`} />
                      ) : (
                        <Badge variant="warning" className="mt-2 normal-case">No activity yet</Badge>
                      )}
                      {rec && (
                        <p className="mt-2 text-label-sm text-on-surface-variant italic">{rec.reason}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

      {draftQuestions > 0 && (
        <Card variant="ai">
          <CardHeader>
            <CardTitle className="!text-body-lg">Pending Review</CardTitle>
            <CardDescription>
              You have {draftQuestions} draft question{draftQuestions > 1 ? 's' : ''} awaiting review.
            </CardDescription>
          </CardHeader>
          <Link to="/teacher/questions" className="text-label-md text-primary hover:underline">
            Review question bank →
          </Link>
        </Card>
      )}
    </div>
  );
}
