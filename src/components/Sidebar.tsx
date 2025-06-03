import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  BarChart2, 
  MessageSquare, 
  Settings, 
  HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { title: 'Map View', icon: <Map size={20} />, path: '/map' },
    { title: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
    { title: 'Plant Tweets', icon: <MessageSquare size={20} />, path: '/tweets' },
    { title: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    { title: 'Help', icon: <HelpCircle size={20} />, path: '/help' }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-30 mx-auto w-fit">
      <aside className="bg-white rounded-b-xl shadow-lg transition-all duration-300 w-auto">
        <nav className="flex px-2 py-2 overflow-x-auto">
          <ul className="flex space-x-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center justify-center rounded-md p-2.5 transition-colors duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-primary text-white' 
                      : 'text-textSecondary hover:bg-bgMain hover:text-textPrimary'
                  }`}
                  title={item.title}
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;