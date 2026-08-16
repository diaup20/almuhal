import React from 'react';
import * as Icons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconProps> = ({ name, className = 'w-6 h-6', size }) => {
  // Map custom or fallback icons
  const iconMap: Record<string, React.ComponentType<any>> = {
    Truck: Icons.Truck,
    Container: Icons.BoxSelect, // Rich container icon representation
    Box: Icons.Package,
    Zap: Icons.Zap,
    Home: Icons.Home,
    Layers: Icons.Layers,
    Wind: Icons.Wind,
    Shield: Icons.Shield,
    ShieldCheck: Icons.ShieldCheck,
    Clock: Icons.Clock,
    Award: Icons.Award,
    MapPin: Icons.MapPin,
    Sparkles: Icons.Sparkles,
    Users: Icons.Users,
    Phone: Icons.Phone,
    Mail: Icons.Mail,
    CheckCircle2: Icons.CheckCircle2,
    Building2: Icons.Building2,
    Lock: Icons.Lock,
    Settings: Icons.Settings,
    FileText: Icons.FileText,
  };

  const IconComponent = iconMap[name] || (Icons as any)[name] || Icons.Truck;

  return <IconComponent className={className} size={size} />;
};
