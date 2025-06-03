import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, Bell, Lock, User, Droplet, Moon, Sun } from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [waterReminders, setWaterReminders] = useState(true);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-textPrimary">Settings</h1>
        <p className="text-textSecondary mt-1">Manage your account and application preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-semibold text-textPrimary flex items-center mb-4">
              <User className="mr-2 text-primary" size={18} />
              Account
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-textPrimary">Email</p>
                <p className="text-sm text-textSecondary">{user?.email || 'Not available'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-textPrimary">Name</p>
                <p className="text-sm text-textSecondary">{user?.displayName || 'Not available'}</p>
              </div>
              <button className="text-sm text-primary hover:underline">
                Edit profile
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="font-semibold text-textPrimary flex items-center mb-4">
              <Bell className="mr-2 text-primary" size={18} />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-textPrimary">Push notifications</p>
                  <p className="text-xs text-textSecondary">Receive alerts about your plants</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <div className="w-11 h-6 bg-bgMain peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-textPrimary">Watering reminders</p>
                  <p className="text-xs text-textSecondary">Get reminders when plants need water</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={waterReminders}
                    onChange={() => setWaterReminders(!waterReminders)}
                  />
                  <div className="w-11 h-6 bg-bgMain peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-semibold text-textPrimary flex items-center mb-4">
              <Settings className="mr-2 text-primary" size={18} />
              Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-textPrimary">Dark mode</p>
                  <p className="text-xs text-textSecondary">Toggle dark mode theme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <div className="w-11 h-6 bg-bgMain peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-2">
                    {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                  </span>
                </label>
              </div>
              
              <div className="pt-2">
                <button className="px-4 py-2 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100 transition-colors">
                  <Lock size={16} className="inline-block mr-1" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 