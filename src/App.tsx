import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { CoinDetail } from './pages/CoinDetail';
import { Login } from './pages/Login';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { CoinPigChat } from './components/chat/CoinPigChat';

// Authentication wrapper component
const AuthenticatedApp: React.FC = () => {
  const { authState } = useAuth();
  const { user, isLoading } = authState;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-neutral-300 dark:border-neutral-700 border-t-primary-600 dark:border-t-primary-400"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/coin/:coinId" element={<CoinDetail />} />
      </Routes>
      <CoinPigChat />
    </>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AuthenticatedApp />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;