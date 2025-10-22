import React, { useState, useMemo } from 'react';
import { PROBLEMS } from '../constants';
import ProblemCard from '../components/ProblemCard';
import { CodeIcon } from '../components/Icons';

const ProblemsPage: React.FC = () => {
    const [difficulty, setDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProblems = useMemo(() => {
        return PROBLEMS.filter(p => {
            const difficultyMatch = difficulty === 'All' || p.difficulty === difficulty;
            const searchMatch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
            return difficultyMatch && searchMatch;
        });
    }, [difficulty, searchTerm]);

    const FilterButton: React.FC<{level: 'All' | 'Easy' | 'Medium' | 'Hard'}> = ({ level }) => {
        const isActive = difficulty === level;
        return (
            <button
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
            >
                {level}
            </button>
        );
    };

    return (
        <div className="space-y-12">
            <div className="text-center">
                <CodeIcon className="w-12 h-12 mx-auto mb-4 text-sky-400" />
                <h1 className="text-4xl font-extrabold text-white">Coding Problems</h1>
                <p className="mt-2 text-lg text-slate-300">Sharpen your skills with our collection of coding challenges.</p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex-shrink-0 flex items-center space-x-2">
                        <FilterButton level="All" />
                        <FilterButton level="Easy" />
                        <FilterButton level="Medium" />
                        <FilterButton level="Hard" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search problems by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                </div>
                
                <div className="mt-8 space-y-4">
                    {filteredProblems.length > 0 ? (
                        filteredProblems.map(problem => (
                            <ProblemCard key={problem.id} problem={problem} />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold text-slate-300">No Problems Found</h3>
                            <p className="text-slate-500 mt-2">Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProblemsPage;
