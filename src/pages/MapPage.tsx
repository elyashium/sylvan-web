import { useState, useEffect, useCallback } from 'react';
import MapView from '../components/MapView';
import { Map, List, Filter, Loader2, AlertTriangle, Droplet, User, Activity } from 'lucide-react';
import { PlantLocation } from '../types';
import { getPlantLocations } from '../services/plantService';
import mockData from '../services/mockPlantService';

const MapPage = () => {
  const [plantLocations, setPlantLocations] = useState<PlantLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [filter, setFilter] = useState<'all' | 'healthy' | 'warning' | 'critical'>('all');
  const [mapKey, setMapKey] = useState<number>(0); // Used to force map re-render when needed
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Fetch plant locations from service
  const fetchPlantLocations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const locations = await getPlantLocations();
      setPlantLocations(locations);
      setUsingMockData(false);
      // Force map to re-render with new locations
      setMapKey(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching plant locations:', error);
      // Fall back to mock data
      setPlantLocations(mockData.plantLocations);
      setUsingMockData(true);
      setError('Could not fetch live data. Using demo data instead.');
      // Force map to re-render with mock locations
      setMapKey(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlantLocations();
  }, [fetchPlantLocations]);

  // Filter plant locations based on status
  const filteredPlantLocations = plantLocations.filter(plant => {
    if (filter === 'all') return true;
    return plant.status === filter;
  });

  // Force map to re-render when filter changes
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [filter]);

  // Mock community contributors data
  const contributors = [
    { id: 1, name: 'Sarah M.', plants: 12, date: 'Today' },
    { id: 2, name: 'Mike R.', plants: 8, date: 'Yesterday' },
    { id: 3, name: 'Emma L.', plants: 15, date: 'Today' },
    { id: 4, name: 'John D.', plants: 6, date: '3 days ago' },
    { id: 5, name: 'Lisa K.', plants: 9, date: 'Today' }
  ];

  // Count plants by status
  const healthyCount = plantLocations.filter(p => p.status === 'healthy').length;
  const warningCount = plantLocations.filter(p => p.status === 'warning').length;
  const criticalCount = plantLocations.filter(p => p.status === 'critical').length;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left sidebar with stats */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg p-5 shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-textPrimary mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">Total Plants</span>
                <span className="font-semibold text-textPrimary">{plantLocations.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">Healthy</span>
                <span className="font-semibold text-success">{healthyCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">Need Attention</span>
                <span className="font-semibold text-warning">{warningCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">Unhealthy</span>
                <span className="font-semibold text-error">{criticalCount}</span>
              </div>
            </div>
          </div>
          
          {/* Filter controls for mobile */}
          <div className="bg-white rounded-lg p-5 shadow-sm mb-6 lg:hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-textPrimary">View</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setView('map')}
                  className={`p-2 rounded ${view === 'map' ? 'bg-primary text-white' : 'bg-bgMain'}`}
                >
                  <Map size={18} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded ${view === 'list' ? 'bg-primary text-white' : 'bg-bgMain'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-textSecondary block mb-2">Filter by status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'healthy' | 'warning' | 'critical')}
                className="input-field w-full"
              >
                <option value="all">All Plants</option>
                <option value="healthy">Healthy</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-semibold text-textPrimary">Community Plant Map</h1>
                <p className="text-sm text-textSecondary mt-1">Click on any plant to view its health status and care information</p>
              </div>
              
              {/* Desktop filter controls */}
              <div className="hidden lg:flex items-center space-x-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'healthy' | 'warning' | 'critical')}
                  className="input-field py-1 px-3 text-sm"
                >
                  <option value="all">All Plants</option>
                  <option value="healthy">Healthy</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </select>
                <button
                  onClick={fetchPlantLocations}
                  className="p-1.5 rounded bg-primary text-white"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Activity size={16} />}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-warning/20 border border-warning/30 rounded-md flex items-center">
                <AlertTriangle size={16} className="text-warning mr-2" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            {isLoading && plantLocations.length === 0 ? (
              <div className="flex h-96 w-full items-center justify-center bg-bgMain rounded-lg">
                <div className="flex flex-col items-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-textSecondary">Loading plant locations...</p>
                </div>
              </div>
            ) : (
              <div className="h-[500px] w-full bg-bgMain rounded-lg overflow-hidden">
                <MapView key={mapKey} plantLocations={filteredPlantLocations} />
              </div>
            )}
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-success mr-1"></div>
                  <span className="text-xs text-textSecondary">Healthy</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-warning mr-1"></div>
                  <span className="text-xs text-textSecondary">Needs Attention</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-error mr-1"></div>
                  <span className="text-xs text-textSecondary">Unhealthy</span>
                </div>
              </div>
              <span className="text-xs text-textSecondary">
                Showing {filteredPlantLocations.length} plants
              </span>
            </div>
          </div>
        </div>
        
        {/* Right sidebar with community contributions */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-textPrimary">Community Contributions</h2>
              <User size={18} className="text-textSecondary" />
            </div>
            <p className="text-sm text-textSecondary mb-4">Top contributors this month</p>
            
            <div className="space-y-4">
              {contributors.map((contributor, index) => (
                <div key={contributor.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-bgMain flex items-center justify-center mr-3 text-textSecondary">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-textPrimary">{contributor.name}</p>
                      <p className="text-xs text-textSecondary">{contributor.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Droplet size={14} className="text-primary mr-1" />
                    <span className="text-xs text-textSecondary">{contributor.plants} plants watered</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* List view (only shown on mobile when selected) */}
      {view === 'list' && (
        <div className="mt-6 lg:hidden">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-textPrimary mb-4">Plant List</h2>
            
            {filteredPlantLocations.length > 0 ? (
              <div className="space-y-3">
                {filteredPlantLocations.map((plant) => (
                  <div
                    key={plant.id}
                    className="rounded-lg bg-bgMain p-3 border border-border"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-textPrimary">{plant.name}</h3>
                      <div className={`px-2 py-0.5 rounded-full text-xs ${
                        plant.status === 'healthy' ? 'bg-success/20 text-success' :
                        plant.status === 'warning' ? 'bg-warning/20 text-warning' :
                        'bg-error/20 text-error'
                      }`}>
                        {plant.status}
                      </div>
                    </div>
                    <p className="text-xs text-textSecondary">
                      {plant.type} • Updated {plant.lastUpdated}
                    </p>
                    <a
                      href={`/location/${plant.id}`}
                      className="text-xs text-primary hover:underline flex items-center mt-1"
                    >
                      View details
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-6 text-textSecondary">
                No plants match the selected filter.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage; 