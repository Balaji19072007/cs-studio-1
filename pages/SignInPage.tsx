import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// Fix: Removed unused 'GoogleIcon' import.
import { CodeIcon, MailIcon, LockClosedIcon } from '../components/Icons';
import { jwtDecode } from 'jwt-decode';

// Fix: Added a global declaration for window.google to solve TypeScript errors.
declare global {
  interface Window {
      google: any;
  }
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleGoogleSignIn = (response: any) => {
    if (response.credential) {
      try {
        const decoded: { name: string, email: string, picture: string } = jwtDecode(response.credential);
        login(decoded.name, decoded.email, response.credential, decoded.picture);
        navigate('/');
      } catch (error) {
        console.error("Error decoding Google credential:", error);
        setError("Failed to sign in with Google.");
      }
    }
  };

  useEffect(() => {
    if (typeof window.google !== 'undefined' && GOOGLE_CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn
      });
      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          { theme: "outline", size: "large", type: "standard", shape: "rectangular", width: "350" }
        );
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (email && password) {
      login('Demo User', email, 'fake-jwt-token');
      navigate('/');
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <CodeIcon className="mx-auto h-12 w-auto text-sky-400" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Or{' '}
            <Link to="/signup" className="font-medium text-sky-400 hover:text-sky-300">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="flex flex-col items-center">
            <div ref={googleButtonRef}></div>
        </div>
        
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="bg-slate-900 px-2 text-slate-500">Or continue with</span>
            </div>
        </div>


        {error && (
            <div className="bg-red-900/50 border border-red-500/50 text-red-300 px-4 py-3 rounded-md">
                <p>{error}</p>
            </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MailIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-md border border-slate-700 bg-slate-800 px-3 py-3 pl-10 text-white placeholder-slate-400 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="pt-4">
              <label htmlFor="password" className="sr-only">Password</label>
               <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-md border border-slate-700 bg-slate-800 px-3 py-3 pl-10 text-white placeholder-slate-400 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-3 px-4 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;