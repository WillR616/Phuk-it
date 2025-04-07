
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Activity } from '@/data/activities';
import { cn } from '@/lib/utils';

type ActivityCardProps = {
  activity: Activity;
  className?: string;
  featured?: boolean;
};

const ActivityCard = ({ activity, className, featured = false }: ActivityCardProps) => {
  const navigate = useNavigate();
  const { id, name, location, priceRange, imageUrl, averageRating, category } = activity;
  
  const getPriceRangeString = (range: number) => {
    return Array(range).fill('$').join('');
  };
  
  return (
    <div 
      onClick={() => navigate(`/activity/${id}`)}
      className={cn(
        "relative rounded-2xl overflow-hidden card-shadow transition-transform hover:scale-[1.02] active:scale-[0.98]",
        featured ? "aspect-[3/2]" : "aspect-[1/1.1]",
        className
      )}
    >
      <img
        src={imageUrl}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium capitalize">
          {category}
        </div>
        
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
          <Star size={14} className="text-yellow-400 mr-1" fill="currentColor" />
          <span className="text-xs font-medium">{averageRating}</span>
        </div>
        
        <h3 className="text-white font-semibold text-lg mb-1">{name}</h3>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-white/90">
            <MapPin size={14} className="mr-1" />
            <span className="text-xs">{location}</span>
          </div>
          
          <span className="text-white/90 text-xs font-medium">
            {getPriceRangeString(priceRange)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
