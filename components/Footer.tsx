import React from 'react';
import { Link } from 'react-router-dom';
import { CodeIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 border-t border-slate-700">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
             <Link to="/" className="flex items-center space-x-2 text-white text-xl font-bold">
              <CodeIcon className="h-8 w-8 text-sky-400" />
              <span>CS Studio</span>
            </Link>
            <p className="text-slate-400 text-base">
              Empowering the next generation of developers with AI-powered, interactive learning.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/roadmaps" className="text-base text-slate-400 hover:text-white">Learning Paths</Link></li>
                  <li><Link to="/problems" className="text-base text-slate-400 hover:text-white">Problems</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">FAQ</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">About</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">Blog</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8">
          <p className="text-base text-slate-400 xl:text-center">&copy; {new Date().getFullYear()} CS Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;