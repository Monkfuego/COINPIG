import React, { useState } from 'react';
import { Bug, User, Mail, Lock, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  
  const { login, signup, authState } = useAuth();
  const { isLoading } = authState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!username.trim()) {
          setError('Username is required');
          return;
        }
        await signup(username, email, password);
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-primary-500/10 dark:from-primary-900/30 dark:via-secondary-900/30 dark:to-primary-900/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Bug className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </CardTitle>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">
            {isLogin
              ? 'Sign in to access your Crypto Airdrop Intel dashboard'
              : 'Join us and start tracking crypto airdrops with our AI-powered platform'}
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-error-50 dark:bg-error-900/30 text-error-700 dark:text-error-400 p-3 rounded-md mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <Input
                  label="Username"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  leftIcon={<User className="h-5 w-5 text-neutral-400" />}
                  fullWidth
                  required
                />
              </div>
            )}
            
            <div className="mb-4">
              <Input
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                leftIcon={<Mail className="h-5 w-5 text-neutral-400" />}
                fullWidth
                required
              />
            </div>
            
            <div className="mb-6">
              <Input
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                leftIcon={<Lock className="h-5 w-5 text-neutral-400" />}
                fullWidth
                required
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              glow
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
          
          {isLogin && (
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};