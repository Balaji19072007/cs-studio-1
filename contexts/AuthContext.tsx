import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { User, NotificationPreferences } from '../types';
import { COURSES } from '../constants';

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

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultNotificationPrefs: NotificationPreferences = {
  newLessons: true,
  progressReport: true,
  communityActivity: false,
};

const getUserDataFromStorage = (email: string) => {
    const completedCourses = JSON.parse(localStorage.getItem(`cs-studio-completed-courses-${email}`) || '[]');
    const completedLessons = JSON.parse(localStorage.getItem(`cs-studio-completed-lessons-${email}`) || '{}');
    const photoUrl = localStorage.getItem(`cs-studio-user-photo-${email}`) || undefined;
    const bio = localStorage.getItem(`cs-studio-user-bio-${email}`) || undefined;
    const notificationPreferences = JSON.parse(localStorage.getItem(`cs-studio-notifications-${email}`) || JSON.stringify(defaultNotificationPrefs));
    return { completedCourses, completedLessons, photoUrl, bio, notificationPreferences };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('cs-studio-token');
      const storedName = localStorage.getItem('cs-studio-user-name');
      const storedEmail = localStorage.getItem('cs-studio-user-email');

      if (storedToken && storedName && storedEmail) {
        const initials = storedName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        const userData = getUserDataFromStorage(storedEmail);
        setUser({ name: storedName, email: storedEmail, initials, ...userData });
        setToken(storedToken);
      }
    } catch (error) {
        console.error("Failed to parse auth data from localStorage", error);
        localStorage.clear();
    } finally {
        setLoading(false);
    }
  }, []);

  const login = (name: string, email: string, token: string, photoUrl?: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const userData = getUserDataFromStorage(email);
    const userPhoto = photoUrl || userData.photoUrl;
    
    setUser({ name, email, initials, ...userData, photoUrl: userPhoto });
    setToken(token);
    localStorage.setItem('cs-studio-token', token);
    localStorage.setItem('cs-studio-user-name', name);
    localStorage.setItem('cs-studio-user-email', email);
    if(userPhoto) {
        localStorage.setItem(`cs-studio-user-photo-${email}`, userPhoto);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('cs-studio-token');
    localStorage.removeItem('cs-studio-user-name');
    localStorage.removeItem('cs-studio-user-email');
  };
  
  const updateProfile = (name: string, bio: string, photoUrl?: string) => {
    if (!user) return;
    const newPhoto = photoUrl !== undefined ? photoUrl : user.photoUrl;
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const updatedUser: User = { ...user, name, bio, photoUrl: newPhoto, initials };
    setUser(updatedUser);

    localStorage.setItem('cs-studio-user-name', name);
    localStorage.setItem(`cs-studio-user-bio-${user.email}`, bio);
    if (photoUrl !== undefined) {
        localStorage.setItem(`cs-studio-user-photo-${user.email}`, photoUrl);
    }
  };

  const updateNotificationPreferences = (prefs: NotificationPreferences) => {
    if (!user) return;
    const updatedUser = { ...user, notificationPreferences: prefs };
    setUser(updatedUser);
    localStorage.setItem(`cs-studio-notifications-${user.email}`, JSON.stringify(prefs));
  };

  const completeCourse = (courseId: string) => {
    if (!user || user.completedCourses?.includes(courseId)) {
        return;
    }
    const updatedCompletedCourses = [...(user.completedCourses || []), courseId];
    const updatedUser = { ...user, completedCourses: updatedCompletedCourses };
    setUser(updatedUser);
    localStorage.setItem(`cs-studio-completed-courses-${user.email}`, JSON.stringify(updatedCompletedCourses));
  };

  const toggleLessonComplete = (courseId: string, lessonId: string) => {
    if (!user) return;

    const completedLessonsForCourse = user.completedLessons?.[courseId] || [];
    const isCompleted = completedLessonsForCourse.includes(lessonId);

    const newCompletedLessonsForCourse = isCompleted
      ? completedLessonsForCourse.filter(id => id !== lessonId)
      : [...completedLessonsForCourse, lessonId];
    
    const updatedCompletedLessons = {
        ...(user.completedLessons || {}),
        [courseId]: newCompletedLessonsForCourse
    };

    const updatedUser = { ...user, completedLessons: updatedCompletedLessons };
    setUser(updatedUser);
    localStorage.setItem(`cs-studio-completed-lessons-${user.email}`, JSON.stringify(updatedCompletedLessons));
  };

  const getCourseProgress = (courseId: string): number => {
    const course = COURSES.find(c => c.id === courseId);
    if (!user || !course || !course.lessons.length) {
      return 0;
    }

    if (user.completedCourses?.includes(courseId)) {
      return 100;
    }

    const completedLessonsCount = user.completedLessons?.[courseId]?.length || 0;
    if (completedLessonsCount === 0) {
      return 0;
    }

    const progress = Math.round((completedLessonsCount / course.lessons.length) * 100);
    if (progress === 100 && completedLessonsCount < course.lessons.length) {
      return 99;
    }
    return progress;
  };

  const value = { user, token, loading, login, logout, updateProfile, updateNotificationPreferences, completeCourse, toggleLessonComplete, getCourseProgress };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
