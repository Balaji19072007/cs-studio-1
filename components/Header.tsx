
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CodeIcon, SearchIcon, ChevronRightIcon } from './Icons';
import { COURSES, LEARNING_PATHS } from '../constants';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search...');
  const searchRef = useRef<HTMLDivElement>(null);

  const activeLinkClass = 'bg-slate-700 text-sky-400';
  const inactiveLinkClass = 'text-slate-300 hover:bg-slate-700 hover:text-white';
  const linkBaseClass = 'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200';

  useEffect(() => {
    // Context-aware search
    if (location.pathname.startsWith('/courses')) {
        setSearchData(COURSES.map(c => ({...c, type: 'course'})));
        setSearchPlaceholder('Search courses...');
    } else if (location.pathname.startsWith('/roadmaps')) {
        setSearchData(LEARNING_PATHS.map(p => ({...p, type: 'roadmap'})));
        setSearchPlaceholder('Search roadmaps...');
    } else {
        setSearchData([]);
        setSearchPlaceholder('Search...');
    }
  }, [location]);

  useEffect(() => {
    if (searchQuery.length > 1) {
        const filtered = searchData
            .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 5);
        setSuggestions(filtered);
    } else {
        setSuggestions([]);
    }
  }, [searchQuery, searchData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <header className="bg-slate-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
             <NavLink to="/" className="flex-shrink-0 flex items-center space-x-2 text-white text-xl font-bold">
              <CodeIcon className="h-8 w-8 text-sky-400" />
              <span>CS Studio</span>
            </NavLink>
             <nav className="hidden md:flex items-center space-x-1">
                <NavLink to="/" className={({ isActive }) => `${linkBaseClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Home</NavLink>
                <NavLink to="/courses" className={({ isActive }) => `${linkBaseClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Courses</NavLink>
                <NavLink to="/roadmaps" className={({ isActive }) => `${linkBaseClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Roadmaps</NavLink>
                <NavLink to="/problems" className={({ isActive }) => `${linkBaseClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Problems</NavLink>
                <NavLink to="/leaderboard" className={({ isActive }) => `${linkBaseClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Leaderboard</NavLink>
                <NavLink to="/community" className={({ isActive }) => `${linkBaseClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Community</NavLink>
            </nav>
          </div>
         
          <div className="flex items-center space-x-4">
             <div ref={searchRef} className="relative hidden lg:block">
                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    disabled={searchData.length === 0}
                    className="block w-full rounded-md border-0 bg-slate-700 py-1.5 pl-10 pr-3 text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:opacity-50"
                />
                 {suggestions.length > 0 && (
                    <div className="search-suggestions absolute z-10 mt-2 w-full origin-top-right rounded-md bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {suggestions.map(item => (
                                <Link
                                    key={item.id}
                                    to={item.type === 'course' ? `/course/${item.id}` : `/roadmaps#${item.id}`}
                                    onClick={clearSearch}
                                    className="flex justify-between items-center px-4 py-2 text-sm text-slate-200 hover:bg-slate-600"
                                >
                                    <span>{item.title}</span>
                                    <ChevronRightIcon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-700 text-sky-300 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500"
                >
                  {user.photoUrl ? <img src={user.photoUrl} alt="You" className="h-10 w-10 rounded-full object-cover" /> : user.initials}
                </button>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-slate-700 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-3 border-b border-slate-600">
                      <p className="text-sm text-white" role="none">{user.name}</p>
                      <p className="text-xs text-slate-400" role="none">{user.email}</p>
                    </div>
                    <Link to="/profile" onClick={() => setDropdownOpen(false)} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:bg-slate-600 hover:text-white">My Profile</Link>
                    <Link to="/settings" onClick={() => setDropdownOpen(false)} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:bg-slate-600 hover:text-white">Settings</Link>
                    <button onClick={() => { logout(); setDropdownOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:bg-slate-600 hover:text-white">Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <NavLink to="/signin" className="px-4 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-700">Sign In</NavLink>
                <NavLink to="/signup" className="px-4 py-2 rounded-md text-sm font-medium bg-sky-600 text-white hover:bg-sky-700">Sign Up</NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
