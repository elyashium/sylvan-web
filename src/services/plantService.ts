import { PlantLocation, PlantDetails } from '../types';
import { mockSensorData } from '../utils/mockData';

// Mock plant locations data
const mockPlantLocations: PlantLocation[] = [
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
  },
  {
    id: '5',
    name: 'Basil',
    lat: 37.7855,
    lng: -122.4100,
    status: 'warning',
    type: 'Outdoor',
    lastUpdated: '30 minutes ago'
  },
  {
    id: '6',
    name: 'Peace Lily',
    lat: 37.7775,
    lng: -122.4150,
    status: 'healthy',
    type: 'Indoor',
    lastUpdated: '10 minutes ago'
  }
];

// Add sensor data IDs to support dashboard links
const sensorDataPlantLocations = mockSensorData.map(sensor => {
  const location = sensor.gps || (sensor.location ? { lat: sensor.location.latitude, lng: sensor.location.longitude } : null);
  if (!location) return null;
  
  return {
    id: sensor._id,
    name: `Plant at ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
    lat: location.lat,
    lng: location.lng,
    status: sensor.temperature && sensor.temperature > 30 ? 'warning' : 
           sensor.soilMoisture && sensor.soilMoisture < 20 ? 'critical' : 'healthy',
    type: 'Sensor Plant',
    lastUpdated: '5 minutes ago'
  } as PlantLocation;
}).filter(Boolean) as PlantLocation[];

// Combine both location sets
const allPlantLocations = [...mockPlantLocations, ...sensorDataPlantLocations];

// Mock plant details data
const mockPlantDetails: Record<string, PlantDetails> = {
  '1': {
    id: '1',
    name: 'Monstera Deliciosa',
    type: 'Indoor',
    species: 'Monstera deliciosa',
    location: {
      name: 'Living Room',
      lat: 37.7749,
      lng: -122.4194
    },
    status: 'healthy',
    lastWatered: '2023-06-15T08:30:00Z',
    nextWatering: '2023-06-18T08:30:00Z',
    sensorData: {
      timestamp: '2023-06-15T14:30:00Z',
      temperature: 22.5,
      humidity: 65,
      soilMoisture: 78,
      lightLevel: 850,
      waterLevel: 68
    },
    tweets: [
      {
        content: "Feeling pretty good today! My human remembered to water me on time. #PlantLife",
        timestamp: '2023-06-15T09:00:00Z'
      },
      {
        content: "Getting some nice indirect sunlight. Perfect for showing off my new leaf! #GrowthSpurt",
        timestamp: '2023-06-14T11:30:00Z'
      }
    ],
    history: [
      {
        date: '2023-06-15',
        event: 'Watered'
      },
      {
        date: '2023-06-10',
        event: 'Fertilized'
      },
      {
        date: '2023-06-08',
        event: 'Watered'
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Snake Plant',
    type: 'Indoor',
    species: 'Sansevieria trifasciata',
    location: {
      name: 'Bedroom',
      lat: 37.7695,
      lng: -122.4268
    },
    status: 'warning',
    lastWatered: '2023-06-01T10:15:00Z',
    nextWatering: '2023-06-16T10:15:00Z',
    sensorData: {
      timestamp: '2023-06-15T14:30:00Z',
      temperature: 24.2,
      humidity: 45,
      soilMoisture: 32,
      lightLevel: 550,
      waterLevel: 35
    },
    tweets: [
      {
        content: "Is anyone going to water me soon or should I just give up? #Thirsty",
        timestamp: '2023-06-15T08:45:00Z'
      },
      {
        content: "I'm a snake plant. I can survive neglect, but that doesn't mean I enjoy it. #PlantNeglect",
        timestamp: '2023-06-12T14:20:00Z'
      }
    ],
    history: [
      {
        date: '2023-06-01',
        event: 'Watered'
      },
      {
        date: '2023-05-15',
        event: 'Watered'
      },
      {
        date: '2023-05-10',
        event: 'Repotted'
      }
    ]
  }
};

// Add sensor data plant details
mockSensorData.forEach(sensor => {
  const location = sensor.gps || (sensor.location ? { lat: sensor.location.latitude, lng: sensor.location.longitude } : null);
  if (!location) return;
  
  mockPlantDetails[sensor._id] = {
    id: sensor._id,
    name: `Sensor Plant ${sensor._id.substring(0, 6)}`,
    type: 'Sensor Plant',
    species: 'Unknown Species',
    location: {
      name: `Location at ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
      lat: location.lat,
      lng: location.lng
    },
    status: sensor.temperature && sensor.temperature > 30 ? 'warning' : 
           sensor.soilMoisture && sensor.soilMoisture < 20 ? 'critical' : 'healthy',
    lastWatered: sensor.createdAt,
    nextWatering: new Date(new Date(sensor.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    sensorData: {
      timestamp: sensor.timestamp || sensor.createdAt,
      temperature: sensor.temperature || 22,
      humidity: sensor.humidity || 50,
      soilMoisture: sensor.soilMoisture || 40,
      lightLevel: 800,
      waterLevel: 50
    },
    tweets: [
      {
        content: "I'm a sensor plant reporting my data!",
        timestamp: sensor.createdAt
      }
    ],
    history: [
      {
        date: new Date(sensor.createdAt).toISOString().split('T')[0],
        event: 'Sensor Installed'
      }
    ]
  };
});

// Get all plant locations
export const getPlantLocations = async (): Promise<PlantLocation[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allPlantLocations);
    }, 500);
  });
};

// Get plant details by ID
export const getPlantDetails = async (id: string): Promise<PlantDetails> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const plant = mockPlantDetails[id];
      if (plant) {
        resolve(plant);
      } else {
        reject(new Error(`Plant with ID ${id} not found`));
      }
    }, 500);
  });
};

// Add a new plant
export const addPlant = async (plant: Omit<PlantLocation, 'id'>): Promise<PlantLocation> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPlant: PlantLocation = {
        ...plant,
        id: `${mockPlantLocations.length + 1}`
      };
      resolve(newPlant);
    }, 500);
  });
};

// Update plant status
export const updatePlantStatus = async (
  id: string, 
  status: 'healthy' | 'warning' | 'critical'
): Promise<PlantLocation> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const plantIndex = mockPlantLocations.findIndex(plant => plant.id === id);
      if (plantIndex !== -1) {
        const updatedPlant = {
          ...mockPlantLocations[plantIndex],
          status,
          lastUpdated: 'just now'
        };
        resolve(updatedPlant);
      } else {
        reject(new Error(`Plant with ID ${id} not found`));
      }
    }, 500);
  });
}; 