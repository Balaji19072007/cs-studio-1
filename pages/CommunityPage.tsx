
import React from 'react';
import { Link } from 'react-router-dom';
import { UsersIcon, MessageSquareIcon, CalendarIcon, ArrowRightIcon, PlusIcon } from '../components/Icons';

const CommunityPage: React.FC = () => {
    return (
        <div className="space-y-12">
            <section className="text-center">
                <UsersIcon className="w-16 h-16 mx-auto mb-4 text-sky-400" />
                <h1 className="text-4xl md:text-6xl font-extrabold text-white">
                    CS Studio <span className="text-sky-400">Community</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                    Connect with fellow learners, share knowledge, and grow together. Get help, give help, and build your network.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#discussions" className="inline-block bg-sky-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-sky-700 transition-transform transform hover:scale-105">
                        Join Discussions
                    </a>
                    <a href="#events" className="inline-block bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-600 transition-transform transform hover:scale-105">
                        View Events
                    </a>
                </div>
            </section>

            <section className="bg-slate-800/50 py-12 rounded-lg border border-slate-700">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-100">15K+</div>
                            <div className="text-sm text-slate-400 mt-1">Community Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-100">5K+</div>
                            <div className="text-sm text-slate-400 mt-1">Discussions</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-100">200+</div>
                            <div className="text-sm text-slate-400 mt-1">Events Hosted</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-100">95%</div>
                            <div className="text-sm text-slate-400 mt-1">Questions Answered</div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="discussions">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Recent Discussions</h2>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 transition-colors">
                        <PlusIcon className="w-4 h-4" /> New Discussion
                    </button>
                </div>
                <div className="space-y-4">
                    {/* Discussion Items */}
                    <DiscussionItem 
                        title="Best resources for learning React hooks?"
                        author="Emily White"
                        replies={12}
                        lastReply="2 hours ago"
                        tags={['react', 'frontend', 'javascript']}
                    />
                     <DiscussionItem 
                        title="How to optimize recursive algorithms for dynamic programming?"
                        author="John Smith"
                        replies={8}
                        lastReply="5 hours ago"
                        tags={['algorithms', 'dp', 'optimization']}
                    />
                     <DiscussionItem 
                        title="Showcase: My new portfolio site built with Gemini API"
                        author="Alex Ray"
                        replies={25}
                        lastReply="1 day ago"
                        tags={['showcase', 'ai', 'gemini-api']}
                    />
                </div>
            </section>
            
            <section id="events">
                 <h2 className="text-3xl font-bold text-white mb-6">Upcoming Events</h2>
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <EventCard 
                        title="Weekly Coding Challenge"
                        date="Every Saturday, 4:00 PM UTC"
                        description="Test your skills against others in a timed coding competition. Prizes for top performers!"
                    />
                    <EventCard 
                        title="Tech Talk: Building with Gemini"
                        date="October 28th, 6:00 PM UTC"
                        description="Join guest speaker Alex Ray for a deep dive into integrating Google's Gemini API into real-world projects."
                    />
                    <EventCard 
                        title="Data Structures Study Group"
                        date="Bi-weekly on Tuesdays"
                        description="A collaborative session to work through complex data structure problems and prepare for interviews."
                    />
                 </div>
            </section>
        </div>
    );
};

interface DiscussionItemProps {
    title: string;
    author: string;
    replies: number;
    lastReply: string;
    tags: string[];
}

const DiscussionItem: React.FC<DiscussionItemProps> = ({ title, author, replies, lastReply, tags }) => (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 transition-all duration-300 hover:border-sky-500/50 hover:bg-slate-700/50 discussion-card">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-medium text-slate-100 hover:text-sky-400 cursor-pointer">{title}</h3>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                    {tags.map(tag => (
                        <span key={tag} className="text-xs text-sky-300 bg-sky-900/50 px-2 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
                <div className="font-semibold text-slate-200">{replies}</div>
                <div className="text-xs text-slate-400">replies</div>
            </div>
        </div>
        <div className="text-xs text-slate-400 mt-2">
            Posted by {author} &middot; Last reply {lastReply}
        </div>
    </div>
);


interface EventCardProps {
    title: string;
    date: string;
    description: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, description }) => (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-sm text-sky-400">{date}</p>
            </div>
        </div>
        <p className="text-slate-400 text-sm flex-grow mb-4">{description}</p>
        <button className="w-full text-center mt-auto px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded-md hover:bg-slate-500 transition-colors">
            Register
        </button>
    </div>
)

export default CommunityPage;
