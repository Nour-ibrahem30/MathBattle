export type UserRole = 'student' | 'teacher' | 'admin' | 'operator';

export type Rank =
  | 'novice'
  | 'apprentice'
  | 'scholar'
  | 'expert'
  | 'master'
  | 'champion'
  | 'legend';

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';
export type QuestionStatus = 'draft' | 'pending_review' | 'published' | 'archived';
export type BloomLevel =
  | 'remember'
  | 'understand'
  | 'apply'
  | 'analyze'
  | 'evaluate'
  | 'create';

export type LessonType = 'lesson' | 'practice' | 'challenge' | 'final_assessment';
export type MatchStatus = 'pending' | 'active' | 'completed' | 'forfeited' | 'cancelled';
export type CardColor = 'green' | 'blue' | 'purple' | 'orange' | 'red';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  schoolId: string;
  status: 'active' | 'suspended' | 'pending_parental_consent';
  forcePasswordChange?: boolean;
  avatarUrl?: string;
}

export interface StudentProfile {
  userId: string;
  grade: number;
  totalXp: number;
  rank: Rank;
  streakCount: number;
  streakLastActivityDate?: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
}

export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  questionText: string;
  questionType: QuestionType;
  options?: QuestionOption[];
  correctAnswer?: string;
  grade: number;
  subject: string;
  topic: string;
  unit: string;
  difficulty: number;
  bloomLevel: BloomLevel;
  hints: string[];
  solutionExplanation: string;
  tags: string[];
  status: QuestionStatus;
  aiGenerated: boolean;
  createdBy: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  type: LessonType;
  orderIndex: number;
  questionCount: number;
  prerequisiteLessonId?: string;
  description?: string;
}

export interface Unit {
  id: string;
  pathId: string;
  title: string;
  orderIndex: number;
  lessons: Lesson[];
}

export interface LearningPath {
  id: string;
  grade: number;
  subject: string;
  title: string;
  description: string;
  units: Unit[];
}

export interface LessonAttempt {
  id: string;
  studentUserId: string;
  lessonId: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  scorePercentage?: number;
  xpEarned?: number;
  answers: Array<{
    questionId: string;
    answer: string;
    correct: boolean;
    timeTakenSeconds: number;
  }>;
  startedAt: string;
  completedAt?: string;
}

export interface Achievement {
  id: string;
  code: string;
  name: string;
  description: string;
  xpReward: number;
  icon: string;
}

export interface StudentAchievement {
  studentUserId: string;
  achievementId: string;
  earnedAt: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  targetType: string;
  targetCount: number;
  activeFrom: string;
  activeUntil: string;
}

export interface StudentMission {
  studentUserId: string;
  missionId: string;
  progress: number;
  status: 'active' | 'completed' | 'expired';
}

export interface MatchCard {
  id: string;
  questionId: string;
  cardColor: CardColor;
  cardPoints: number;
  orderIndex: number;
  player1Answer?: string;
  player1Correct?: boolean;
  player2Answer?: string;
  player2Correct?: boolean;
}

export interface Match {
  id: string;
  player1UserId: string;
  player2UserId: string;
  player1Name: string;
  player2Name: string;
  grade: number;
  status: MatchStatus;
  player1Score?: number;
  player2Score?: number;
  winnerUserId?: string;
  cards: MatchCard[];
  startedAt?: string;
  completedAt?: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: number;
  teacherUserId: string;
  studentIds: string[];
}

export interface Assignment {
  id: string;
  classId: string;
  title: string;
  description: string;
  dueDate?: string;
  status: 'draft' | 'published' | 'closed';
  questionIds: string[];
  publishedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  readAt?: string;
  createdAt: string;
}

export interface AiRecommendation {
  id: string;
  studentUserId: string;
  title: string;
  reason: string;
  lessonId?: string;
  topic: string;
  priority: 'high' | 'medium' | 'low';
}

export interface LeaderboardEntry {
  userId: string;
  fullName: string;
  totalXp: number;
  rank: Rank;
  grade: number;
  trend: 'up' | 'down' | 'same';
}

export const RANK_THRESHOLDS: Record<Rank, number> = {
  novice: 0,
  apprentice: 500,
  scholar: 1500,
  expert: 3500,
  master: 6000,
  champion: 9000,
  legend: 12000,
};

export const CARD_CONFIG: Record<CardColor, number> = {
  green: 1,
  blue: 2,
  purple: 3,
  orange: 4,
  red: 5,
};

export function getRankFromXp(xp: number): Rank {
  const entries = Object.entries(RANK_THRESHOLDS) as [Rank, number][];
  let current: Rank = 'novice';
  for (const [rank, threshold] of entries) {
    if (xp >= threshold) current = rank;
  }
  return current;
}

export function getNextRankXp(xp: number): number {
  const ranks = Object.values(RANK_THRESHOLDS).sort((a, b) => a - b);
  return ranks.find((t) => t > xp) ?? ranks[ranks.length - 1]!;
}
