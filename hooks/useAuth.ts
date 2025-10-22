import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { User, NotificationPreferences } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (name: string, email: string, token: string, photoUrl?: string) => void;
  logout: () => void;
  updateProfile: (name: string, bio: string, photoUrl?: string) => void;
  updateNotificationPreferences: (prefs: NotificationPreferences) => void;
  completeCourse: (courseId: string) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  getCourseProgress: (courseId: string) => number;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context as AuthContextType;
};
