import { Snowflake, Car, Droplet, Stethoscope, Wifi } from "lucide-react";
import { Amenity } from "@/types";

interface AmenitiesProps {
  amenities: Amenity[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  snowflake: Snowflake,
  car: Car,
  droplet: Droplet,
  stethoscope: Stethoscope,
  wifi: Wifi,
};

export default function Amenities({ amenities }: AmenitiesProps) {
  return (
    <div className={`grid gap-4 ${amenities.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
      {amenities.map((amenity) => {
        const IconComponent = iconMap[amenity.icon] || Snowflake;
        return (
          <div
            key={amenity.id}
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background-light"
          >
            <IconComponent className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium text-text">{amenity.name}</span>
          </div>
        );
      })}
    </div>
  );
}

