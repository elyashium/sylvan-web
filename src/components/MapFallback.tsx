import { MapPin } from 'lucide-react';

interface MapFallbackProps {
  message?: string;
}

const MapFallback = ({ message = 'Map could not be loaded' }: MapFallbackProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-bgMain rounded-lg border border-border p-8">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4">
          <MapPin size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-medium text-textPrimary mb-2">{message}</h3>
        <p className="text-sm text-textSecondary max-w-md">
          This could be due to API key restrictions or network issues. 
          The map will display properly when these issues are resolved.
        </p>
      </div>
    </div>
  );
};

export default MapFallback; 