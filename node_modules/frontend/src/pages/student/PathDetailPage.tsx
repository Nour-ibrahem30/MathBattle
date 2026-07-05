import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, PlayCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/stores/appStore';
import { formatPercent } from '@/lib/utils';

export default function PathDetailPage() {
  const { id } = useParams<{ id: string }>();
  const data = useAppStore((s) => s.data);
  const getLessonProgress = useAppStore((s) => s.getLessonProgress);
  const isLessonLocked = useAppStore((s) => s.isLessonLocked);

  const path = data.learningPath.id === id ? data.learningPath : null;

  if (!path) {
    return (
      <EmptyState
        title="Path not found"
        description="This learning path does not exist or has been removed."
        actionLabel="Back to paths"
        onAction={() => window.history.back()}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/learn" className="mb-4 inline-flex items-center gap-2 text-label-md text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> All paths
        </Link>
        <h1 className="text-headline-lg font-bold text-on-surface">{path.title}</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">{path.description}</p>
        <Badge variant="outline" className="mt-3 normal-case">Grade {path.grade} · {path.subject}</Badge>
      </div>

      <div className="space-y-8">
        {path.units.map((unit) => {
          const unitLessons = unit.lessons;
          const unitCompleted = unitLessons.filter((l) => getLessonProgress(l.id) >= 60).length;

          return (
            <section key={unit.id}>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-headline-md font-semibold">Unit {unit.orderIndex}: {unit.title}</h2>
                  <p className="text-label-md text-on-surface-variant">
                    {unitCompleted} of {unitLessons.length} lessons complete
                  </p>
                </div>
                <ProgressBar
                  className="sm:w-48"
                  value={unitCompleted}
                  max={unitLessons.length}
                  variant="secondary"
                />
              </div>

              <div className="grid gap-3">
                {unitLessons.map((lesson) => {
                  const locked = isLessonLocked(lesson);
                  const progress = getLessonProgress(lesson.id);
                  const completed = progress >= 60;

                  return (
                    <Card
                      key={lesson.id}
                      className={`!p-4 ${locked ? 'opacity-60' : ''}`}
                      hover={!locked}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
                          {locked ? (
                            <Lock className="h-5 w-5 text-on-surface-variant" />
                          ) : completed ? (
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          ) : (
                            <PlayCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-on-surface">{lesson.title}</h3>
                            <Badge variant="outline" className="normal-case">{lesson.type.replace('_', ' ')}</Badge>
                          </div>
                          {lesson.description && (
                            <p className="mt-0.5 text-label-md text-on-surface-variant">{lesson.description}</p>
                          )}
                          {completed && (
                            <p className="mt-1 text-label-sm text-success">Best score: {formatPercent(progress)}</p>
                          )}
                          {locked && (
                            <p className="mt-1 text-label-sm text-on-surface-variant">Complete the previous lesson with 60%+ to unlock</p>
                          )}
                        </div>
                        {!locked && (
                          <Link
                            to={`/learn/lessons/${lesson.id}`}
                            className="shrink-0 rounded-lg bg-primary-container px-4 py-2 text-label-md font-semibold text-white hover:bg-primary"
                          >
                            {completed ? 'Retry' : 'Start'}
                          </Link>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
