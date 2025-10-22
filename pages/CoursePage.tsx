

import React, { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { COURSES } from '../constants';
import TopicPill from '../components/TopicPill';
import { getAITutorResponse } from '../services/geminiService';
import { ClockIcon, UserIcon, SparklesIcon, CheckCircleIcon, AwardIcon } from '../components/Icons';
import { useAuth } from '../hooks/useAuth';

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, completeCourse, toggleLessonComplete } = useAuth();
  const course = useMemo(() => COURSES.find(c => c.id === id), [id]);

  if (!course) {
    return <Navigate to="/" replace />;
  }

  const isCourseCompleted = user?.completedCourses?.includes(course.id);

  const handleAskTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);
    setAiResponse('');

    try {
      const response = await getAITutorResponse(course.title, question);
      setAiResponse(response);
    } catch (err) {
      setError('Sorry, the AI Tutor is having trouble right now. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            <header>
            <img src={course.image} alt={course.title} className="rounded-lg mb-6 w-full h-64 lg:h-80 object-cover" />
            <div className="flex flex-wrap gap-2 mb-4">
                {course.tags.map(tag => <TopicPill key={tag} tag={tag} />)}
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-2">{course.title}</h1>
            <p className="text-lg text-slate-300">{course.description}</p>
            <div className="flex items-center space-x-6 text-slate-400 mt-4">
                <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5" /> <span>{course.instructor}</span>
                </div>
            </div>
            </header>

            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4">About this course</h2>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed">{course.longDescription}</p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4">What you'll learn</h2>
                <ul className="space-y-3">
                    {course.whatYouWillLearn.map((point, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircleIcon className="h-6 w-6 text-sky-400 mr-3 flex-shrink-0 mt-1" />
                            <span className="text-slate-300">{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Sidebar with Lessons and AI Tutor */}
        <aside className="space-y-8">
            {/* Lessons List */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Course Lessons</h2>
            <ul className="space-y-3">
                {course.lessons.map(lesson => {
                const isLessonCompleted = !!user?.completedLessons?.[course.id]?.includes(lesson.id);
                return (
                    <li key={lesson.id}>
                        <button
                            onClick={() => user && toggleLessonComplete(course.id, lesson.id)}
                            disabled={!user}
                            className={`w-full flex items-center text-left p-3 rounded-md transition-colors ${
                                isLessonCompleted ? 'bg-slate-700' : 'bg-slate-700/50 hover:bg-slate-700'
                            } disabled:cursor-not-allowed`}
                            aria-pressed={isLessonCompleted}
                        >
                            {isLessonCompleted ? (
                                <CheckCircleIcon className="h-6 w-6 text-sky-400 mr-3 flex-shrink-0" />
                            ) : (
                                <div className="h-6 w-6 rounded-full border-2 border-slate-500 bg-slate-800 mr-3 flex-shrink-0"></div>
                            )}
                            <span className={`flex-grow ${isLessonCompleted ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                                {lesson.title}
                            </span>
                            <div className="flex items-center text-slate-400 text-sm space-x-1.5 ml-2">
                                <ClockIcon className="h-4 w-4" />
                                <span>{lesson.duration} min</span>
                            </div>
                        </button>
                    </li>
                );
                })}
            </ul>
            {user && (
                <div className="mt-6 pt-4 border-t border-slate-700">
                    <button
                    onClick={() => !isCourseCompleted && completeCourse(course.id)}
                    disabled={isCourseCompleted}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-md transition-colors disabled:cursor-not-allowed bg-sky-600 hover:bg-sky-700 disabled:bg-green-700 disabled:text-green-100"
                    >
                    {isCourseCompleted ? (
                        <>
                        <CheckCircleIcon className="w-5 h-5" /> Course Completed
                        </>
                    ) : (
                        <>
                        <AwardIcon className="w-5 h-5" /> Mark as Complete
                        </>
                    )}
                    </button>
                </div>
                )}
            </div>

            {/* AI Tutor */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg border-2 border-sky-500/30 sticky top-24">
            <div className="flex items-center space-x-3 mb-4">
                <SparklesIcon className="h-8 w-8 text-sky-400" />
                <h2 className="text-2xl font-bold text-white">AI Tutor</h2>
            </div>
            <form onSubmit={handleAskTutor}>
                <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Ask a question about ${course.title}...`}
                className="w-full h-28 p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none transition-shadow"
                disabled={isLoading}
                />
                <button
                type="submit"
                className="w-full mt-3 bg-sky-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isLoading}
                >
                {isLoading ? (
                    <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Thinking...
                    </>
                ) : 'Ask Tutor'}
                </button>
            </form>

            {error && <p className="mt-4 text-sm text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
            
            {(isLoading || aiResponse) && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                <h3 className="font-bold text-slate-100 mb-2">Tutor's Response:</h3>
                <div className="text-slate-300 text-sm bg-slate-700/50 p-4 rounded-md whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {isLoading ? <span className="animate-pulse">Generating answer...</span> : aiResponse}
                </div>
                </div>
            )}
            </div>
        </aside>
        </div>
    </div>
  );
};

export default CoursePage;