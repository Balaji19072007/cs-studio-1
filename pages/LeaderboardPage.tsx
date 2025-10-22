import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LEADERBOARD_USERS } from '../constants';
import { TrophyIcon, CodeIcon, FireIcon, AwardIcon } from '../components/Icons';
import { useAuth } from '../hooks/useAuth';
import type { LeaderboardUser } from '../types';

const PodiumCard: React.FC<{ user: LeaderboardUser, rank: 1 | 2 | 3 }> = ({ user, rank }) => {
    const rankClasses = {
        1: { border: 'border-yellow-400', bg: 'bg-slate-800', text: 'text-yellow-300', icon: 'text-yellow-400', size: 'scale-110 -translate-y-4' },
        2: { border: 'border-slate-400', bg: 'bg-slate-800', text: 'text-slate-300', icon: '', size: '' },
        3: { border: 'border-amber-600', bg: 'bg-slate-800', text: 'text-amber-400', icon: '', size: '' },
    };
    const orderClasses = { 1: 'order-1 md:order-2', 2: 'order-2 md:order-1', 3: 'order-3 md:order-3' };

    return (
        <div className={`podium flex flex-col items-center ${orderClasses[rank]}`}>
            <div className={`rank-badge rank-${rank} mb-2`}>{rank}</div>
            <div className={`bg-slate-800 rounded-lg shadow-lg p-6 w-full text-center user-card border ${rankClasses[rank].border} ${rankClasses[rank].size} transition-transform duration-300`}>
                <div className="flex justify-center mb-4">
                    <div className="h-20 w-20 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-2xl">
                        {user.initials}
                    </div>
                </div>
                <h3 className="font-bold text-slate-100 text-lg">{user.name}</h3>
                <p className="text-slate-400 text-sm">{user.username}</p>
                <div className="mt-4 flex justify-center items-center">
                    <span className="text-slate-200 font-bold text-2xl">{user.problemsSolved}</span>
                    <span className="text-slate-400 text-sm ml-1.5">solved</span>
                </div>
                <div className="mt-2 flex justify-center items-center text-sm text-slate-400">
                    <FireIcon className={`w-4 h-4 text-orange-500 mr-1 ${rank === 1 ? 'streak-fire' : ''}`} />
                    <span>{user.streak} day streak</span>
                </div>
                {rank === 1 && (
                     <div className="mt-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-400/20 text-yellow-300">
                            <AwardIcon className="w-4 h-4 mr-1" />
                            Top Coder
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};


const LeaderboardPage: React.FC = () => {
    const [timeframe, setTimeframe] = useState('all-time');
    const [category, setCategory] = useState('all');
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<LeaderboardUser[]>(LEADERBOARD_USERS);

    useEffect(() => {
        // Simulate fetching new data based on filters
        const shuffled = [...LEADERBOARD_USERS].sort(() => 0.5 - Math.random());
        const sliced = shuffled.slice(0, 30 + Math.floor(Math.random() * 20));
        const reranked = sliced.map((user, index) => ({
            ...user,
            rank: index + 1,
            points: user.points - Math.floor(Math.random() * (timeframe === 'all-time' ? 0 : 100)),
        })).sort((a,b) => b.points - a.points).map((user, index) => ({...user, rank: index + 1}));
        setUsers(reranked);
    }, [timeframe, category]);


    const topThree = users.slice(0, 3);
    const restOfUsers = users.slice(3);
    
    // Mock user data for the current user
    const currentUserRank: LeaderboardUser | null = currentUser ? {
        rank: 37,
        name: currentUser.name,
        username: `@${currentUser.name.split(' ')[0].toLowerCase()}`,
        initials: currentUser.initials,
        problemsSolved: 150,
        accuracy: 78,
        streak: 10,
        points: 600,
    } : null;

    return (
        <div className="space-y-12">
            <section className="text-center relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 floating-leaderboard hidden lg:block">
                    <TrophyIcon className="w-40 h-40 text-sky-500 opacity-10" />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                    Global <span className="text-sky-400">Leaderboard</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mt-4">
                    See how you stack up against other developers and <span className="text-sky-300 font-semibold">climb the ranks</span> by solving more coding problems!
                </p>
                <div className="mt-8 flex justify-center">
                    <Link to="/problems" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 transition-transform transform hover:scale-105">
                        <CodeIcon className="w-5 h-5 mr-2" />
                        Start Solving Today
                    </Link>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-slate-800 rounded-lg shadow-md p-6 mb-8 border border-slate-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-2xl font-bold text-slate-100">Global Rankings</h2>
                            <p className="text-slate-400 mt-1 text-sm">Updated daily at midnight UTC</p>
                        </div>
                        <div className="flex space-x-4">
                            <select value={timeframe} onChange={e => setTimeframe(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base bg-slate-700 border-slate-600 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md">
                                <option value="all-time">All Time</option>
                                <option value="monthly">This Month</option>
                                <option value="weekly">This Week</option>
                            </select>
                            <select value={category} onChange={e => setCategory(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base bg-slate-700 border-slate-600 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md">
                                <option value="all">All Categories</option>
                                <option value="algorithms">Algorithms</option>
                                <option value="data-structures">Data Structures</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {topThree.find(u => u.rank === 2) && <PodiumCard user={topThree.find(u => u.rank === 2)!} rank={2} />}
                    {topThree.find(u => u.rank === 1) && <PodiumCard user={topThree.find(u => u.rank === 1)!} rank={1} />}
                    {topThree.find(u => u.rank === 3) && <PodiumCard user={topThree.find(u => u.rank === 3)!} rank={3} />}
                </div>

                <div className="bg-slate-800 rounded-lg shadow-md overflow-hidden border border-slate-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-700">
                            <thead className="bg-slate-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Rank</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Problems Solved</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Accuracy</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Streak</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Points</th>
                                </tr>
                            </thead>
                            <tbody className="bg-slate-800 divide-y divide-slate-700">
                                {restOfUsers.map(user => (
                                    <tr key={user.rank} className="hover:bg-slate-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200">{user.rank}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold mr-3">{user.initials}</div>
                                                {user.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{user.problemsSolved}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{user.accuracy}%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 flex items-center">
                                            <FireIcon className="w-4 h-4 text-orange-500 mr-1" /> {user.streak} days
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200">{user.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {currentUserRank && (
                    <div className="mt-8 bg-slate-800/50 rounded-lg shadow-md p-6 border border-sky-500/30">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-lg font-semibold text-slate-100">Your Position</h3>
                                <div className="flex items-center mt-2">
                                    <span className="text-2xl font-bold text-sky-400 mr-2">{currentUserRank.rank}</span>
                                    <span className="text-slate-400">out of {users.length.toLocaleString()} users</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-slate-100">{currentUserRank.problemsSolved}</div>
                                    <div className="text-sm text-slate-400">Solved</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-slate-100">{currentUserRank.accuracy}%</div>
                                    <div className="text-sm text-slate-400">Accuracy</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-slate-100">{currentUserRank.streak}</div>
                                    <div className="text-sm text-slate-400">Day Streak</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-slate-100">{currentUserRank.points}</div>
                                    <div className="text-sm text-slate-400">Points</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default LeaderboardPage;