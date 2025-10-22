import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// Fix: Removed unused 'GoogleIcon' import.
import { CodeIcon, MailIcon, LockClosedIcon, UserIcon } from '../components/Icons';
import { jwtDecode } from 'jwt-decode';

// Fix: Added a global declaration for window.google to solve TypeScript errors.
declare global {
  interface Window {
      google: any;
  }
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const MOCK_OTP = '123456'; // For demonstration

const SignUpPage: React.FC = () => {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (name && email && password) {
      console.log(`Simulating OTP sent to ${email}. Code: ${MOCK_OTP}`);
      setStep('otp');
    } else {
      setError('Please fill in all fields.');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (otp === MOCK_OTP) {
      login(name, email, 'fake-jwt-token');
      navigate('/');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };
  
  const handleGoogleSignUp = (response: any) => {
    if (response.credential) {
      try {
        const decoded: { name: string, email: string, picture: string } = jwtDecode(response.credential);
        login(decoded.name, decoded.email, response.credential, decoded.picture);
        navigate('/');
      } catch (error) {
        console.error("Error decoding Google credential:", error);
        setError("Failed to sign up with Google.");
      }
    }
  };

  useEffect(() => {
    if (typeof window.google !== 'undefined' && GOOGLE_CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSignUp
      });
      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          { theme: "outline", size: "large", type: "standard", shape: "rectangular", width: "350" }
        );
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <CodeIcon className="mx-auto h-12 w-auto text-sky-400" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            {step === 'details' ? 'Create your account' : 'Verify your email'}
          </h2>
           <p className="mt-2 text-center text-sm text-slate-400">
            {step === 'details' ? (
                <>
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-sky-400 hover:text-sky-300">
                  Sign in
                </Link>
                </>
            ) : (
                `Enter the 6-digit code sent to ${email}`
            )}
          </p>
        </div>

        {step === 'details' && (
             <div className="flex flex-col items-center">
                <div ref={googleButtonRef}></div>
             </div>
        )}

        {step === 'details' && (
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-slate-900 px-2 text-slate-500">Or continue with</span>
                </div>
            </div>
        )}

        {error && (
            <div className="bg-red-900/50 border border-red-500/50 text-red-300 px-4 py-3 rounded-md">
                <p>{error}</p>
            </div>
        )}

        {step === 'details' ? (
            <form className="mt-8 space-y-6" onSubmit={handleDetailsSubmit}>
                <div className="rounded-md shadow-sm space-y-4">
                    <div>
                        <div className="relative">
                            <UserIcon className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400 ml-3" />
                            <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border-0 bg-slate-800 py-3 pl-10 text-white ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-500" placeholder="Full Name" />
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                           <MailIcon className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400 ml-3" />
                           <input id="email-address" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border-0 bg-slate-800 py-3 pl-10 text-white ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-500" placeholder="Email address" />
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <LockClosedIcon className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400 ml-3" />
                            <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border-0 bg-slate-800 py-3 pl-10 text-white ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-500" placeholder="Password" />
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full justify-center rounded-md bg-sky-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">Create Account</button>
                </div>
            </form>
        ) : (
            <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
                <div>
                    <input id="otp" name="otp" type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="w-full rounded-md border-0 bg-slate-800 py-3 text-center text-2xl tracking-[.5em] text-white ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-500" placeholder="------" />
                </div>
                <div>
                    <button type="submit" className="w-full justify-center rounded-md bg-sky-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">Verify Account</button>
                </div>
            </form>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;