import { Bell, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  // Get the current page title based on the route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path.startsWith('/dashboard')) return 'Dashboard';
    if (path.startsWith('/map')) return 'Plant Map';
    if (path.startsWith('/location/')) return 'Plant Details';
    if (path.startsWith('/analytics')) return 'Analytics';
    if (path.startsWith('/tweets')) return 'Plant Tweets';
    if (path.startsWith('/settings')) return 'Settings';
    if (path.startsWith('/help')) return 'Help';
    
    return 'Sylvan';
  };

  return (
    <header className="flex h-16 items-center justify-between bg-transparent px-4 md:px-8 mt-8">
      <div>
        <h1 className="text-xl font-semibold text-textPrimary">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="rounded-full p-2 text-textSecondary hover:bg-white">
          <Bell size={20} />
        </button>
        <button className="rounded-full p-2 text-textSecondary hover:bg-white">
          <Settings size={20} />
        </button>
        
        <div className="relative">
          <button 
            className="ml-2 flex items-center space-x-1 rounded-full bg-white p-1 pl-2 pr-3 text-sm font-medium text-textPrimary shadow-sm"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
              <User size={18} />
            </div>
            <span className="hidden md:block">{user?.name || 'User'}</span>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <button 
                className="block w-full px-4 py-2 text-left text-sm text-textPrimary hover:bg-bgMain"
                onClick={logout}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;