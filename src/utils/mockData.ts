import { SensorReading, PlantTweet, AnalyticsData } from '../types';

// Mock data for sensor readings
export const mockSensorData: SensorReading[] = [
  {
    _id: '683c9c4e8b509b8198b641fb',
    temperature: 24.6,
    humidity: 45.8,
    soilMoisture: 38,
    vibration: false,
    gps: { lat: 28.6139, lng: 77.209 },
    createdAt: '2025-06-01T18:30:38.006Z',
    updatedAt: '2025-06-01T18:30:38.006Z',
    __v: 0
  },
  {
    _id: '682c205a231b049790f55e96',
    temperature: 26.4,
    humidity: 55.2,
    soilMoisture: 42,
    vibration: true,
    gps: { lat: 28.5139, lng: 77.309 },
    createdAt: '2025-05-20T06:25:30.682Z',
    updatedAt: '2025-05-20T06:25:30.682Z',
    __v: 0
  },
  {
    _id: '682c19fd2249cda57539e564',
    temperature: 32.1,
    humidity: 35.5,
    soilMoisture: 18,
    vibration: false,
    location: { latitude: 28.7139, longitude: 77.109 },
    timestamp: '2025-05-20T05:58:21.715Z',
    createdAt: '2025-05-20T05:58:21.716Z',
    updatedAt: '2025-05-20T05:58:21.716Z',
    __v: 0
  },
  {
    _id: '682c19fd2249cda57539e565',
    temperature: 22.3,
    humidity: 62.7,
    soilMoisture: 45,
    vibration: false,
    location: { latitude: 28.4139, longitude: 77.409 },
    timestamp: '2025-05-19T14:23:11.315Z',
    createdAt: '2025-05-19T14:23:11.316Z',
    updatedAt: '2025-05-19T14:23:11.316Z',
    __v: 0
  },
  {
    _id: '682c19fd2249cda57539e566',
    temperature: 18.9,
    humidity: 70.2,
    soilMoisture: 60,
    vibration: false,
    gps: { lat: 28.3139, lng: 77.509 },
    createdAt: '2025-05-18T09:45:20.121Z',
    updatedAt: '2025-05-18T09:45:20.121Z',
    __v: 0
  },
  {
    _id: '682c19fd2249cda57539e567',
    temperature: 29.5,
    humidity: 40.8,
    soilMoisture: 25,
    vibration: true,
    location: { latitude: 28.8139, longitude: 77.009 },
    timestamp: '2025-05-17T11:32:45.518Z',
    createdAt: '2025-05-17T11:32:45.519Z',
    updatedAt: '2025-05-17T11:32:45.519Z',
    __v: 0
  }
];

// Function to get a specific sensor reading by ID
export const getSensorById = (id: string): SensorReading | undefined => {
  return mockSensorData.find(sensor => sensor._id === id);
};

// Mock plant tweets with emotions
export const mockPlantTweets: PlantTweet[] = [
  {
    id: '1',
    plantId: '683c9c4e8b509b8198b641fb',
    plantName: 'Monstera Deliciosa',
    content: "I'm feeling great today! My soil moisture is perfect and I'm getting just the right amount of light.",
    emotion: 'happy',
    timestamp: '2025-06-01T19:30:38.006Z',
    location: { lat: 28.6139, lng: 77.209 }
  },
  {
    id: '2',
    plantId: '682c205a231b049790f55e96',
    plantName: 'Snake Plant',
    content: "Someone just moved me and I don't like it! I was perfectly happy where I was before.",
    emotion: 'angry',
    timestamp: '2025-05-20T07:25:30.682Z',
    location: { lat: 28.5139, lng: 77.309 }
  },
  {
    id: '3',
    plantId: '682c19fd2249cda57539e564',
    plantName: 'Fiddle Leaf Fig',
    content: "It's way too hot in here and I'm getting thirsty. Could someone please water me soon?",
    emotion: 'stressed',
    timestamp: '2025-05-20T06:58:21.715Z',
    location: { lat: 28.7139, lng: 77.109 }
  },
  {
    id: '4',
    plantId: '682c19fd2249cda57539e565',
    plantName: 'Peace Lily',
    content: "Just got watered and feeling refreshed! Thanks for taking care of me.",
    emotion: 'happy',
    timestamp: '2025-05-19T15:23:11.315Z',
    location: { lat: 28.4139, lng: 77.409 }
  },
  {
    id: '5',
    plantId: '682c19fd2249cda57539e566',
    plantName: 'Boston Fern',
    content: "The humidity is perfect today. I'm in plant heaven!",
    emotion: 'happy',
    timestamp: '2025-05-18T10:45:20.121Z',
    location: { lat: 28.3139, lng: 77.509 }
  },
  {
    id: '6',
    plantId: '682c19fd2249cda57539e567',
    plantName: 'Cactus',
    content: "Someone keeps touching my spines. STOP IT! I'm not a toy!",
    emotion: 'angry',
    timestamp: '2025-05-17T12:32:45.518Z',
    location: { lat: 28.8139, lng: 77.009 }
  },
  {
    id: '7',
    plantId: '683c9c4e8b509b8198b641fb',
    plantName: 'Monstera Deliciosa',
    content: "I'm feeling a bit crowded. Could someone trim my neighbors?",
    emotion: 'anxious',
    timestamp: '2025-05-30T14:15:22.006Z',
    location: { lat: 28.6139, lng: 77.209 }
  },
  {
    id: '8',
    plantId: '682c19fd2249cda57539e565',
    plantName: 'Peace Lily',
    content: "My leaves are drooping. I need water ASAP!",
    emotion: 'stressed',
    timestamp: '2025-05-18T09:10:33.315Z',
    location: { lat: 28.4139, lng: 77.409 }
  }
];

