
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSES } from '../constants';
import CourseCard from '../components/CourseCard';
import { SparklesIcon, BookOpenIcon, AwardIcon, StarIcon, ChevronRightIcon, UsersIcon, ClockIcon, PlayIcon, CodeIcon, DatabaseIcon, GlobeIcon, TrendingUpIcon, Edit3Icon, ArrowUpIcon, ArrowRightIcon } from '../components/Icons';
import { useAuth } from '../hooks/useAuth';

declare const VANTA: any;

const Feature: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 transition-all duration-300 hover:border-sky-500/50 hover:-translate-y-1">
    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-sky-400 mb-4 shadow-md">
      {icon}
    </div>
    <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-slate-400">{children}</p>
  </div>
);

const Testimonial: React.FC<{ name: string; role: string; children: React.ReactNode }> = ({ name, role, children }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 h-full flex flex-col transition-all duration-300 hover:border-sky-500/50 hover:-translate-y-1">
        <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-xl">
                    {name.split(' ').map(n => n[0]).join('')}
                </div>
            </div>
            <div className="ml-4">
                <h4 className="text-lg font-semibold text-white">{name}</h4>
                <p className="text-sm text-sky-400">{role}</p>
            </div>
        </div>
        <div className="flex mb-2">
            <StarIcon className="w-5 h-5 text-yellow-400" /><StarIcon className="w-5 h-5 text-yellow-400" /><StarIcon className="w-5 h-5 text-yellow-400" /><StarIcon className="w-5 h-5 text-yellow-400" /><StarIcon className="w-5 h-5 text-yellow-400" />
        </div>
        <p className="text-slate-300 italic">"{children}"</p>
    </div>
);


