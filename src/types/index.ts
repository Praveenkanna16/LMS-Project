export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Batch {
  id: string;
  name: string;
  subject: string;
  grade: string;
  teacherId: string;
  teacher: User;
  students: User[];
  maxStudents: number;
  schedule: Schedule[];
  isActive: boolean;
  createdAt: Date;
}

export interface Schedule {
  id: string;
  batchId: string;
  startTime: Date;
  endTime: Date;
  dayOfWeek: number;
  isActive: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  instructorId: string;
  instructor: User;
  category: string;
  subcategory: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  price: number;
  currency: string;
  thumbnailUrl: string;
  trailerUrl?: string;
  duration: number; // in minutes
  totalLessons: number;
  rating: number;
  reviewCount: number;
  studentsEnrolled: number;
  tags: string[];
  curriculum: CourseSection[];
  requirements: string[];
  whatYouWillLearn: string[];
  isPublished: boolean;
  isFree: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastUpdated: Date;
}

export interface CourseSection {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  description?: string;
  videoUrl: string;
  duration: number; // in seconds
  order: number;
  isPreview: boolean;
  resources?: LessonResource[];
}

export interface LessonResource {
  id: string;
  lessonId: string;
  title: string;
  type: 'pdf' | 'ppt' | 'doc' | 'link' | 'code';
  url: string;
  size?: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: Date;
  completedAt?: Date;
  progress: number; // percentage
  lastAccessedAt: Date;
  currentLessonId?: string;
  isCompleted: boolean;
  certificateUrl?: string;
}

export interface Review {
  id: string;
  courseId: string;
  studentId: string;
  student: User;
  rating: number;
  comment: string;
  createdAt: Date;
  isVerified: boolean;
}

export interface Quiz {
  id: string;
  courseId: string;
  lessonId?: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in minutes
  attemptsAllowed: number;
  isActive: boolean;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'coding' | 'essay';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startedAt: Date;
  completedAt?: Date;
  score: number;
  answers: QuizAnswer[];
  isPassed: boolean;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  points: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  estimatedDuration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  isActive: boolean;
}

export interface Achievement {
  id: string;
  userId: string;
  type: 'course_completed' | 'streak' | 'quiz_perfect' | 'mentor' | 'contributor';
  title: string;
  description: string;
  badgeUrl: string;
  earnedAt: Date;
  courseId?: string;
  metadata?: Record<string, any>;
}

export interface Discussion {
  id: string;
  courseId?: string;
  lessonId?: string;
  authorId: string;
  author: User;
  title?: string;
  content: string;
  type: 'question' | 'discussion' | 'announcement';
  isPinned: boolean;
  isResolved?: boolean;
  createdAt: Date;
  replies: DiscussionReply[];
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  authorId: string;
  author: User;
  content: string;
  isAnswer: boolean;
  createdAt: Date;
}
