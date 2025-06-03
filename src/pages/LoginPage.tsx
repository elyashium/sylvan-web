import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const { isAuthenticated, login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen bg-bgMain">
      <div className="hidden w-1/2 bg-primary lg:block">
        <div className="flex h-full flex-col items-center justify-center p-8 text-white">
          <div className="max-w-md">
            <div className="mb-8 flex items-center">
              <Activity size={32} />
              <h1 className="ml-2 text-3xl font-bold">Sylvan</h1>
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight">
              Intelligent environmental monitoring for a smarter world
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Track, analyze, and optimize your environmental data with our advanced sensor monitoring platform.
            </p>
            <img 
              src="https://images.pexels.com/photos/3912478/pexels-photo-3912478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Environmental monitoring" 
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center p-8 lg:w-1/2">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center lg:hidden">
            <Activity className="text-primary" size={28} />
            <h1 className="ml-2 text-2xl font-bold text-primary">Sylvan</h1>
          </div>

          <h2 className="mb-6 text-2xl font-bold text-textPrimary">Sign in to your account</h2>
          
          {error && (
            <div className="mb-4 rounded-md bg-error/10 p-3 text-error">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
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
            
            <div className="mb-6">
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
              <div className="mt-1 flex justify-end">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span className="ml-2">Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-textSecondary">
            Don't have an account?{' '}
            <Link to="/" className="text-primary hover:underline">
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;