const HomePage: React.FC = () => {
  const { getCourseProgress } = useAuth();
  const featuredCourses = COURSES.slice(0, 3);
  const vantaRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let vantaEffect: any;
    if (typeof VANTA !== 'undefined' && vantaRef.current) {
      vantaEffect = VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyrocontrols: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x0ea5e9,
        backgroundColor: 0x0f172a,
        points: 12.00,
        maxDistance: 25.00,
        spacing: 18.00
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowBackToTop(true);
        } else {
            setShowBackToTop(false);
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="space-y-24">
      {/* Hero Section */}
       <section ref={vantaRef} className="relative overflow-hidden -mx-4 -mt-8 sm:-mx-6 lg:-mx-8">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                        <span className="block">Master Coding with</span>
                        <span className="block text-sky-400 typewriter">Interactive Learning</span>
                    </h1>
                    <p className="mt-3 text-base text-slate-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                        Learn programming concepts through bite-sized, interactive lessons with animations and real-world problem solving. Our AI-powered platform adapts to your learning style.
                    </p>
                    <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/roadmaps" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 shadow-lg md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105">
                                Start Learning Free
                            </Link>
                            <Link to="/problems" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-slate-800 bg-white hover:bg-slate-200 shadow-lg md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105">
                                Try Problems
                            </Link>
                        </div>
                        <p className="mt-3 text-sm text-slate-300">
                            Join <span className="text-sky-400 font-semibold">15,000+</span> developers already learning
                        </p>
                    </div>
                </div>
                <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-5 lg:flex lg:items-center">
                    <div className="relative mx-auto w-full rounded-2xl shadow-2xl overflow-hidden animate-float">
                        <div className="bg-slate-800/80 backdrop-blur-sm p-6 border border-slate-700">
                             <div className="h-64 bg-slate-700/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-sky-400"></div>
                                <div className="text-center p-4 z-10">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sky-500 to-sky-400 flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-slow">
                                        <PlayIcon className="w-8 h-8 text-white ml-1" />
                                    </div>
                                    <p className="text-white font-medium">Interactive Coding Animation</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-white">Binary Search Explained</h3>
                                <p className="mt-2 text-sm text-slate-300">Watch how the algorithm works step-by-step with visualizations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-slate-800 py-12 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-white">15K+</div>
                    <div className="text-sm text-slate-400 mt-1">Active Learners</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-white">500+</div>
                    <div className="text-sm text-slate-400 mt-1">Interactive Lessons</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-white">1.2K+</div>
                    <div className="text-sm text-slate-400 mt-1">Coding Problems</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-white">95%</div>
                    <div className="text-sm text-slate-400 mt-1">Satisfaction Rate</div>
                </div>
            </div>
        </div>
    </div>

      {/* Why Choose Us Section */}
      <section>
        <div className="text-center mb-12">
            <h2 className="text-base font-semibold tracking-wide uppercase text-sky-400">Why Choose CS Studio</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">A better way to learn coding</p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">Our platform combines cutting-edge technology with proven learning methodologies.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature icon={<BookOpenIcon className="w-6 h-6" />} title="Interactive Lessons">Learn through animated explanations and interactive coding exercises that make complex concepts easy to understand.</Feature>
            <Feature icon={<SparklesIcon className="w-6 h-6" />} title="AI-Powered Learning">Our system adapts to your progress, suggesting the right content at the right time to maximize learning efficiency.</Feature>
            <Feature icon={<AwardIcon className="w-6 h-6" />} title="Skills Validation">Solve real-world problems and earn badges that validate your skills to potential employers.</Feature>
            <Feature icon={<UsersIcon className="w-6 h-6" />} title="Community Support">Get help from our community of learners and mentors when you're stuck on a concept or problem.</Feature>
            <Feature icon={<TrendingUpIcon className="w-6 h-6" />} title="Progress Tracking">Visualize your learning journey with detailed analytics and personalized recommendations.</Feature>
            <Feature icon={<ClockIcon className="w-6 h-6" />} title="Flexible Schedule">Learn at your own pace with bite-sized lessons that fit into your busy schedule.</Feature>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section>
        <div className="text-center mb-12">
            <h2 className="text-base font-semibold tracking-wide uppercase text-sky-400">Learning Paths</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Start your coding journey</p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">Learn from basic to advanced concepts with our structured learning paths.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={getCourseProgress(course.id)}
            />
          ))}
        </div>
         <div className="mt-12 text-center">
            <Link to="/courses" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 transition-transform transform hover:scale-105">
                View All Courses
                <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section>
        <div className="text-center mb-12">
            <h2 className="text-base font-semibold tracking-wide uppercase text-sky-400">Testimonials</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">What our students say</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
            <Testimonial name="Michael Chen" role="Software Engineer">The interactive lessons made complex algorithms so much easier to understand. I went from zero to getting multiple job offers in just 6 months!</Testimonial>
             <Testimonial name="Sarah Johnson" role="Frontend Developer">I love the problem-solving approach. The animated explanations helped me visualize concepts I struggled with for years. Now I'm building my own apps!</Testimonial>
             <Testimonial name="David Wilson" role="Computer Science Student">The perfect supplement to my CS degree. The problems are challenging but the explanations are clear. My interview skills improved dramatically.</Testimonial>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to dive in?</span>
                        <span className="block text-sky-100">Start your coding journey today.</span>
                    </h2>
                </div>
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                    <div className="inline-flex rounded-md shadow">
                        <Link to="/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-sky-600 bg-white hover:bg-slate-100 transition-all duration-300 transform hover:scale-105">
                            Sign up for free
                            <ArrowRightIcon className="ml-3 -mr-1 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      {/* Floating Buttons */}
      <Link to="/problems" id="floating-action-button" className="h-14 w-14 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white flex items-center justify-center hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
        <Edit3Icon className="h-6 w-6 animated-icon" />
      </Link>
      <button id="back-to-top" onClick={scrollToTop} className={`h-12 w-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white flex items-center justify-center hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg ${showBackToTop ? 'show' : ''}`}>
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default HomePage;