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

// Plant Tweet type
export interface PlantTweet {
  id: string;
  plantId: string;
  plantName: string;
  content: string;
  emotion: 'happy' | 'angry' | 'stressed' | 'anxious';
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
}

// Analytics Data type
export interface AnalyticsData {
  plantHealth: {
    healthy: number;
    warning: number;
    critical: number;
  };
  environmentalConditions: {
    temperature: Array<{ date: string; value: number }>;
    humidity: Array<{ date: string; value: number }>;
    soilMoisture: Array<{ date: string; value: number }>;
  };
  plantEmotions: {
    happy: number;
    angry: number;
    stressed: number;
    anxious: number;
  };
  plantActivity: {
    watering: number;
    repositioning: number;
    pruning: number;
    fertilizing: number;
  };
  locationData: Array<{
    name: string;
    coordinates: { lat: number; lng: number };
    plantCount: number;
    healthStatus: { healthy: number; warning: number; critical: number };
    averageConditions: {
      temperature: number;
      humidity: number;
      soilMoisture: number;
    };
  }>;
}