// Mock analytics data
export const mockAnalyticsData: AnalyticsData = {
  plantHealth: {
    healthy: 3,
    warning: 2,
    critical: 1
  },
  environmentalConditions: {
    temperature: [
      { date: '2025-05-15', value: 23.5 },
      { date: '2025-05-16', value: 24.2 },
      { date: '2025-05-17', value: 25.1 },
      { date: '2025-05-18', value: 24.8 },
      { date: '2025-05-19', value: 23.9 },
      { date: '2025-05-20', value: 24.5 },
      { date: '2025-06-01', value: 25.2 }
    ],
    humidity: [
      { date: '2025-05-15', value: 48.2 },
      { date: '2025-05-16', value: 50.1 },
      { date: '2025-05-17', value: 47.8 },
      { date: '2025-05-18', value: 52.3 },
      { date: '2025-05-19', value: 55.6 },
      { date: '2025-05-20', value: 53.4 },
      { date: '2025-06-01', value: 51.9 }
    ],
    soilMoisture: [
      { date: '2025-05-15', value: 42.1 },
      { date: '2025-05-16', value: 38.7 },
      { date: '2025-05-17', value: 35.2 },
      { date: '2025-05-18', value: 45.6 },
      { date: '2025-05-19', value: 43.8 },
      { date: '2025-05-20', value: 40.2 },
      { date: '2025-06-01', value: 41.5 }
    ]
  },
  plantEmotions: {
    happy: 3,
    angry: 2,
    stressed: 2,
    anxious: 1
  },
  plantActivity: {
    watering: 12,
    repositioning: 5,
    pruning: 3,
    fertilizing: 2
  },
  locationData: [
    {
      name: "Home Garden",
      coordinates: { lat: 28.6139, lng: 77.209 },
      plantCount: 3,
      healthStatus: { healthy: 2, warning: 1, critical: 0 },
      averageConditions: {
        temperature: 24.6,
        humidity: 45.8,
        soilMoisture: 38
      }
    },
    {
      name: "Office Space",
      coordinates: { lat: 28.5139, lng: 77.309 },
      plantCount: 2,
      healthStatus: { healthy: 1, warning: 0, critical: 1 },
      averageConditions: {
        temperature: 26.4,
        humidity: 55.2,
        soilMoisture: 42
      }
    },
    {
      name: "Balcony",
      coordinates: { lat: 28.7139, lng: 77.109 },
      plantCount: 4,
      healthStatus: { healthy: 0, warning: 3, critical: 1 },
      averageConditions: {
        temperature: 30.1,
        humidity: 35.5,
        soilMoisture: 18
      }
    },
    {
      name: "Living Room",
      coordinates: { lat: 28.4139, lng: 77.409 },
      plantCount: 5,
      healthStatus: { healthy: 3, warning: 2, critical: 0 },
      averageConditions: {
        temperature: 22.3,
        humidity: 62.7,
        soilMoisture: 45
      }
    }
  ]
};