

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROBLEMS } from '../constants';
import { getHintForProblem, explainCodeSolution } from '../services/geminiService';
import { SparklesIcon, LightBulbIcon, BookOpenIcon, PlayIcon, PaperAirplaneIcon, RefreshCwIcon } from '../components/Icons';
import Confetti from '../components/Confetti';


const difficultyClasses = {
    Easy: 'bg-green-900/50 text-green-300',
    Medium: 'bg-yellow-900/50 text-yellow-300',
    Hard: 'bg-red-900/50 text-red-300',
};

const SolveProblemPage: React.FC = () => {
    const { problemId } = useParams<{ problemId: string }>();
    const problem = useMemo(() => PROBLEMS.find(p => p.id.toString() === problemId), [problemId]);

    const [userCode, setUserCode] = useState('');
    const [consoleOutput, setConsoleOutput] = useState<string[]>(['Welcome! Click "Run Code" to test your solution.']);
    const [consoleType, setConsoleType] = useState<'info' | 'success' | 'error'>('info');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [solutionExplanation, setSolutionExplanation] = useState('');
    const [isExplaining, setIsExplaining] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    

    useEffect(() => {
        if (problem) {
            setUserCode(problem.templateCode);
        }
    }, [problem]);

    if (!problem) {
        return (
            <div className="text-center container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-2xl font-bold text-white">Problem not found</h2>
                <Link to="/problems" className="mt-4 inline-block text-sky-400 hover:text-sky-300">
                    &larr; Back to Problems
                </Link>
            </div>
        );
    }

    const handleRunCode = () => {
        setIsLoading(true);
        setConsoleType('info');
        setConsoleOutput(['Running your code...']);
        setTimeout(() => {
            // Mock execution
            setConsoleOutput([
                'Running test case 1...',
                'Input: ' + problem.examples[0].input,
                'Expected Output: ' + problem.examples[0].output,
                'Your Output: ' + problem.examples[0].output,
                'Result: Passed!',
            ]);
            setConsoleType('success');
            setIsLoading(false);
        }, 1500);
    };

    const handleSubmitCode = () => {
        setIsSubmitting(true);
        setConsoleType('info');
        setConsoleOutput(['Submitting your solution...']);
        setTimeout(() => {
            // Mock submission - simple keyword check
            const success = userCode.includes('return') || userCode.includes('printf');
            if (success) {
                setConsoleOutput(['Submission Accepted!', 'All test cases passed. Great job!']);
                setConsoleType('success');
                setShowSolution(true);
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            } else {
                setConsoleOutput(['Submission Failed: Wrong Answer', 'Failed on test case 2: Expected "5", got "0"']);
                setConsoleType('error');
            }
            setIsSubmitting(false);
        }, 2000);
    };

    const handleGetHint = async () => {
        setIsLoading(true);
        setConsoleType('info');
        setConsoleOutput(['Asking AI Tutor for a hint...']);
        try {
            const hint = await getHintForProblem(problem.title, problem.problemStatement, userCode);
            setConsoleOutput(['💡 AI Tutor Hint:', hint]);
        } catch (err) {
            setConsoleType('error');
            setConsoleOutput(['Error getting hint. Please try again.']);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleExplainSolution = async () => {
        setIsExplaining(true);
        setSolutionExplanation('Generating explanation...');
         try {
            const explanation = await explainCodeSolution(problem.title, problem.solution.code);
            setSolutionExplanation(explanation);
        } catch (err) {
            setSolutionExplanation('Error getting explanation. Please try again.');
        } finally {
            setIsExplaining(false);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
                {/* Left Panel: Problem Description */}
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 h-full max-h-[85vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-white">{problem.id}. {problem.title}</h1>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${difficultyClasses[problem.difficulty]}`}>
                            {problem.difficulty}
                        </span>
                    </div>
                    <div className="prose prose-invert prose-slate max-w-none text-slate-300">
                        <p>{problem.problemStatement}</p>
                        
                        {problem.examples.map((ex, i) => (
                            <div key={i}>
                                <h4 className="font-semibold text-slate-100">Example {i + 1}:</h4>
                                <pre className="bg-slate-900 p-4 rounded-md text-sm"><code><strong>Input:</strong> {ex.input}<br /><strong>Output:</strong> {ex.output}</code></pre>
                                {ex.explanation && <p><em>{ex.explanation}</em></p>}
                            </div>
                        ))}

                        <h4 className="font-semibold text-slate-100">Constraints:</h4>
                        <ul>
                            {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </div>
                </div>

                {/* Right Panel: Editor and Console */}
                <div className="flex flex-col gap-4">
                    <div className="bg-slate-800 rounded-lg border border-slate-700 flex flex-col h-full">
                        <textarea
                            value={userCode}
                            onChange={e => setUserCode(e.target.value)}
                            className="flex-grow bg-slate-900 text-slate-200 p-4 rounded-t-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                            spellCheck="false"
                        />
                        <div className="p-2 border-t border-slate-700 bg-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <button onClick={handleGetHint} disabled={isLoading || isSubmitting} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-yellow-300 bg-yellow-900/50 rounded-md hover:bg-yellow-800/50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <LightBulbIcon className="w-4 h-4"/> Get a Hint
                                </button>
                                {showSolution && (
                                    <button onClick={() => setShowSolution(!showSolution)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-sky-300 bg-sky-900/50 rounded-md hover:bg-sky-800/50">
                                        <BookOpenIcon className="w-4 h-4" /> Solution
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={handleRunCode} disabled={isLoading || isSubmitting} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded-md hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <PlayIcon className="w-4 h-4"/> Run
                                </button>
                                <button onClick={handleSubmitCode} disabled={isLoading || isSubmitting} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <PaperAirplaneIcon className="w-4 h-4"/> Submit
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 min-h-[150px] max-h-64 overflow-y-auto">
                        <h3 className="text-lg font-semibold text-white mb-2">Console</h3>
                        <div className={`font-mono text-sm whitespace-pre-wrap ${
                            consoleType === 'success' ? 'text-green-400' :
                            consoleType === 'error' ? 'text-red-400' : 'text-slate-300'
                        }`}>
                            {consoleOutput.join('\n')}
                        </div>
                    </div>

                    {showSolution && (
                        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
                            <h3 className="text-lg font-semibold text-white mb-2">Optimal Solution</h3>
                            <pre className="bg-slate-900 p-4 rounded-md text-sm text-slate-200 overflow-x-auto"><code>{problem.solution.code}</code></pre>
                            <button onClick={handleExplainSolution} disabled={isExplaining} className="mt-3 flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-sky-300 bg-sky-900/50 rounded-md hover:bg-sky-800/50 disabled:opacity-50 disabled:cursor-not-allowed">
                                <SparklesIcon className="w-4 h-4" /> {isExplaining ? 'Explaining...' : 'Explain this Solution'}
                            </button>
                            {solutionExplanation && (
                                <div className="mt-4 pt-4 border-t border-slate-700">
                                    <h4 className="font-bold text-slate-100 mb-2">AI Explanation:</h4>
                                    <div className="text-slate-300 text-sm bg-slate-700/50 p-4 rounded-md whitespace-pre-wrap max-h-60 overflow-y-auto">
                                        {isExplaining ? <span className="animate-pulse">Generating explanation...</span> : solutionExplanation}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SolveProblemPage;