import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  BarChart2, 
  MessageSquare, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { title: 'Map View', icon: <Map size={20} />, path: '/map' },
    { title: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
    { title: 'Plant Tweets', icon: <MessageSquare size={20} />, path: '/tweets' },
    { title: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    { title: 'Help', icon: <HelpCircle size={20} />, path: '/help' },
  ];

  return (
    <aside className={`hidden md:flex flex-col border-r border-border bg-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && <h1 className="text-xl font-semibold text-primary">Sylvan</h1>}
        <button 
          className="ml-auto rounded-full p-1 text-textSecondary hover:bg-bgMain"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center rounded-md px-3 py-2 transition-colors duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-primary text-white' 
                    : 'text-textSecondary hover:bg-bgMain hover:text-textPrimary'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span className="font-medium">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;