

import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { COURSES } from '../constants';
import BadgeCard from '../components/BadgeCard';
import { AwardIcon } from '../components/Icons';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const completedCoursesDetails = user.completedCourses
    ? COURSES.filter(course => user.completedCourses!.includes(course.id))
    : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
            <header className="flex flex-col sm:flex-row items-center gap-6 bg-slate-800/50 p-8 rounded-lg border border-slate-700">
                <div className="flex-shrink-0 flex items-center justify-center h-24 w-24 rounded-full bg-slate-700 text-sky-300 font-bold text-4xl">
                {user.photoUrl ? <img src={user.photoUrl} alt="You" className="h-24 w-24 rounded-full object-cover" /> : user.initials}
                </div>
                <div>
                <h1 className="text-3xl font-extrabold text-white">{user.name}</h1>
                <p className="text-slate-400">{user.email}</p>
                {user.bio && <p className="text-slate-300 mt-2 italic">{user.bio}</p>}
                </div>
            </header>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6">My Badges</h2>
                {completedCoursesDetails.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {completedCoursesDetails.map(course => (
                    <BadgeCard key={course.id} course={course} />
                    ))}
                </div>
                ) : (
                <div className="text-center py-16 bg-slate-800/50 rounded-lg border border-slate-700 border-dashed">
                    <AwardIcon className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                    <h3 className="text-xl font-semibold text-slate-300">No Badges Yet</h3>
                    <p className="text-slate-500 mt-2">
                    Complete a course to start earning your badges!
                    </p>
                    <Link to="/roadmaps" className="mt-6 inline-block bg-sky-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-700 transition-colors">
                    Explore Courses
                    </Link>
                </div>
                )}
            </section>
        </div>
    </div>
  );
};

export default ProfilePage;