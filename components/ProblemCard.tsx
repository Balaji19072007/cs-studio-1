
import React from 'react';
import { Link } from 'react-router-dom';
import type { Problem } from '../types';

interface ProblemCardProps {
    problem: Problem;
}

const difficultyClasses = {
    Easy: 'bg-green-900/50 text-green-300',
    Medium: 'bg-yellow-900/50 text-yellow-300',
    Hard: 'bg-red-900/50 text-red-300',
};

const statusClasses = {
    solved: 'bg-green-900/50 text-green-300',
    attempted: 'bg-yellow-900/50 text-yellow-300',
    todo: 'bg-slate-700 text-slate-300',
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
    return (
        <Link 
            to={`/problems/${problem.id}`}
            className="block bg-slate-800 p-4 rounded-lg border border-slate-700 transition-all duration-300 hover:border-sky-500/50 hover:bg-slate-700/50 hover:-translate-y-1"
        >
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <div className="flex items-center gap-4">
                        <span className={`flex-shrink-0 inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${difficultyClasses[problem.difficulty]}`}>
                            {problem.difficulty}
                        </span>
                        <h3 className="text-lg font-medium text-slate-100">{problem.id}. {problem.title}</h3>
                    </div>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                        {problem.tags.map(tag => (
                            <span key={tag} className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {problem.status && (
                        <span className={`hidden sm:inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${statusClasses[problem.status]}`}>
                            {problem.status.charAt(0).toUpperCase() + problem.status.slice(1)}
                        </span>
                    )}
                    <div className="px-4 py-2 text-sm font-medium rounded-md bg-sky-600 text-white hover:bg-sky-700 transition-colors">
                        Solve
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProblemCard;
