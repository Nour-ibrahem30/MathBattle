import type {
  Achievement,
  Assignment,
  ClassRoom,
  LearningPath,
  Match,
  Mission,
  Notification,
  Question,
  School,
  StudentAchievement,
  StudentMission,
  StudentProfile,
  User,
  AiRecommendation,
  LeaderboardEntry,
  LessonAttempt,
} from '@/types';

export const DEMO_SCHOOL: School = {
  id: 'school-demo-001',
  name: 'Demo Elementary School',
  code: 'DEMO01',
};

export const DEMO_USERS: User[] = [
  {
    id: 'user-admin-001',
    email: 'admin@demo.mathbattle.io',
    fullName: 'Alex Chen',
    role: 'admin',
    schoolId: DEMO_SCHOOL.id,
    status: 'active',
  },
  {
    id: 'user-teacher-001',
    email: 'teacher@demo.mathbattle.io',
    fullName: 'Ms. Rivera',
    role: 'teacher',
    schoolId: DEMO_SCHOOL.id,
    status: 'active',
  },
  {
    id: 'user-student-001',
    email: 'student1@demo.mathbattle.io',
    fullName: 'Jordan Lee',
    role: 'student',
    schoolId: DEMO_SCHOOL.id,
    status: 'active',
  },
  {
    id: 'user-student-002',
    email: 'student2@demo.mathbattle.io',
    fullName: 'Sam Patel',
    role: 'student',
    schoolId: DEMO_SCHOOL.id,
    status: 'active',
  },
  {
    id: 'user-student-003',
    email: 'student3@demo.mathbattle.io',
    fullName: 'Alex Kim',
    role: 'student',
    schoolId: DEMO_SCHOOL.id,
    status: 'active',
  },
];

export const DEMO_PASSWORD = 'Demo1234!';

export const STUDENT_PROFILES: StudentProfile[] = [
  {
    userId: 'user-student-001',
    grade: 5,
    totalXp: 1240,
    rank: 'scholar',
    streakCount: 5,
    streakLastActivityDate: new Date().toISOString().split('T')[0],
  },
  {
    userId: 'user-student-002',
    grade: 5,
    totalXp: 980,
    rank: 'apprentice',
    streakCount: 2,
    streakLastActivityDate: new Date().toISOString().split('T')[0],
  },
  {
    userId: 'user-student-003',
    grade: 5,
    totalXp: 1560,
    rank: 'scholar',
    streakCount: 7,
    streakLastActivityDate: new Date().toISOString().split('T')[0],
  },
];

export const DEMO_QUESTIONS: Question[] = [
  {
    id: 'q-001',
    questionText: 'What is 3/4 + 1/4?',
    questionType: 'multiple_choice',
    options: [
      { text: '1', isCorrect: true },
      { text: '3/4', isCorrect: false },
      { text: '4/4', isCorrect: false },
      { text: '2/4', isCorrect: false },
    ],
    grade: 5,
    subject: 'Mathematics',
    topic: 'Fractions',
    unit: 'Adding Fractions',
    difficulty: 2,
    bloomLevel: 'apply',
    hints: ['Add the numerators when denominators match.', '3 + 1 = ?'],
    solutionExplanation: 'When denominators are the same, add numerators: 3/4 + 1/4 = 4/4 = 1.',
    tags: ['fractions', 'addition'],
    status: 'published',
    aiGenerated: false,
    createdBy: 'user-teacher-001',
  },
  {
    id: 'q-002',
    questionText: 'Which fraction is equivalent to 1/2?',
    questionType: 'multiple_choice',
    options: [
      { text: '2/4', isCorrect: true },
      { text: '1/4', isCorrect: false },
      { text: '3/5', isCorrect: false },
      { text: '2/3', isCorrect: false },
    ],
    grade: 5,
    subject: 'Mathematics',
    topic: 'Fractions',
    unit: 'Equivalent Fractions',
    difficulty: 2,
    bloomLevel: 'understand',
    hints: ['Multiply or divide numerator and denominator by the same number.'],
    solutionExplanation: '2/4 simplifies to 1/2.',
    tags: ['fractions', 'equivalence'],
    status: 'published',
    aiGenerated: false,
    createdBy: 'user-teacher-001',
  },
  {
    id: 'q-003',
    questionText: 'True or False: 0.5 is equal to 50%.',
    questionType: 'true_false',
    correctAnswer: 'true',
    grade: 5,
    subject: 'Mathematics',
    topic: 'Decimals',
    unit: 'Percentages',
    difficulty: 1,
    bloomLevel: 'remember',
    hints: ['Percent means per hundred.'],
    solutionExplanation: '0.5 = 50/100 = 50%.',
    tags: ['decimals', 'percent'],
    status: 'published',
    aiGenerated: false,
    createdBy: 'user-teacher-001',
  },
  {
    id: 'q-004',
    questionText: 'Solve: 2x + 5 = 15',
    questionType: 'short_answer',
    correctAnswer: '5',
    grade: 7,
    subject: 'Mathematics',
    topic: 'Algebra',
    unit: 'Linear Equations',
    difficulty: 3,
    bloomLevel: 'apply',
    hints: ['Subtract 5 from both sides.', 'Divide by 2.'],
    solutionExplanation: '2x = 10, x = 5.',
    tags: ['algebra', 'equations'],
    status: 'published',
    aiGenerated: true,
    createdBy: 'user-teacher-001',
  },
  {
    id: 'q-005',
    questionText: 'What is 12 × 8?',
    questionType: 'multiple_choice',
    options: [
      { text: '96', isCorrect: true },
      { text: '86', isCorrect: false },
      { text: '104', isCorrect: false },
      { text: '88', isCorrect: false },
    ],
    grade: 5,
    subject: 'Mathematics',
    topic: 'Multiplication',
    unit: 'Multi-digit Multiplication',
    difficulty: 2,
    bloomLevel: 'apply',
    hints: ['Break 12 into 10 + 2.'],
    solutionExplanation: '12 × 8 = 96.',
    tags: ['multiplication'],
    status: 'draft',
    aiGenerated: true,
    createdBy: 'user-teacher-001',
  },
];

