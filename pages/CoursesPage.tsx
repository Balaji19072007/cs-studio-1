
import React from 'react';
import { Link } from 'react-router-dom';
import { COURSES } from '../constants';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../hooks/useAuth';
import { BookOpenIcon, CodeIcon, GlobeIcon, DatabaseIcon, CpuIcon, SmartphoneIcon, ActivityIcon, ShieldIcon, CloudIcon, ArrowRightIcon } from '../components/Icons';

const categoryIcons: { [key: string]: React.ReactNode } = {
    Programming: <CodeIcon className="w-6 h-6" />,
    'Web Dev': <GlobeIcon className="w-6 h-6" />,
    'Data Science': <DatabaseIcon className="w-6 h-6" />,
    Algorithms: <CpuIcon className="w-6 h-6" />,
    Mobile: <SmartphoneIcon className="w-6 h-6" />,
    'AI/ML': <ActivityIcon className="w-6 h-6" />,
    Security: <ShieldIcon className="w-6 h-6" />,
    DevOps: <CloudIcon className="w-6 h-6" />,
};

const categories = [
    { name: 'Programming', courses: 8, href: '#programming', icon: <CodeIcon className="w-6 h-6" /> },
    { name: 'Web Dev', courses: 6, href: '#web', icon: <GlobeIcon className="w-6 h-6" /> },
    { name: 'Data Science', courses: 5, href: '#data', icon: <DatabaseIcon className="w-6 h-6" /> },
    { name: 'Algorithms', courses: 4, href: '#algorithms', icon: <CpuIcon className="w-6 h-6" /> },
    { name: 'Mobile', courses: 3, href: '#mobile', icon: <SmartphoneIcon className="w-6 h-6" /> },
    { name: 'AI/ML', courses: 5, href: '#ai', icon: <ActivityIcon className="w-6 h-6" /> },
    { name: 'Security', courses: 3, href: '#security', icon: <ShieldIcon className="w-6 h-6" /> },
    { name: 'DevOps', courses: 4, href: '#devops', icon: <CloudIcon className="w-6 h-6" /> },
];

const CategoryCard: React.FC<{ name: string; courses: number; href: string; icon: React.ReactNode; }> = ({ name, courses, href, icon }) => (
    <a href={href} className="category-card bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-sky-500/10 text-center border border-slate-700">
        <div className="mx-auto h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center text-sky-400 mb-4 shadow-md">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="mt-2 text-sm text-slate-400">{courses} courses</p>
    </a>
);

const CourseSection: React.FC<{ id: string; title: string; subtitle: string; courses: any[] }> = ({ id, title, subtitle, courses }) => {
    const { getCourseProgress } = useAuth();
    return (
        <section id={id} className="py-16">
            <div className="mb-12">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
                <p className="mt-4 text-xl text-slate-400">{subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} progress={getCourseProgress(course.id)} />
                ))}
            </div>
        </section>
    );
};

const CoursesPage: React.FC = () => {
    // This is a simplified grouping. In a real app, this would be more dynamic.
    const programmingCourses = COURSES.filter(c => c.tags.includes('JavaScript') || c.tags.includes('Programming'));
    const webDevCourses = COURSES.filter(c => c.tags.includes('Frontend') || c.tags.includes('Web Dev'));
    const dataScienceCourses = COURSES.filter(c => c.tags.includes('AI') || c.tags.includes('Algorithms'));

    return (
        <div className="space-y-12">
            <section className="text-center relative">
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translatey-1/2 hero-floating-courses hidden lg:block">
                    <BookOpenIcon className="w-40 h-40 text-sky-500 opacity-10" />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white">
                    Explore Our <span className="text-sky-400">Course Catalog</span>
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-300">
                    Master computer science with our comprehensive curriculum covering all key areas from fundamental coding to advanced AI.
                </p>
                 <div className="mt-10 flex justify-center">
                    <a href="#categories" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-200 transition-transform transform hover:scale-105">
                        Start Learning Now
                        <ArrowRightIcon className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </section>

            <section id="categories" className="py-16">
                 <div className="text-center mb-12">
                    <h2 className="text-base text-sky-400 font-semibold tracking-wide uppercase">Course Catalog</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Browse All Learning Tracks
                    </p>
                </div>
                 <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {categories.map(cat => <CategoryCard key={cat.name} {...cat} />)}
                </div>
            </section>

            <CourseSection id="programming" title="Programming Fundamentals" subtitle="Learn the core concepts of programming with popular languages" courses={programmingCourses} />
            <CourseSection id="web" title="Web Development" subtitle="Build modern, responsive web applications" courses={webDevCourses} />
            <CourseSection id="data" title="Data Science & AI" subtitle="Extract insights from data and build intelligent systems" courses={dataScienceCourses} />
        </div>
    );
};

export default CoursesPage;
