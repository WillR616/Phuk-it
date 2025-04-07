
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Star, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { mockActivities, Activity, UserPreferences } from '@/data/activities';

const Profile = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Activity[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  
  useEffect(() => {
    // Load favorites from localStorage
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteActivities = mockActivities.filter(activity => 
      favoriteIds.includes(activity.id)
    );
    setFavorites(favoriteActivities);
    
    // Load user preferences
    const storedPreferences = localStorage.getItem('userPreferences');
    if (storedPreferences) {
      setUserPreferences(JSON.parse(storedPreferences));
    }
  }, []);
  
  const resetPreferences = () => {
    localStorage.removeItem('userPreferences');
    navigate('/', { replace: true });
  };
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="bg-primary/10 p-4 pt-8">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background/90"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h1 className="text-xl font-bold">Profile</h1>
          
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-background/90">
            <Settings size={20} />
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mb-3">
            <span className="text-2xl font-bold">G</span>
          </div>
          <h2 className="text-xl font-bold">Guest User</h2>
          <p className="text-muted-foreground">Phuket Explorer</p>
        </div>
      </div>
      
      <div className="p-5">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Heart size={20} className="mr-2" /> 
          Favorite Places
        </h2>
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {favorites.map(activity => (
              <div 
                key={activity.id}
                onClick={() => navigate(`/activity/${activity.id}`)}
                className="flex bg-muted/50 rounded-lg overflow-hidden h-24 transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <img 
                  src={activity.imageUrl}
                  alt={activity.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1 flex flex-col justify-between p-3">
                  <div>
                    <h3 className="font-medium">{activity.name}</h3>
                    <p className="text-xs text-muted-foreground">{activity.location}</p>
                  </div>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-xs">{activity.averageRating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">
            No favorites yet! Heart the places you love.
          </p>
        )}
        
        <Separator className="my-6" />
        
        <h2 className="text-lg font-semibold mb-4">Preferences</h2>
        
        {userPreferences ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Your Interests</h3>
              <div className="flex flex-wrap gap-2">
                {userPreferences.interests.map(interest => (
                  <span 
                    key={interest}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Preferred Categories</h3>
              <div className="flex flex-wrap gap-2">
                {userPreferences.preferredCategories.map(category => (
                  <span 
                    key={category}
                    className="bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full text-xs capitalize"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Budget Preference</h3>
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs">
                {"$".repeat(userPreferences.budgetPreference)}
              </span>
            </div>
            
            <div className="pt-4">
              <Button 
                variant="outline" 
                onClick={resetPreferences}
                className="w-full"
              >
                Retake Questionnaire
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">
            No preferences found.
          </p>
        )}
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive updates and recommendations</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
