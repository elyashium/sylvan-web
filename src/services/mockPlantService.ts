import { PlantLocation, PlantDetails } from '../types';

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
  },
  '3': {
    id: '3',
    name: 'Fiddle Leaf Fig',
    type: 'Indoor',
    species: 'Ficus lyrata',
    location: {
      name: 'Office',
      lat: 37.7835,
      lng: -122.4089
    },
    status: 'critical',
    lastWatered: '2023-05-25T09:00:00Z',
    nextWatering: '2023-06-01T09:00:00Z',
    sensorData: {
      timestamp: '2023-06-15T14:30:00Z',
      temperature: 26.1,
      humidity: 30,
      soilMoisture: 15,
      lightLevel: 350,
      waterLevel: 10
    },
    tweets: [
      {
        content: "HELP! I'm so thirsty I can barely photosynthesize! #Dying #NeedWater",
        timestamp: '2023-06-15T07:30:00Z'
      },
      {
        content: "My leaves are drooping. Is anyone even paying attention? #PlantNeglect",
        timestamp: '2023-06-13T16:45:00Z'
      }
    ],
    history: [
      {
        date: '2023-05-25',
        event: 'Watered'
      },
      {
        date: '2023-05-18',
        event: 'Watered'
      },
      {
        date: '2023-05-05',
        event: 'Repotted'
      }
    ]
  },
  '4': {
    id: '4',
    name: 'Tomato Plant',
    type: 'Outdoor',
    species: 'Solanum lycopersicum',
    location: {
      name: 'Garden',
      lat: 37.7845,
      lng: -122.4300
    },
    status: 'healthy',
    lastWatered: '2023-06-14T08:00:00Z',
    nextWatering: '2023-06-16T08:00:00Z',
    sensorData: {
      timestamp: '2023-06-15T14:30:00Z',
      temperature: 23.8,
      humidity: 55,
      soilMoisture: 65,
      lightLevel: 1200,
      waterLevel: 80
    },
    tweets: [
      {
        content: "Soaking up the sun and growing some delicious tomatoes! #GardenLife",
        timestamp: '2023-06-15T11:20:00Z'
      },
      {
        content: "Rain yesterday was refreshing. Ready for another sunny day! #HappyPlant",
        timestamp: '2023-06-14T09:15:00Z'
      }
    ],
    history: [
      {
        date: '2023-06-14',
        event: 'Watered'
      },
      {
        date: '2023-06-10',
        event: 'Fertilized'
      },
      {
        date: '2023-06-07',
        event: 'Watered'
      }
    ]
  }
};

// Get all plant locations - synchronous version
export const getMockPlantLocations = (): PlantLocation[] => {
  return [...mockPlantLocations];
};

// Get plant details by ID - synchronous version
export const getMockPlantDetails = (id: string): PlantDetails | null => {
  return mockPlantDetails[id] || null;
};

// Export for direct use without async/await
export default {
  plantLocations: mockPlantLocations,
  plantDetails: mockPlantDetails
}; 