import { useNavigate } from 'react-router-dom';
import { Filter, RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import LocationCard from '../components/LocationCard';
import { mockSensorData } from '../utils/mockData';
import { SensorReading } from '../types';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter data based on search term and status filter
  const filteredData = mockSensorData.filter((sensor) => {
    const locationString = sensor.gps 
      ? `Lat: ${sensor.gps.lat}, Lng: ${sensor.gps.lng}`
      : sensor.location 
        ? `Lat: ${sensor.location.latitude}, Lng: ${sensor.location.longitude}`
        : '';
    
    const matchesSearch = locationString.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    
    // Calculate status for filtering
    const hasWarning = 
      (sensor.temperature && (sensor.temperature > 30 || sensor.temperature < 10)) ||
      (sensor.humidity && (sensor.humidity > 80 || sensor.humidity < 20)) ||
      (sensor.soilMoisture && sensor.soilMoisture < 20) ||
      sensor.vibration;
    
    const hasError = 
      (sensor.temperature && (sensor.temperature > 35 || sensor.temperature < 5)) ||
      (sensor.humidity && (sensor.humidity > 90 || sensor.humidity < 10)) ||
      (sensor.soilMoisture && sensor.soilMoisture < 10);
    
    if (statusFilter === 'normal') {
      return matchesSearch && !hasWarning && !hasError;
    }
    if (statusFilter === 'warning') {
      return matchesSearch && hasWarning && !hasError;
    }
    if (statusFilter === 'error') {
      return matchesSearch && hasError;
    }
    
    return matchesSearch;
  });

  const handleCardClick = (sensor: SensorReading) => {
    navigate(`/location/${sensor._id}`);
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-textPrimary">My Locations</h1>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={16} className="text-textSecondary" />
            </div>
            <input
              type="text"
              placeholder="Search locations..."
              className="input-field w-full pl-10 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <select
              className="input-field appearance-none pr-8"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="normal">Normal</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <Filter size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
          </div>
          
          <button
            className="flex items-center rounded-md border border-border bg-white px-3 py-2 text-textPrimary transition-colors duration-200 hover:bg-bgMain"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
      
      {filteredData.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-border bg-white p-8 text-center">
          <div className="mb-4 rounded-full bg-bgMain p-4">
            <Search size={24} className="text-textSecondary" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-textPrimary">No locations found</h3>
          <p className="text-textSecondary">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Add some sensor locations to get started'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((sensor) => (
            <LocationCard
              key={sensor._id}
              data={sensor}
              onClick={() => handleCardClick(sensor)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;