import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ThermometerIcon, 
  Droplet, 
  Sun, 
  AlertCircle,
  Clock,
  MapPin,
  Calendar,
  Twitter,
  Leaf,
  Sprout
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { PlantDetails } from '../types';
import { getPlantDetails } from '../services/plantService';
import MapView from '../components/MapView';

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<PlantDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'tweets' | 'history'>('details');

  useEffect(() => {
    if (id) {
      // Fetch plant details
      const fetchPlantDetails = async () => {
        setLoading(true);
        try {
          const plantData = await getPlantDetails(id);
          setPlant(plantData);
        } catch (error) {
          console.error('Error fetching plant details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPlantDetails();
    }
  }, [id]);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'PPP');
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'p');
    } catch (error) {
      return 'Unknown time';
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <span className="ml-2 text-textSecondary">Loading plant data...</span>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-border bg-white p-8 text-center">
        <div className="mb-4 rounded-full bg-bgMain p-4">
          <AlertCircle size={24} className="text-error" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-textPrimary">Plant not found</h3>
        <p className="mb-4 text-textSecondary">
          The plant you're looking for doesn't exist or may have been removed.
        </p>
        <button 
          className="btn-primary"
          onClick={() => navigate('/dashboard')}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const getStatusColor = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy':
        return 'bg-success text-white';
      case 'warning':
        return 'bg-warning text-white';
      case 'critical':
        return 'bg-error text-white';
      default:
        return 'bg-info text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-4 flex items-center text-textSecondary hover:text-primary"
            onClick={() => navigate('/map')}
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Back to Map</span>
          </button>
          <h1 className="text-2xl font-semibold text-textPrimary">{plant.name}</h1>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(plant.status)}`}>
          {plant.status}
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-full bg-primary/10 p-3">
                <Leaf size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-textPrimary">{plant.name}</h2>
                <div className="text-sm text-textSecondary">{plant.species}</div>
              </div>
            </div>
            
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="flex items-center rounded-md bg-bgMain p-4">
                <div className="mr-4 rounded-full bg-primary/10 p-3">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm text-textSecondary">Location</div>
                  <div className="font-medium text-textPrimary">{plant.location.name}</div>
                </div>
              </div>
              
              <div className="flex items-center rounded-md bg-bgMain p-4">
                <div className="mr-4 rounded-full bg-primary/10 p-3">
                  <Calendar size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm text-textSecondary">Next Watering</div>
                  <div className="font-medium text-textPrimary">{formatDate(plant.nextWatering)}</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="mb-4 flex border-b border-border">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'details'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-textSecondary'
                  }`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'tweets'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-textSecondary'
                  }`}
                  onClick={() => setActiveTab('tweets')}
                >
                  Tweets
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'history'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-textSecondary'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  History
                </button>
              </div>
              
              {activeTab === 'details' && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-md border border-border p-4">
                    <div className="mb-2 flex items-center text-primary">
                      <ThermometerIcon size={18} className="mr-2" />
                      <span className="font-medium">Temperature</span>
                    </div>
                    <div className="text-2xl font-semibold text-textPrimary">
                      {plant.sensorData.temperature.toFixed(1)}°C
                    </div>
                    <div className="mt-1 text-xs text-textSecondary">
                      {plant.sensorData.temperature > 30 ? 'Above normal range' : 
                       plant.sensorData.temperature < 10 ? 'Below normal range' : 'Normal range'}
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-border p-4">
                    <div className="mb-2 flex items-center text-info">
                      <Droplet size={18} className="mr-2" />
                      <span className="font-medium">Humidity</span>
                    </div>
                    <div className="text-2xl font-semibold text-textPrimary">
                      {plant.sensorData.humidity.toFixed(1)}%
                    </div>
                    <div className="mt-1 text-xs text-textSecondary">
                      {plant.sensorData.humidity > 80 ? 'Above normal range' : 
                       plant.sensorData.humidity < 20 ? 'Below normal range' : 'Normal range'}
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-border p-4">
                    <div className="mb-2 flex items-center text-accent">
                      <Sprout size={18} className="mr-2" />
                      <span className="font-medium">Soil Moisture</span>
                    </div>
                    <div className="text-2xl font-semibold text-textPrimary">
                      {plant.sensorData.soilMoisture.toFixed(1)}%
                    </div>
                    <div className="mt-1 text-xs text-textSecondary">
                      {plant.sensorData.soilMoisture < 20 ? 'Below optimal level' : 'Optimal level'}
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-border p-4">
                    <div className="mb-2 flex items-center text-warning">
                      <Sun size={18} className="mr-2" />
                      <span className="font-medium">Light Level</span>
                    </div>
                    <div className="text-2xl font-semibold text-textPrimary">
                      {plant.sensorData.lightLevel} lux
                    </div>
                    <div className="mt-1 text-xs text-textSecondary">
                      {plant.sensorData.lightLevel < 200 ? 'Low light conditions' : 
                       plant.sensorData.lightLevel > 1000 ? 'Bright conditions' : 'Moderate light'}
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-border p-4">
                    <div className="mb-2 flex items-center text-success">
                      <Droplet size={18} className="mr-2" />
                      <span className="font-medium">Water Level</span>
                    </div>
                    <div className="text-2xl font-semibold text-textPrimary">
                      {plant.sensorData.waterLevel}%
                    </div>
                    <div className="mt-1 text-xs text-textSecondary">
                      {plant.sensorData.waterLevel < 20 ? 'Refill needed soon' : 'Adequate water'}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'tweets' && (
                <div className="space-y-4">
                  {plant.tweets.map((tweet, index) => (
                    <div key={index} className="rounded-lg border border-border p-4">
                      <div className="mb-2 flex items-center">
                        <div className="mr-3 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Twitter size={20} className="text-info" />
                        </div>
                        <div>
                          <div className="font-medium text-textPrimary">{plant.name}</div>
                          <div className="text-xs text-textSecondary">
                            {formatDate(tweet.timestamp)} at {formatTime(tweet.timestamp)}
                          </div>
                        </div>
                      </div>
                      <p className="text-textSecondary italic">"{tweet.content}"</p>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'history' && (
                <div className="space-y-2">
                  {plant.history.map((event, index) => (
                    <div key={index} className="flex items-center border-l-2 border-primary pl-4 py-2">
                      <div className="mr-3 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-textPrimary">{event.event}</div>
                        <div className="text-xs text-textSecondary">{event.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center text-xs text-textSecondary">
              <Clock size={14} className="mr-1" />
              <span>Last watered on {formatDate(plant.lastWatered)}</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-textPrimary">Location</h3>
            <div className="h-[300px] w-full">
              <MapView 
                plantLocations={[{
                  id: plant.id,
                  name: plant.name,
                  lat: plant.location.lat,
                  lng: plant.location.lng,
                  status: plant.status,
                  type: plant.type,
                  lastUpdated: 'Current location'
                }]}
                initialCenter={{
                  lat: plant.location.lat,
                  lng: plant.location.lng
                }}
                zoom={15}
              />
            </div>
            <div className="mt-4 text-sm text-textSecondary">
              <div className="flex items-center mb-1">
                <MapPin size={16} className="mr-1 text-primary" />
                <span>{plant.location.name}</span>
              </div>
              <div className="text-xs">
                Coordinates: {plant.location.lat.toFixed(6)}, {plant.location.lng.toFixed(6)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;