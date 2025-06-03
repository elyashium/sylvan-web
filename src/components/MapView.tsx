import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';
import { PlantLocation } from '../types';
import PlantMarker from './PlantMarker';

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
    lat: 37.7749,
    lng: -122.4194,
    status: 'healthy',
    type: 'Indoor',
    lastUpdated: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Snake Plant',
    lat: 37.7695,
    lng: -122.4268,
    status: 'warning',
    type: 'Indoor',
    lastUpdated: '15 minutes ago'
  },
  {
    id: '3',
    name: 'Fiddle Leaf Fig',
    lat: 37.7835,
    lng: -122.4089,
    status: 'critical',
    type: 'Indoor',
    lastUpdated: '1 hour ago'
  },
  {
    id: '4',
    name: 'Tomato Plant',
    lat: 37.7845,
    lng: -122.4300,
    status: 'healthy',
    type: 'Outdoor',
    lastUpdated: '5 minutes ago'
  }
];

const MapView = ({ 
  plantLocations = defaultPlantLocations, 
  initialCenter = { lat: 37.7749, lng: -122.4194 }, 
  zoom = 13 
}: MapViewProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(initialCenter);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDZz3gYVTfavPNN3wVFnSqG0xWjMOUmnoA'
  });

  // Calculate center from plant locations
  const calculateCenter = useCallback((locations: PlantLocation[]) => {
    if (locations.length === 0) return initialCenter;
    
    // If there's only one location, center on it
    if (locations.length === 1) {
      return { lat: locations[0].lat, lng: locations[0].lng };
    }
    
    // Calculate the center of all locations
    let totalLat = 0;
    let totalLng = 0;
    
    locations.forEach(location => {
      totalLat += location.lat;
      totalLng += location.lng;
    });
    
    return {
      lat: totalLat / locations.length,
      lng: totalLng / locations.length
    };
  }, [initialCenter]);

  // Update center when plant locations change
  useEffect(() => {
    if (plantLocations.length > 0) {
      const newCenter = calculateCenter(plantLocations);
      setMapCenter(newCenter);
    }
  }, [plantLocations, calculateCenter]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);

    // Fit map to markers if there are any
    if (plantLocations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      plantLocations.forEach(location => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });
      
      // Use fitBounds with a slight delay to ensure it works properly
      setTimeout(() => {
        map.fitBounds(bounds);
        
        // Don't zoom in too far
        const listener = google.maps.event.addListener(map, 'idle', () => {
          if (map.getZoom() > 16) map.setZoom(16);
          google.maps.event.removeListener(listener);
        });
      }, 100);
    } else {
      // If no plants, just center on the initialCenter
      map.setCenter(initialCenter);
      map.setZoom(zoom);
    }
  }, [plantLocations, initialCenter, zoom]);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
    setMap(null);
  }, []);

  // If the map exists and plant locations change, update the map bounds
  useEffect(() => {
    if (map && plantLocations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      plantLocations.forEach(location => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });
      
      // Use fitBounds with a slight delay to ensure it works properly
      setTimeout(() => {
        map.fitBounds(bounds);
      }, 100);
    }
  }, [map, plantLocations]);

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
        center={mapCenter}
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
          fullscreenControl: true
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