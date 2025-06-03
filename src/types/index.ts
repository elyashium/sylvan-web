export interface SensorReading {
  _id: string;
  temperature?: number;
  humidity?: number;
  soilMoisture?: number;
  vibration?: boolean;
  gps?: {
    lat: number;
    lng: number;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  timestamp?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LocationCardProps {
  data: SensorReading;
  onClick: () => void;
}

export type SensorStatus = 'normal' | 'warning' | 'error';

export interface StatusBadgeProps {
  status: SensorStatus;
}

// Plant types
export interface PlantLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'healthy' | 'warning' | 'critical';
  type: string;
  lastUpdated: string;
}

// Sensor data types
export interface SensorData {
  timestamp: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightLevel: number;
  waterLevel: number;
}

// Plant details type
export interface PlantDetails {
  id: string;
  name: string;
  type: string;
  species: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  status: 'healthy' | 'warning' | 'critical';
  lastWatered: string;
  nextWatering: string;
  sensorData: SensorData;
  tweets: {
    content: string;
    timestamp: string;
  }[];
  history: {
    date: string;
    event: string;
  }[];
}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'household' | 'commercial';
}