
import React from 'react';
import { Link } from 'react-router-dom';
import type { Course } from '../types';
import { AwardIcon } from './Icons';

interface BadgeCardProps {
  course: Course;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ course }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg text-center border border-slate-700 shadow-lg relative overflow-hidden transition-all duration-300 hover:border-yellow-400/50 hover:-translate-y-1 hover:shadow-yellow-500/10">
      <div className="absolute -top-12 -right-12 text-yellow-400/10">
        <AwardIcon className="w-32 h-32" />
      </div>
      <img
        src={course.image}
        alt={course.title}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-700 object-cover"
      />
      <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
      <p className="text-sm text-yellow-400 font-semibold mb-4">Badge Unlocked</p>
      <Link to={`/course/${course.id}`} className="text-sm text-sky-400 hover:underline">
        View Course
      </Link>
    </div>
  );
};

export default BadgeCard;
