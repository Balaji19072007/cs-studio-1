import React from 'react';
import { Link } from 'react-router-dom';
import { LEARNING_PATHS, COURSES } from '../constants';
import { BookOpenIcon, CheckCircleIcon, TargetIcon, ClockIcon } from '../components/Icons';
import { useAuth } from '../hooks/useAuth';
import type { RoadmapStep } from '../types';

// Fix: Refactored component to use conditional rendering for Link/div to ensure type safety.
const RoadmapStepItem: React.FC<{ step: RoadmapStep; stepNumber: number; status: 'completed' | 'current' | 'locked' }> = ({ step, stepNumber, status }) => {
    const statusClasses = {
        completed: {
            iconBg: 'bg-green-500',
            icon: <CheckCircleIcon className="text-white w-5 h-5" />,
            text: 'text-slate-300',
        },
        current: {
            iconBg: 'bg-sky-500 ring-4 ring-sky-500/30',
            icon: <span className="text-white font-bold">{stepNumber}</span>,
            text: 'text-white',
        },
        locked: {
            iconBg: 'bg-slate-700',
            icon: <span className="text-slate-400 font-bold">{stepNumber}</span>,
            text: 'text-slate-400',
        }
    };
    
    const content = (
        <>
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${statusClasses[status].iconBg}`}>
                {statusClasses[status].icon}
            </div>
            <div className="ml-4">
                <h4 className={`font-medium ${statusClasses[status].text} group-hover:text-sky-400`}>{step.title}</h4>
                <p className="text-sm text-slate-400 mt-1">{step.description}</p>
                 {status === 'current' && step.courseId && (
                    <span className="mt-2 inline-block text-sm text-sky-400 hover:text-sky-300 font-medium">Continue →</span>
                )}
            </div>
        </>
    );

    return (
        <div className={`roadmap-step ${status}`}>
            {step.courseId ? (
                <Link to={`/course/${step.courseId}`} className="flex items-start group">
                    {content}
                </Link>
            ) : (
                <div className="flex items-start group">
                    {content}
                </div>
            )}
        </div>
    );
};

const LearningPathPage: React.FC = () => {
  const { getCourseProgress } = useAuth();

  return (
    <div className="space-y-12">
      <div className="text-center">
        <div className="hero-floating-roadmaps relative w-16 h-16 mx-auto mb-4">
            <TargetIcon className="w-16 h-16 text-sky-400"/>
        </div>
        <h1 className="text-4xl font-extrabold text-white">Learning Roadmaps</h1>
        <p className="mt-2 text-lg text-slate-300">Follow structured learning paths to master computer science concepts and land your dream job, step by step.</p>
      </div>
      
      <div className="space-y-16 max-w-6xl mx-auto">
        {LEARNING_PATHS.map(path => {
            let totalSteps = 0;
            const completedSteps = path.stages.flatMap(stage => stage.steps).filter(step => {
                if (!step.courseId) return false;
                return getCourseProgress(step.courseId) === 100;
            }).length;

            return (
              <div key={path.id} id={path.id} className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 shadow-lg">
                <header className="mb-8">
                    <h2 className="text-3xl font-bold text-sky-400 mb-2">{path.title}</h2>
                    <p className="text-slate-400 mb-4">{path.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-slate-300">
                        <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1.5 text-sky-400" /> {path.duration}</span>
                        <span className="flex items-center"><BookOpenIcon className="w-4 h-4 mr-1.5 text-sky-400" /> {path.courseCount} Courses</span>
                    </div>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {path.stages.map((stage, stageIndex) => {
                        let stepCounter = totalSteps;
                        totalSteps += stage.steps.length;
                        return (
                            <div key={stageIndex} className="bg-slate-800 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-slate-700 text-sky-400 rounded-full flex items-center justify-center mr-3 font-bold">{stageIndex + 1}</span>
                                    {stage.title}
                                </h3>
                                <div className="space-y-6">
                                    {stage.steps.map(step => {
                                        stepCounter++;
                                        const isCompleted = step.courseId ? getCourseProgress(step.courseId) === 100 : false;
                                        const status = isCompleted ? 'completed' : (stepCounter === completedSteps + 1) ? 'current' : 'locked';
                                        return <RoadmapStepItem key={step.id} step={step} stepNumber={stepCounter} status={status} />;
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default LearningPathPage;