import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { SensorReading } from '../types';

interface MapProps {
  sensors: SensorReading[];
  onMarkerClick?: (sensor: SensorReading) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

const SensorMap = ({ 
  sensors, 
  onMarkerClick, 
  center,
  zoom = 10,
  height = '400px'
}: MapProps) => {
  const [selectedSensor, setSelectedSensor] = useState<SensorReading | null>(null);
  
  // Initialize Google Maps
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_API_KEY_HERE' // In production, use environment variable
  });

  // Calculate map center if not provided
  const mapCenter = center || calculateCenter();

  function calculateCenter() {
    if (sensors.length === 0) {
      return { lat: 28.6139, lng: 77.209 }; // Default center
    }
    
    // Calculate the average of all coordinates
    let sumLat = 0;
    let sumLng = 0;
    let count = 0;
    
    sensors.forEach(sensor => {
      if (sensor.gps) {
        sumLat += sensor.gps.lat;
        sumLng += sensor.gps.lng;
        count++;
      } else if (sensor.location) {
        sumLat += sensor.location.latitude;
        sumLng += sensor.location.longitude;
        count++;
      }
    });
    
    return count > 0 
      ? { lat: sumLat / count, lng: sumLng / count }
      : { lat: 28.6139, lng: 77.209 }; // Default if no valid coordinates
  }

  // Get marker position from sensor data
  const getMarkerPosition = (sensor: SensorReading) => {
    if (sensor.gps) {
      return { lat: sensor.gps.lat, lng: sensor.gps.lng };
    } else if (sensor.location) {
      return { lat: sensor.location.latitude, lng: sensor.location.longitude };
    }
    return null;
  };

  // Determine marker color based on sensor status
  const getMarkerIcon = (sensor: SensorReading) => {
    // Calculate status for marker color
    const hasWarning = 
      (sensor.temperature && (sensor.temperature > 30 || sensor.temperature < 10)) ||
      (sensor.humidity && (sensor.humidity > 80 || sensor.humidity < 20)) ||
      (sensor.soilMoisture && sensor.soilMoisture < 20) ||
      sensor.vibration;
    
    const hasError = 
      (sensor.temperature && (sensor.temperature > 35 || sensor.temperature < 5)) ||
      (sensor.humidity && (sensor.humidity > 90 || sensor.humidity < 10)) ||
      (sensor.soilMoisture && sensor.soilMoisture < 10);
    
    if (hasError) {
      return {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#F87171", // Error color
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 1.5
      };
    } else if (hasWarning) {
      return {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#FBBF24", // Warning color
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 1.5
      };
    } else {
      return {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#34D399", // Success color
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 1.5
      };
    }
  };

  const handleMarkerClick = (sensor: SensorReading) => {
    setSelectedSensor(sensor);
    if (onMarkerClick) {
      onMarkerClick(sensor);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg border border-border bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <span className="ml-2 text-textSecondary">Loading map...</span>
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%' }}>
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%', borderRadius: '8px' }}
        center={mapCenter}
        zoom={zoom}
        options={{
          styles: [
            {
              featureType: 'administrative',
              elementType: 'geometry',
              stylers: [{ visibility: 'simplified' }]
            },
            {
              featureType: 'landscape',
              elementType: 'all',
              stylers: [{ lightness: 20 }]
            }
          ],
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {sensors.map(sensor => {
          const position = getMarkerPosition(sensor);
          if (!position) return null;
          
          return (
            <Marker
              key={sensor._id}
              position={position}
              icon={getMarkerIcon(sensor)}
              onClick={() => handleMarkerClick(sensor)}
            />
          );
        })}
        
        {selectedSensor && (
          <InfoWindow
            position={getMarkerPosition(selectedSensor) || undefined}
            onCloseClick={() => setSelectedSensor(null)}
          >
            <div className="max-w-xs p-1">
              <h3 className="mb-1 font-medium">Sensor Details</h3>
              {selectedSensor.temperature !== undefined && (
                <p className="text-sm">Temperature: {selectedSensor.temperature.toFixed(1)}°C</p>
              )}
              {selectedSensor.humidity !== undefined && (
                <p className="text-sm">Humidity: {selectedSensor.humidity.toFixed(1)}%</p>
              )}
              {selectedSensor.soilMoisture !== undefined && (
                <p className="text-sm">Soil Moisture: {selectedSensor.soilMoisture.toFixed(1)}%</p>
              )}
              {selectedSensor.vibration !== undefined && (
                <p className="text-sm">Vibration: {selectedSensor.vibration ? 'Yes' : 'No'}</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default SensorMap;