import { SensorReading } from '../types';

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