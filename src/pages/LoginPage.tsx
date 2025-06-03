import { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Mail, Lock, Eye, EyeOff, User, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { isAuthenticated, login, register, loginWithGoogle, forgotPassword, setUserType } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if there's a type parameter in the URL (household or commercial)
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type === 'household' || type === 'commercial') {
      setUserType(type);
    }
  }, [location, setUserType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        // Validation for sign up
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }
        
        await register(email, password, displayName);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Authentication failed';
      
      // Format Firebase error messages to be more user-friendly
      if (errorMessage.includes('auth/invalid-email')) {
        setError('Invalid email address');
      } else if (errorMessage.includes('auth/user-not-found') || errorMessage.includes('auth/wrong-password')) {
        setError('Invalid email or password');
      } else if (errorMessage.includes('auth/email-already-in-use')) {
        setError('Email is already in use');
      } else if (errorMessage.includes('auth/weak-password')) {
        setError('Password is too weak');
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      await loginWithGoogle();
    } catch (err) {
      setError('Google sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!email) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }
    
    try {
      await forgotPassword(email);
      setResetEmailSent(true);
    } catch (err: any) {
      if (err.message.includes('auth/user-not-found')) {
        setError('No account found with this email');
      } else {
        setError('Failed to send password reset email');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen bg-bgMain">
      <div className="hidden w-1/2 bg-gradient-to-b from-primary to-primaryDark lg:block">
        <div className="flex h-full flex-col items-center justify-center p-8 text-white">
          <div className="max-w-md">
            <div className="mb-8 flex items-center">
              <Leaf size={32} />
              <h1 className="ml-2 text-3xl font-bold">Sylvan</h1>
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight">
              Your Plants Have Feelings. <br />
              Sylvan Understands Them.
            </h2>
            <p className="mb-8 text-lg text-white/90">
              The smart farming assistant that blends AI, IoT, and emotion-aware computing to care for your plants like a human farmer with decades of intuition.
            </p>
            
            <div className="relative rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                  <Leaf className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Monstera Deliciosa</h3>
                  <p className="text-white/80 text-sm">Just tweeted</p>
                </div>
              </div>
              <p className="text-white/90 italic">
                "Is anyone going to water me today or should I just give up and become a dried arrangement? #ThirstyThursday #PlantNeglect"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center p-8 lg:w-1/2">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center lg:hidden">
            <Leaf className="text-primary" size={28} />
            <h1 className="ml-2 text-2xl font-bold text-primary">Sylvan</h1>
          </div>

          {!showForgotPassword ? (
            <>
              <h2 className="mb-6 text-2xl font-bold text-textPrimary">
                {isSignUp ? 'Create your account' : 'Sign in to your account'}
              </h2>
              
              {error && (
                <div className="mb-4 rounded-md bg-error/10 p-3 text-error flex items-center">
                  <AlertCircle size={16} className="mr-2" />
                  <span>{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {isSignUp && (
                  <div className="mb-4">
                    <label htmlFor="displayName" className="mb-1 block text-sm font-medium text-textPrimary">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <User className="text-textSecondary" size={16} />
                      </div>
                      <input
                        id="displayName"
                        type="text"
                        className="input-field pl-10"
                        placeholder="John Doe"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required={isSignUp}
                      />
                    </div>
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-textPrimary">
                    Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="text-textSecondary" size={16} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      className="input-field pl-10"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-textPrimary">
                    Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="text-textSecondary" size={16} />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className="input-field pl-10 pr-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-textSecondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                {isSignUp && (
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-textPrimary">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="text-textSecondary" size={16} />
                      </div>
                      <input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        className="input-field pl-10 pr-10"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={isSignUp}
                      />
                    </div>
                  </div>
                )}
                
                {!isSignUp && (
                  <div className="mb-6 flex justify-end">
                    <button 
                      type="button" 
                      className="text-sm text-primary hover:underline"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
                
                <button
                  type="submit"
                  className={`w-full flex justify-center items-center ${isSignUp ? 'btn-secondary' : 'btn-primary'}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      <span>{isSignUp ? 'Creating account...' : 'Signing in...'}</span>
                    </div>
                  ) : (
                    <span className="flex items-center">
                      {isSignUp ? 'Sign up' : 'Sign in'}
                      <ArrowRight size={16} className="ml-2" />
                    </span>
                  )}
                </button>
              </form>
              
              <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="mx-4 text-sm text-textSecondary">or</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-border bg-white px-4 py-2 text-textPrimary hover:bg-bgCard transition-colors"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <img 
                  src="/src/assets/images/google-logo.png" 
                  alt="Google" 
                  className="mr-2 h-5 w-5" 
                />
                <span>Continue with Google</span>
              </button>
              
              <div className="mt-6 text-center text-sm text-textSecondary">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <button 
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => setIsSignUp(false)}
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <button 
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => setIsSignUp(true)}
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <button 
                  type="button" 
                  className="text-primary hover:underline flex items-center"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmailSent(false);
                  }}
                >
                  <ArrowRight size={16} className="mr-2 transform rotate-180" />
                  Back to sign in
                </button>
              </div>
              
              <h2 className="mb-6 text-2xl font-bold text-textPrimary">
                Reset your password
              </h2>
              
              {resetEmailSent ? (
                <div className="rounded-md bg-success/10 p-4 text-success">
                  <p>Password reset email sent. Please check your inbox.</p>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-4 rounded-md bg-error/10 p-3 text-error flex items-center">
                      <AlertCircle size={16} className="mr-2" />
                      <span>{error}</span>
                    </div>
                  )}
                  
                  <p className="mb-4 text-textSecondary">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                  
                  <form onSubmit={handleForgotPassword}>
                    <div className="mb-6">
                      <label htmlFor="resetEmail" className="mb-1 block text-sm font-medium text-textPrimary">
                        Email
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Mail className="text-textSecondary" size={16} />
                        </div>
                        <input
                          id="resetEmail"
                          type="email"
                          className="input-field pl-10"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-primary w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        'Send reset link'
                      )}
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;