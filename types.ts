
export interface NotificationPreferences {
  newLessons: boolean;
  progressReport: boolean;
  communityActivity: boolean;
}

export interface User {
  name: string;
  email: string;
  initials: string;
  photoUrl?: string;
  bio?: string;
  completedCourses?: string[];
  completedLessons?: { [courseId: string]: string[] };
  notificationPreferences?: NotificationPreferences;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  tags: string[];
  lessons: Lesson[];
  image: string;
  whatYouWillLearn: string[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  courseId?: string; // Link to a specific course
}

export interface LearningPathStage {
  title: string;
  steps: RoadmapStep[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  courseCount: number;
  courses: string[]; // array of course IDs for simple progress calc
  stages: LearningPathStage[];
}

export interface ProblemExample {
    input: string;
    output: string;
    explanation?: string;
}

export interface ProblemSolution {
    explanation: string;
    code: string;
}

export interface Problem {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    language: string;
    tags: string[];
    status?: 'solved' | 'attempted' | 'todo';
    problemStatement: string;
    examples: ProblemExample[];
    constraints: string[];
    solution: ProblemSolution;
    templateCode: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  username: string;
  initials: string;
  problemsSolved: number;
  accuracy: number;
  streak: number;
  points: number;
}