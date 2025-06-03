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