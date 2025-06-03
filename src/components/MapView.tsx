import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';
import { PlantLocation } from '../types';
import PlantMarker from './PlantMarker';
import MapFallback from './MapFallback';

interface MapViewProps {
  plantLocations?: PlantLocation[];
  initialCenter?: { lat: number; lng: number };
  zoom?: number;
}

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '500px',
  borderRadius: '0.5rem'
};

// Default plant locations for demo purposes
const defaultPlantLocations: PlantLocation[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    lat: 28.6139,
    lng: 77.209,
    status: 'healthy',
    type: 'Indoor',
    lastUpdated: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Snake Plant',
    lat: 28.5139,
    lng: 77.309,
    status: 'warning',
    type: 'Indoor',
    lastUpdated: '15 minutes ago'
  },
  {
    id: '3',
    name: 'Fiddle Leaf Fig',
    lat: 28.7139,
    lng: 77.109,
    status: 'critical',
    type: 'Indoor',
    lastUpdated: '1 hour ago'
  },
  {
    id: '4',
    name: 'Tomato Plant',
    lat: 28.4139,
    lng: 77.409,
    status: 'healthy',
    type: 'Outdoor',
    lastUpdated: '5 minutes ago'
  }
];

const MapView = ({ 
  plantLocations = defaultPlantLocations, 
  initialCenter = { lat: 28.6139, lng: 77.209 }, 
  zoom = 10 
}: MapViewProps) => {
  // Use refs to avoid re-renders
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDZz3gYVTfavPNN3wVFnSqG0xWjMOUmnoA'
  });

  // Handle Google Maps API errors
  useEffect(() => {
    if (loadError) {
      console.error("Error loading Google Maps API:", loadError);
      // Temporarily ignore billing error for rendering map attempt
      // Check if loadError and its message property exist before accessing it
      if (loadError && typeof loadError.message === 'string' && loadError.message.includes("BillingNotEnabledMapError")) {
        console.warn("BillingNotEnabledMapError detected, attempting to render map for debugging markers anyway.");
        // Do NOT setMapError for this specific case to allow map rendering attempt
      } else {
        setMapError("Unable to load Google Maps");
      }
    }
  }, [loadError]);

  // Handle map load
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    
    try {
      // If we have plant locations, fit the map to them
      if (plantLocations.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        
        plantLocations.forEach(location => {
          bounds.extend({ lat: location.lat, lng: location.lng });
        });
        
        map.fitBounds(bounds);
        
        // Set reasonable zoom limits
        google.maps.event.addListenerOnce(map, 'idle', () => {
          const currentZoom = map.getZoom();
          if (currentZoom !== undefined) {
            if (currentZoom > 16) map.setZoom(16);
            if (currentZoom < 9) map.setZoom(9);
          }
        });
      } else {
        // If no plants, just center on the initialCenter
        map.setCenter(initialCenter);
        map.setZoom(zoom);
      }
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Error displaying map");
    }
  }, [initialCenter, plantLocations, zoom]);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  if (mapError) {
    return <MapFallback message={mapError} />;
  }

  if (!isLoaded) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white rounded-lg shadow-sm p-8">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-textSecondary">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-lg shadow-sm overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          backgroundColor: '#f0f7eb',
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }}
      >
        {plantLocations.map(plant => (
          <PlantMarker key={plant.id} plant={plant} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapView; 