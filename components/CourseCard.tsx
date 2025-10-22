
import React from 'react';
import { Link } from 'react-router-dom';
import type { Course } from '../types';
import TopicPill from './TopicPill';
import { UserIcon, ClockIcon, CheckCircleIcon } from './Icons';

interface CourseCardProps {
  course: Course;
  progress: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, progress }) => {
  const totalDuration = course.lessons.reduce((sum, lesson) => sum + lesson.duration, 0);
  const isCompleted = progress === 100;
  const isInProgress = progress > 0 && progress < 100;

  return (
    <Link to={`/course/${course.id}`} className="block group">
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/10">
        <div className="relative">
          <img className="h-48 w-full object-cover" src={course.image} alt={course.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
           {isCompleted && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm border border-green-500/50">
              <CheckCircleIcon className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.map((tag) => (
              <TopicPill key={tag} tag={tag} />
            ))}
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-2 group-hover:text-sky-400 transition-colors duration-200">
            {course.title}
          </h3>
          <p className="text-slate-400 text-sm flex-grow">{course.description}</p>
          
          {isInProgress && (
            <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-xs font-bold text-sky-400">In Progress</span>
                   <span className="text-xs font-bold text-slate-300">{progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                   <div className="bg-sky-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center text-slate-400 text-sm">
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center space-x-2">
               <ClockIcon className="h-4 w-4" />
               <span>{totalDuration} min</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
