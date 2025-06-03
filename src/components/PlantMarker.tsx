import { useState, useEffect } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { PlantLocation } from '../types';

interface PlantMarkerProps {
  plant: PlantLocation;
}

const PlantMarker = ({ plant }: PlantMarkerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markerRef, setMarkerRef] = useState<google.maps.Marker | null>(null);
  const navigate = useNavigate();

  // Get emoji and marker options based on plant status
  const getMarkerOptions = (status: 'healthy' | 'warning' | 'critical') => {
    // Define emoji based on status
    let emoji;
    switch (status) {
      case 'healthy':
        emoji = '🌱';
        break;
      case 'warning':
        emoji = '🌿';
        break;
      case 'critical':
        emoji = '🚨';
        break;
      default:
        emoji = '🌱';
    }

    return {
      label: {
        text: emoji,
        fontSize: '24px',
        className: 'marker-label'
      },
      // Make the marker itself transparent so only the emoji shows
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 0,
        fillOpacity: 0,
        strokeOpacity: 0
      }
    };
  };

  const navigateToPlant = () => {
    navigate(`/location/${plant.id}`);
  };

  const onMarkerLoad = (marker: google.maps.Marker) => {
    setMarkerRef(marker);
  };

  // Add a bounce animation when the marker is first created
  useEffect(() => {
    if (markerRef) {
      markerRef.setAnimation(google.maps.Animation.DROP);
    }
  }, [markerRef]);

  return (
    <>
      <Marker
        position={{ lat: plant.lat, lng: plant.lng }}
        onClick={() => setIsOpen(true)}
        {...getMarkerOptions(plant.status)}
        title={plant.name}
        onLoad={onMarkerLoad}
        zIndex={plant.status === 'critical' ? 3 : plant.status === 'warning' ? 2 : 1}
      />

      {isOpen && (
        <InfoWindow
          position={{ lat: plant.lat, lng: plant.lng }}
          onCloseClick={() => setIsOpen(false)}
        >
          <div className="p-1">
            <h3 className="font-semibold text-textPrimary mb-1">{plant.name}</h3>
            <div className="flex items-center mb-1">
              <div 
                className={`w-2 h-2 rounded-full mr-2 ${
                  plant.status === 'healthy' ? 'bg-success' : 
                  plant.status === 'warning' ? 'bg-warning' : 'bg-error'
                }`}
              />
              <span className="text-sm text-textSecondary capitalize">
                {plant.status}
              </span>
            </div>
            <p className="text-xs text-textSecondary mb-2">
              {plant.type} • Updated {plant.lastUpdated}
            </p>
            <button
              className="text-xs text-primary hover:underline"
              onClick={navigateToPlant}
            >
              View details
            </button>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default PlantMarker; 