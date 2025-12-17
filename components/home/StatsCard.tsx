import { Card, CardContent } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  iconColor?: string;
}

export default function StatsCard({
  icon: Icon,
  title,
  value,
  subtitle,
  iconColor = "text-primary",
}: StatsCardProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-text-secondary mb-1">{title}</p>
            <p className="text-2xl font-bold text-text mb-0.5">{value}</p>
            {subtitle && (
              <p className="text-xs text-text-secondary">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-lg bg-primary/10 ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