export const DEMO_PATH: LearningPath = {
  id: 'path-grade5-math',
  grade: 5,
  subject: 'Mathematics',
  title: 'Grade 5 Mathematics',
  description: 'Master fractions, decimals, and foundational algebra concepts.',
  units: [
    {
      id: 'unit-fractions',
      pathId: 'path-grade5-math',
      title: 'Fractions',
      orderIndex: 1,
      lessons: [
        {
          id: 'lesson-frac-intro',
          unitId: 'unit-fractions',
          title: 'Introduction to Fractions',
          type: 'lesson',
          orderIndex: 1,
          questionCount: 5,
          description: 'Learn what fractions represent and how to read them.',
        },
        {
          id: 'lesson-frac-add',
          unitId: 'unit-fractions',
          title: 'Adding Fractions',
          type: 'practice',
          orderIndex: 2,
          questionCount: 5,
          prerequisiteLessonId: 'lesson-frac-intro',
          description: 'Practice adding fractions with like denominators.',
        },
        {
          id: 'lesson-frac-challenge',
          unitId: 'unit-fractions',
          title: 'Fractions Challenge',
          type: 'challenge',
          orderIndex: 3,
          questionCount: 8,
          prerequisiteLessonId: 'lesson-frac-add',
          description: 'Test your fraction skills under time pressure.',
        },
      ],
    },
    {
      id: 'unit-decimals',
      pathId: 'path-grade5-math',
      title: 'Decimals & Percentages',
      orderIndex: 2,
      lessons: [
        {
          id: 'lesson-decimals',
          unitId: 'unit-decimals',
          title: 'Decimal Basics',
          type: 'lesson',
          orderIndex: 1,
          questionCount: 5,
          description: 'Understand place value in decimal numbers.',
        },
        {
          id: 'lesson-assessment',
          unitId: 'unit-decimals',
          title: 'Unit Final Assessment',
          type: 'final_assessment',
          orderIndex: 2,
          questionCount: 10,
          prerequisiteLessonId: 'lesson-decimals',
          description: 'Comprehensive assessment for this unit.',
        },
      ],
    },
  ],
};

export const DEMO_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-step',
    code: 'first_step',
    name: 'First Step',
    description: 'Complete your first lesson.',
    xpReward: 50,
    icon: '🏅',
  },
  {
    id: 'ach-perfect',
    code: 'perfect_score',
    name: 'Perfect Score',
    description: 'Score 100% on any lesson.',
    xpReward: 100,
    icon: '⭐',
  },
  {
    id: 'ach-streak-7',
    code: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak.',
    xpReward: 150,
    icon: '🔥',
  },
  {
    id: 'ach-match-win',
    code: 'first_match_win',
    name: 'Battle Ready',
    description: 'Win your first 1v1 match.',
    xpReward: 75,
    icon: '⚔️',
  },
];

