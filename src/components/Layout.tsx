import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-bgMain">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-bgMain">
      <Sidebar />
      <div className="flex flex-col overflow-hidden">
        <Navbar />
        <main className="overflow-y-auto p-4 md:px-8 md:py-4 pt-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;