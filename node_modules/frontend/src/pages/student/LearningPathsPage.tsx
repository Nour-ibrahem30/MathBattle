import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, GraduationCap } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAppStore } from '@/stores/appStore';

export default function LearningPathsPage() {
  const data = useAppStore((s) => s.data);
  const user = useAppStore((s) => s.user)!;
  const getLessonProgress = useAppStore((s) => s.getLessonProgress);
  const path = data.learningPath;

  const allLessons = path.units.flatMap((u) => u.lessons);
  const completedCount = allLessons.filter((l) => getLessonProgress(l.id) >= 60).length;
  const overallProgress = allLessons.length > 0 ? (completedCount / allLessons.length) * 100 : 0;

  const paths = [path];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Learning Paths</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Structured curriculum aligned to your grade level.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {paths.map((p) => (
          <Link key={p.id} to={`/learn/paths/${p.id}`}>
            <Card hover className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-fixed">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="primary" className="normal-case">
                    <GraduationCap className="mr-1 inline h-3.5 w-3.5" />
                    Grade {p.grade}
                  </Badge>
                </div>
                <CardTitle>{p.title}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <div className="space-y-3">
                <ProgressBar
                  value={overallProgress}
                  label={`${completedCount} of ${allLessons.length} lessons completed`}
                />
                <div className="flex items-center justify-between text-label-md text-primary">
                  <span>{p.units.length} units</span>
                  <span className="flex items-center gap-1">
                    Continue <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {user && (
        <Card variant="ai">
          <p className="text-body-md text-on-surface-variant">
            Your current path covers {path.subject} for Grade {path.grade}. Complete lessons in order to unlock advanced content.
          </p>
        </Card>
      )}
    </div>
  );
}
