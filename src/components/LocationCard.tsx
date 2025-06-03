import { ThermometerIcon, Droplet, Gauge, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import StatusBadge from './StatusBadge';
import { LocationCardProps, SensorStatus } from '../types';

const LocationCard = ({ data, onClick }: LocationCardProps) => {
  // Extract location name or coordinates
  const getLocationName = () => {
    if (data.gps) {
      return `Lat: ${data.gps.lat.toFixed(4)}, Lng: ${data.gps.lng.toFixed(4)}`;
    } else if (data.location) {
      return `Lat: ${data.location.latitude.toFixed(4)}, Lng: ${data.location.longitude.toFixed(4)}`;
    }
    return 'Unknown Location';
  };

  // Calculate the status based on sensor readings
  const calculateStatus = (): SensorStatus => {
    if (!data.temperature && !data.humidity && !data.soilMoisture) {
      return 'error'; // No data available
    }
    
    // These thresholds would normally be configurable or data-driven
    if (
      (data.temperature && (data.temperature > 30 || data.temperature < 10)) ||
      (data.humidity && (data.humidity > 80 || data.humidity < 20)) ||
      (data.soilMoisture && data.soilMoisture < 20) ||
      data.vibration
    ) {
      return 'warning';
    }
    
    if (
      (data.temperature && (data.temperature > 35 || data.temperature < 5)) ||
      (data.humidity && (data.humidity > 90 || data.humidity < 10)) ||
      (data.soilMoisture && data.soilMoisture < 10)
    ) {
      return 'error';
    }
    
    return 'normal';
  };

  // Format timestamp for display
  const getFormattedTime = () => {
    const timestamp = data.timestamp || data.createdAt;
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'Unknown time';
    }
  };

  return (
    <div 
      className="card cursor-pointer transform transition-all duration-300 hover:translate-y-[-4px]"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-textPrimary truncate mr-2">
          {getLocationName()}
        </h3>
        <StatusBadge status={calculateStatus()} />
      </div>
      
      <div className="space-y-3 mb-4">
        {data.temperature !== undefined && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <ThermometerIcon size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-xs text-textSecondary">Temperature</div>
              <div className="font-medium text-textPrimary">{data.temperature.toFixed(1)} °C</div>
            </div>
          </div>
        )}
        
        {data.humidity !== undefined && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center mr-3">
              <Droplet size={16} className="text-info" />
            </div>
            <div>
              <div className="text-xs text-textSecondary">Humidity</div>
              <div className="font-medium text-textPrimary">{data.humidity.toFixed(1)}%</div>
            </div>
          </div>
        )}
        
        {data.soilMoisture !== undefined && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-3">
              <Gauge size={16} className="text-accent" />
            </div>
            <div>
              <div className="text-xs text-textSecondary">Soil Moisture</div>
              <div className="font-medium text-textPrimary">{data.soilMoisture.toFixed(1)}%</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center mt-auto text-xs text-textSecondary">
        <Clock size={14} className="mr-1" />
        <span>Updated {getFormattedTime()}</span>
      </div>
    </div>
  );
};

export default LocationCard;