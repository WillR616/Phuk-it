
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Star, Heart } from 'lucide-react';
import { Activity, mockActivities } from '@/data/activities';
import ReviewForm from '@/components/ReviewForm';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const ActivityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Simulate fetching data
    const fetchActivity = () => {
      setLoading(true);
      setTimeout(() => {
        const foundActivity = mockActivities.find(a => a.id === id);
        if (foundActivity) {
          setActivity(foundActivity);
          
          // Check if activity is in favorites
          const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
          setIsFavorite(favorites.includes(foundActivity.id));
        }
        setLoading(false);
      }, 500);
    };
    
    fetchActivity();
  }, [id]);
  
  const handleReviewSubmit = (rating: number, review: string) => {
    if (!activity) return;
    
    const newRating = {
      userId: 'currentUser',
      rating,
      review,
      date: new Date()
    };
    
    const updatedRatings = [...activity.ratings, newRating];
    const updatedAverageRating = updatedRatings.reduce((sum, r) => sum + r.rating, 0) / updatedRatings.length;
    
    setActivity({
      ...activity,
      ratings: updatedRatings,
      averageRating: Number(updatedAverageRating.toFixed(2))
    });
  };
  
  const toggleFavorite = () => {
    if (!activity) return;
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((favId: string) => favId !== activity.id);
    } else {
      newFavorites = [...favorites, activity.id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Activity not found</h1>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[40vh]">
        <img 
          src={activity.imageUrl}
          alt={activity.name}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-sm"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          
          <button 
            onClick={toggleFavorite}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-sm"
          >
            <Heart 
              size={22} 
              className={cn(
                isFavorite ? "fill-coral-DEFAULT text-coral-DEFAULT" : "text-white"
              )} 
            />
          </button>
        </div>
      </div>
      
      <div className="p-5 -mt-6 rounded-t-3xl bg-background relative">
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-2xl font-bold">{activity.name}</h1>
          
          <div className="flex items-center bg-muted px-2 py-1 rounded-lg">
            <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-medium">{activity.averageRating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin size={16} className="mr-1" />
          <span>{activity.location}</span>
          <div className="mx-2">•</div>
          <span className="capitalize">{activity.category}</span>
          <div className="mx-2">•</div>
          <span>{"$".repeat(activity.priceRange)}</span>
        </div>
        
        <p className="mb-6 text-foreground/80 leading-relaxed">
          {activity.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {activity.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-muted px-3 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Separator className="my-6" />
        
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-4">Reviews</h2>
          
          {activity.ratings.length > 0 ? (
            <div className="space-y-4">
              {activity.ratings.map((rating, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {rating.userId.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="ml-2 font-medium">
                        User {rating.userId.replace('user', '')}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm">{rating.rating}</span>
                    </div>
                  </div>
                  
                  {rating.review && (
                    <p className="text-sm text-foreground/80">{rating.review}</p>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(rating.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No reviews yet.</p>
          )}
        </div>
        
        <ReviewForm onSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
};

export default ActivityDetails;
