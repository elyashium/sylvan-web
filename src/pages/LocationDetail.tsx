import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ThermometerIcon, 
  Droplet, 
  Gauge, 
  AlertCircle,
  Clock,
  MapPin,
  Calendar,
  Vibrate
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { SensorReading } from '../types';
import { getSensorById } from '../utils/mockData';
import StatusBadge from '../components/StatusBadge';
import SensorMap from '../components/GoogleMap';

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sensor, setSensor] = useState<SensorReading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate API call to fetch sensor data
      setTimeout(() => {
        const sensorData = getSensorById(id);
        setSensor(sensorData || null);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  // Calculate the status based on sensor readings
  const calculateStatus = (): 'normal' | 'warning' | 'error' => {
    if (!sensor) return 'error';
    
    if (!sensor.temperature && !sensor.humidity && !sensor.soilMoisture) {
      return 'error'; // No data available
    }
    
    // These thresholds would normally be configurable or data-driven
    if (
      (sensor.temperature && (sensor.temperature > 35 || sensor.temperature < 5)) ||
      (sensor.humidity && (sensor.humidity > 90 || sensor.humidity < 10)) ||
      (sensor.soilMoisture && sensor.soilMoisture < 10)
    ) {
      return 'error';
    }
    
    if (
      (sensor.temperature && (sensor.temperature > 30 || sensor.temperature < 10)) ||
      (sensor.humidity && (sensor.humidity > 80 || sensor.humidity < 20)) ||
      (sensor.soilMoisture && sensor.soilMoisture < 20) ||
      sensor.vibration
    ) {
      return 'warning';
    }
    
    return 'normal';
  };

  // Get location coordinates
  const getLocation = () => {
    if (!sensor) return null;
    
    if (sensor.gps) {
      return { lat: sensor.gps.lat, lng: sensor.gps.lng };
    } else if (sensor.location) {
      return { lat: sensor.location.latitude, lng: sensor.location.longitude };
    }
    
    return null;
  };

  // Format timestamp for display
  const getFormattedTime = () => {
    if (!sensor) return 'Unknown';
    
    const timestamp = sensor.timestamp || sensor.createdAt;
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'Unknown time';
    }
  };

  // Format date for detail view
  const getFormattedDate = () => {
    if (!sensor) return 'Unknown';
    
    const timestamp = sensor.timestamp || sensor.createdAt;
    try {
      return format(new Date(timestamp), 'PPP p');
    } catch (error) {
      return 'Unknown date';
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <span className="ml-2 text-textSecondary">Loading sensor data...</span>
      </div>
    );
  }

  if (!sensor) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-border bg-white p-8 text-center">
        <div className="mb-4 rounded-full bg-bgMain p-4">
          <AlertCircle size={24} className="text-error" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-textPrimary">Sensor not found</h3>
        <p className="mb-4 text-textSecondary">
          The sensor data you're looking for doesn't exist or may have been removed.
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

  const location = getLocation();

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button 
          className="mr-4 flex items-center text-textSecondary hover:text-primary"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-semibold text-textPrimary">Sensor Details</h1>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-textPrimary">
                Location Information
              </h2>
              <StatusBadge status={calculateStatus()} />
            </div>
            
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="flex items-center rounded-md bg-bgMain p-4">
                <div className="mr-4 rounded-full bg-primary/10 p-3">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm text-textSecondary">Coordinates</div>
                  <div className="font-medium text-textPrimary">
                    {location ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}` : 'Unknown'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center rounded-md bg-bgMain p-4">
                <div className="mr-4 rounded-full bg-primary/10 p-3">
                  <Calendar size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm text-textSecondary">Last Reading</div>
                  <div className="font-medium text-textPrimary">{getFormattedDate()}</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-medium text-textPrimary">Sensor Readings</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                {sensor.temperature !== undefined && (
                  <div className="rounded-md border border-border p-4">
                    <div className="mb-2 flex items-center text-primary">
                      <ThermometerIcon size={18} className="mr-2" />
                      <span className="font-medium">Temperature</span>
                    </div>
                    <div className="text-2xl font-semibold text-textPrimary">
                      {sensor.temperature.toFixed(1)}°C
                    </div>
                    <div className="mt-1 text-xs text-textSecondary">
                      {sensor.temperature > 30 ? 'Above normal range' : 
                       sensor.temperature < 10 ? 'Below normal range' : 'Normal range'}
                    </div>
                  </div>
                )}
                
                {sensor.humidity !== undefined && (
                  <div className="rounded-md border border-border p-4">
                    <div className="mb-2 flex items-center text-info">
                      <Droplet size={18} className="mr-2" />
                      <span className="font-medium">Humidity</span>
                    </div>
                    <div className="text-2xl font-semibold text-textPrimary">
                      {sensor.humidity.toFixed(1)}%
                    </div>
                    <div className="mt-1 text-xs text-textSecondary">
                      {sensor.humidity > 80 ? 'Above normal range' : 
                       sensor.humidity < 20 ? 'Below normal range' : 'Normal range'}
                    </div>
                  </div>
                )}
                
                {sensor.soilMoisture !== undefined && (
                  <div className="rounded-md border border-border p-4">
                    <div className="mb-2 flex items-center text-accent">
                      <Gauge size={18} className="mr-2" />
                      <span className="font-medium">Soil Moisture</span>
                    </div>
                    <div className="text-2xl font-semibold text-textPrimary">
                      {sensor.soilMoisture.toFixed(1)}%
                    </div>
                    <div className="mt-1 text-xs text-textSecondary">
                      {sensor.soilMoisture < 20 ? 'Below optimal level' : 'Optimal level'}
                    </div>
                  </div>
                )}
                
                {sensor.vibration !== undefined && (
                  <div className="rounded-md border border-border p-4">
                    <div className="mb-2 flex items-center text-warning">
                      <Vibrate size={18} className="mr-2" />
                      <span className="font-medium">Vibration</span>
                    </div>
                    <div className="text-2xl font-semibold text-textPrimary">
                      {sensor.vibration ? 'Detected' : 'None'}
                    </div>
                    <div className="mt-1 text-xs text-textSecondary">
                      {sensor.vibration ? 'Abnormal activity detected' : 'No abnormal activity'}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center text-xs text-textSecondary">
              <Clock size={14} className="mr-1" />
              <span>Updated {getFormattedTime()}</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-white p-6 shadow-sm lg:row-span-2">
          <h2 className="mb-4 text-xl font-semibold text-textPrimary">Location Map</h2>
          <SensorMap 
            sensors={[sensor]} 
            center={location || undefined}
            zoom={15}
            height="400px"
          />
          
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-medium text-textPrimary">Sensor Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-textSecondary">Sensor ID</span>
                <span className="font-medium text-textPrimary">{sensor._id.slice(-8)}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-textSecondary">Installation Date</span>
                <span className="font-medium text-textPrimary">
                  {format(new Date(sensor.createdAt), 'PPP')}
                </span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-textSecondary">Last Updated</span>
                <span className="font-medium text-textPrimary">
                  {format(new Date(sensor.updatedAt), 'PPP')}
                </span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-textSecondary">Status</span>
                <StatusBadge status={calculateStatus()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;