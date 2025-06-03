import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { StatusBadgeProps } from '../types';

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'normal':
        return {
          icon: <CheckCircle size={14} />,
          label: 'Normal',
          bgColor: 'bg-success/10',
          textColor: 'text-success',
        };
      case 'warning':
        return {
          icon: <AlertTriangle size={14} />,
          label: 'Attention Needed',
          bgColor: 'bg-warning/10',
          textColor: 'text-warning',
        };
      case 'error':
        return {
          icon: <AlertCircle size={14} />,
          label: 'Critical Alert',
          bgColor: 'bg-error/10',
          textColor: 'text-error',
        };
      default:
        return {
          icon: <CheckCircle size={14} />,
          label: 'Normal',
          bgColor: 'bg-success/10',
          textColor: 'text-success',
        };
    }
  };

  const { icon, label, bgColor, textColor } = getStatusConfig();

  return (
    <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${bgColor} ${textColor}`}>
      {icon}
      <span className="ml-1">{label}</span>
    </div>
  );
};

export default StatusBadge;