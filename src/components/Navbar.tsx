import { Menu, Bell, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-4 md:px-6">
      <div className="flex items-center md:hidden">
        <button className="mr-2 rounded-md p-2 text-textSecondary hover:bg-bgMain">
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-primary">Sylvan</h1>
      </div>
      
      <div className="hidden md:block">
        <h1 className="text-xl font-semibold text-textPrimary">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="rounded-full p-2 text-textSecondary hover:bg-bgMain">
          <Bell size={20} />
        </button>
        <button className="rounded-full p-2 text-textSecondary hover:bg-bgMain">
          <Settings size={20} />
        </button>
        
        <div className="relative">
          <button 
            className="ml-2 flex items-center space-x-1 rounded-full bg-bgMain p-1 pl-2 pr-3 text-sm font-medium text-textPrimary"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
              <User size={18} />
            </div>
            <span className="hidden md:block">{user?.name || 'User'}</span>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
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