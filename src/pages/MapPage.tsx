import { useState, useEffect, useCallback } from 'react';
import MapView from '../components/MapView';
import { Map, List, Filter, Loader2 } from 'lucide-react';
import { PlantLocation } from '../types';
import { getPlantLocations } from '../services/plantService';

const MapPage = () => {
  const [plantLocations, setPlantLocations] = useState<PlantLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [filter, setFilter] = useState<'all' | 'healthy' | 'warning' | 'critical'>('all');
  const [mapKey, setMapKey] = useState<number>(0); // Used to force map re-render when needed

  // Fetch plant locations from service
  const fetchPlantLocations = useCallback(async () => {
    setIsLoading(true);
    try {
      const locations = await getPlantLocations();
      setPlantLocations(locations);
      // Force map to re-render with new locations
      setMapKey(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching plant locations:', error);
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

  const getStatusColor = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'critical':
        return 'bg-error';
      default:
        return 'bg-info';
    }
  };

  // Refresh plant data
  const handleRefresh = () => {
    fetchPlantLocations();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary mb-2">Plant Map</h1>
          <p className="text-textSecondary">
            View all your plants and their current status on the map
          </p>
        </div>
        <button 
          onClick={handleRefresh}
          className="btn-outline flex items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>Refresh</>
          )}
        </button>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('map')}
            className={`flex items-center px-3 py-2 rounded-md ${
              view === 'map'
                ? 'bg-primary text-white'
                : 'bg-white text-textSecondary border border-border'
            }`}
          >
            <Map size={16} className="mr-2" />
            Map View
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center px-3 py-2 rounded-md ${
              view === 'list'
                ? 'bg-primary text-white'
                : 'bg-white text-textSecondary border border-border'
            }`}
          >
            <List size={16} className="mr-2" />
            List View
          </button>
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-sm text-textSecondary">Filter:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'healthy' | 'warning' | 'critical')}
            className="input-field py-1 px-3"
          >
            <option value="all">All Plants</option>
            <option value="healthy">Healthy</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {isLoading && plantLocations.length === 0 ? (
        <div className="flex h-96 w-full items-center justify-center bg-white rounded-lg shadow-sm">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-textSecondary">Loading plant locations...</p>
          </div>
        </div>
      ) : (
        <>
          {view === 'map' ? (
            <div className="h-[600px] w-full">
              <MapView key={mapKey} plantLocations={filteredPlantLocations} />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPlantLocations.length > 0 ? (
                filteredPlantLocations.map((plant) => (
                  <div
                    key={plant.id}
                    className="rounded-lg bg-white p-4 shadow-sm border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-textPrimary">{plant.name}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        plant.status === 'healthy' ? 'bg-success/20 text-success' :
                        plant.status === 'warning' ? 'bg-warning/20 text-warning' :
                        'bg-error/20 text-error'
                      }`}>
                        {plant.status}
                      </div>
                    </div>
                    <p className="text-sm text-textSecondary mb-3">
                      {plant.type} • Updated {plant.lastUpdated}
                    </p>
                    <div className="flex items-center text-sm mb-3">
                      <Map size={14} className="mr-1 text-textSecondary" />
                      <span className="text-textSecondary">
                        {plant.lat.toFixed(4)}, {plant.lng.toFixed(4)}
                      </span>
                    </div>
                    <a
                      href={`/location/${plant.id}`}
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      View details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-textSecondary">No plants match the selected filter.</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-sm text-textSecondary">
            <div>
              Showing {filteredPlantLocations.length} plants
              {filter !== 'all' && ` with status: ${filter}`}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-success mr-1"></div>
                <span>Healthy</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-warning mr-1"></div>
                <span>Warning</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-error mr-1"></div>
                <span>Critical</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MapPage; 