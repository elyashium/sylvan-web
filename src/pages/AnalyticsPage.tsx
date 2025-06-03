import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { mockAnalyticsData } from '../utils/mockData';
import { MapPin } from 'lucide-react';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Convert health data to chart format
  const healthData = [
    { name: 'Healthy', value: mockAnalyticsData.plantHealth.healthy, color: '#34D399' },
    { name: 'Warning', value: mockAnalyticsData.plantHealth.warning, color: '#FBBF24' },
    { name: 'Critical', value: mockAnalyticsData.plantHealth.critical, color: '#F87171' }
  ];

  // Convert emotion data to chart format
  const emotionData = [
    { name: 'Happy', value: mockAnalyticsData.plantEmotions.happy, color: '#34D399' },
    { name: 'Angry', value: mockAnalyticsData.plantEmotions.angry, color: '#F87171' },
    { name: 'Stressed', value: mockAnalyticsData.plantEmotions.stressed, color: '#FBBF24' },
    { name: 'Anxious', value: mockAnalyticsData.plantEmotions.anxious, color: '#60A5FA' }
  ];

  // Convert activity data to chart format
  const activityData = [
    { name: 'Watering', value: mockAnalyticsData.plantActivity.watering },
    { name: 'Repositioning', value: mockAnalyticsData.plantActivity.repositioning },
    { name: 'Pruning', value: mockAnalyticsData.plantActivity.pruning },
    { name: 'Fertilizing', value: mockAnalyticsData.plantActivity.fertilizing }
  ];

  // Convert location data for comparison
  const locationComparisonData = mockAnalyticsData.locationData.map(location => ({
    name: location.name,
    temperature: location.averageConditions.temperature,
    humidity: location.averageConditions.humidity,
    soilMoisture: location.averageConditions.soilMoisture
  }));

  // Get data for selected location or all locations
  const getSelectedLocationData = () => {
    if (selectedLocation === 'all') {
      return {
        name: 'All Locations',
        plantCount: mockAnalyticsData.locationData.reduce((sum, loc) => sum + loc.plantCount, 0),
        healthyCount: mockAnalyticsData.locationData.reduce((sum, loc) => sum + loc.healthStatus.healthy, 0),
        warningCount: mockAnalyticsData.locationData.reduce((sum, loc) => sum + loc.healthStatus.warning, 0),
        criticalCount: mockAnalyticsData.locationData.reduce((sum, loc) => sum + loc.healthStatus.critical, 0),
        temperature: mockAnalyticsData.locationData.reduce((sum, loc) => sum + loc.averageConditions.temperature, 0) / mockAnalyticsData.locationData.length,
        humidity: mockAnalyticsData.locationData.reduce((sum, loc) => sum + loc.averageConditions.humidity, 0) / mockAnalyticsData.locationData.length,
        soilMoisture: mockAnalyticsData.locationData.reduce((sum, loc) => sum + loc.averageConditions.soilMoisture, 0) / mockAnalyticsData.locationData.length
      };
    } else {
      const location = mockAnalyticsData.locationData.find(loc => loc.name === selectedLocation);
      if (!location) return null;
      
      return {
        name: location.name,
        plantCount: location.plantCount,
        healthyCount: location.healthStatus.healthy,
        warningCount: location.healthStatus.warning,
        criticalCount: location.healthStatus.critical,
        temperature: location.averageConditions.temperature,
        humidity: location.averageConditions.humidity,
        soilMoisture: location.averageConditions.soilMoisture
      };
    }
  };

  const selectedData = getSelectedLocationData();

  // Location radar data
  const locationRadarData = mockAnalyticsData.locationData.map(location => ({
    name: location.name,
    plantCount: location.plantCount,
    healthyPlants: location.healthStatus.healthy,
    optimalConditions: (
      location.averageConditions.temperature > 20 && location.averageConditions.temperature < 28 && 
      location.averageConditions.humidity > 40 && location.averageConditions.humidity < 70 && 
      location.averageConditions.soilMoisture > 30 && location.averageConditions.soilMoisture < 60
    ) ? 100 : 50
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-textPrimary">Location Analytics</h1>
        
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
          <div className="relative">
            <select
              className="input-field appearance-none pr-8"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              {mockAnalyticsData.locationData.map(location => (
                <option key={location.name} value={location.name}>{location.name}</option>
              ))}
            </select>
            <MapPin size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
          </div>
          
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                timeRange === 'week' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-textPrimary hover:bg-bgMain'
              }`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === 'month' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-textPrimary hover:bg-bgMain'
              }`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                timeRange === 'year' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-textPrimary hover:bg-bgMain'
              }`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Location Overview Cards */}
      {selectedData && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <h3 className="text-lg font-semibold text-textPrimary mb-1">{selectedData.name}</h3>
            <p className="text-3xl font-bold text-primary">{selectedData.plantCount}</p>
            <p className="text-sm text-textSecondary mt-1">Total plants</p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-textPrimary mb-1">Healthy Plants</h3>
            <p className="text-3xl font-bold text-success">{selectedData.healthyCount}</p>
            <p className="text-sm text-textSecondary mt-1">
              {selectedData.plantCount > 0 ? Math.round((selectedData.healthyCount / selectedData.plantCount) * 100) : 0}% of total
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-textPrimary mb-1">Needs Attention</h3>
            <p className="text-3xl font-bold text-warning">
              {selectedData.warningCount + selectedData.criticalCount}
            </p>
            <p className="text-sm text-textSecondary mt-1">
              {selectedData.plantCount > 0 ? Math.round(((selectedData.warningCount + selectedData.criticalCount) / selectedData.plantCount) * 100) : 0}% of total
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-textPrimary mb-1">Average Conditions</h3>
            <div className="flex items-center space-x-2">
              <div>
                <p className="text-xs text-textSecondary">Temp</p>
                <p className="text-sm font-medium">{selectedData.temperature.toFixed(1)}°C</p>
              </div>
              <div className="h-8 border-r border-border"></div>
              <div>
                <p className="text-xs text-textSecondary">Humidity</p>
                <p className="text-sm font-medium">{selectedData.humidity.toFixed(1)}%</p>
              </div>
              <div className="h-8 border-r border-border"></div>
              <div>
                <p className="text-xs text-textSecondary">Soil</p>
                <p className="text-sm font-medium">{selectedData.soilMoisture.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Comparison Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Location Comparison</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={locationComparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="temperature" name="Temperature (°C)" fill="#F87171" />
              <Bar dataKey="humidity" name="Humidity (%)" fill="#60A5FA" />
              <Bar dataKey="soilMoisture" name="Soil Moisture (%)" fill="#34D399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Location Health Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={locationRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                <Radar name="Plant Count" dataKey="plantCount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Healthy Plants" dataKey="healthyPlants" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Radar name="Optimal Conditions" dataKey="optimalConditions" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Environmental Conditions</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAnalyticsData.environmentalConditions.temperature}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Temperature (°C)" 
                  stroke="#F87171" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Plant Emotions by Location</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Plant Activity by Location</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Actions" fill="#60A5FA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 