export const DEMO_MISSIONS: Mission[] = [
  {
    id: 'mission-weekly-1',
    title: 'Complete 3 Lessons',
    description: 'Finish any three lessons this week.',
    xpReward: 120,
    targetType: 'lessons_completed',
    targetCount: 3,
    activeFrom: new Date().toISOString(),
    activeUntil: new Date(Date.now() + 7 * 86400000).toISOString(),
  },
  {
    id: 'mission-weekly-2',
    title: 'Win 2 Matches',
    description: 'Victory in two 1v1 battles.',
    xpReward: 100,
    targetType: 'matches_won',
    targetCount: 2,
    activeFrom: new Date().toISOString(),
    activeUntil: new Date(Date.now() + 7 * 86400000).toISOString(),
  },
];

export const DEMO_CLASSES: ClassRoom[] = [
  {
    id: 'class-5a',
    name: 'Grade 5A — Mathematics',
    grade: 5,
    teacherUserId: 'user-teacher-001',
    studentIds: ['user-student-001', 'user-student-002', 'user-student-003'],
  },
];

export const DEMO_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-001',
    classId: 'class-5a',
    title: 'Fractions Practice — Week 3',
    description: 'Review adding fractions before the unit test.',
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    status: 'published',
    questionIds: ['q-001', 'q-002'],
    publishedAt: new Date().toISOString(),
  },
];

export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    userId: 'user-student-001',
    type: 'assignment_published',
    title: 'New Assignment',
    body: 'Fractions Practice — Week 3 is due in 3 days.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif-002',
    userId: 'user-student-001',
    type: 'match_invitation',
    title: 'Match Challenge',
    body: 'Sam Patel challenged you to a 1v1 match!',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const DEMO_AI_RECOMMENDATIONS: AiRecommendation[] = [
  {
    id: 'rec-001',
    studentUserId: 'user-student-001',
    title: 'Adding Fractions',
    reason: 'You scored 60% on equivalent fractions — practice adding like denominators.',
    lessonId: 'lesson-frac-add',
    topic: 'Fractions',
    priority: 'high',
  },
];

export function buildLeaderboard(profiles: StudentProfile[], users: User[]): LeaderboardEntry[] {
  return profiles
    .map((p) => {
      const user = users.find((u) => u.id === p.userId)!;
      return {
        userId: p.userId,
        fullName: user.fullName,
        totalXp: p.totalXp,
        rank: p.rank,
        grade: p.grade,
        trend: 'same' as const,
      };
    })
    .sort((a, b) => b.totalXp - a.totalXp);
}

export interface AppSeedData {
  users: User[];
  school: School;
  studentProfiles: StudentProfile[];
  questions: Question[];
  learningPath: LearningPath;
  achievements: Achievement[];
  studentAchievements: StudentAchievement[];
  missions: Mission[];
  studentMissions: StudentMission[];
  classes: ClassRoom[];
  assignments: Assignment[];
  notifications: Notification[];
  matches: Match[];
  lessonAttempts: LessonAttempt[];
  aiRecommendations: AiRecommendation[];
  onboardingComplete: Record<string, boolean>;
}

export function createInitialData(): AppSeedData {
  return {
    users: DEMO_USERS,
    school: DEMO_SCHOOL,
    studentProfiles: STUDENT_PROFILES,
    questions: DEMO_QUESTIONS,
    learningPath: DEMO_PATH,
    achievements: DEMO_ACHIEVEMENTS,
    studentAchievements: [
      {
        studentUserId: 'user-student-001',
        achievementId: 'ach-first-step',
        earnedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ],
    missions: DEMO_MISSIONS,
    studentMissions: [
      { studentUserId: 'user-student-001', missionId: 'mission-weekly-1', progress: 2, status: 'active' },
      { studentUserId: 'user-student-001', missionId: 'mission-weekly-2', progress: 1, status: 'active' },
    ],
    classes: DEMO_CLASSES,
    assignments: DEMO_ASSIGNMENTS,
    notifications: DEMO_NOTIFICATIONS,
    matches: [],
    lessonAttempts: [],
    aiRecommendations: DEMO_AI_RECOMMENDATIONS,
    onboardingComplete: { 'user-student-001': true },
  };
}
