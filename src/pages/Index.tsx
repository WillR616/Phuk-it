
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ActivityCard from '@/components/ActivityCard';
import CategorySelector from '@/components/CategorySelector';
import OnboardingQuestionnaire from '@/components/OnboardingQuestionnaire';
import { Activity, Category, UserPreferences, mockActivities, getRecommendedActivities } from '@/data/activities';

const Index = () => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(mockActivities);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  useEffect(() => {
    // Check if user has completed onboarding
    const storedPreferences = localStorage.getItem('userPreferences');
    if (storedPreferences) {
      const parsedPreferences = JSON.parse(storedPreferences);
      setUserPreferences(parsedPreferences);
      setShowOnboarding(false);
      
      // Apply recommendations
      const recommended = getRecommendedActivities(mockActivities, parsedPreferences);
      setActivities(recommended);
      setFilteredActivities(recommended);
    }
  }, []);
  
  useEffect(() => {
    if (selectedCategory) {
      setFilteredActivities(activities.filter(activity => activity.category === selectedCategory));
    } else {
      setFilteredActivities(activities);
    }
  }, [selectedCategory, activities]);
  
  const handleCompleteOnboarding = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    // Apply recommendations
    const recommended = getRecommendedActivities(mockActivities, preferences);
    setActivities(recommended);
    setFilteredActivities(recommended);
    
    setShowOnboarding(false);
  };
  
  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
  };
  
  if (showOnboarding) {
    return <OnboardingQuestionnaire onComplete={handleCompleteOnboarding} />;
  }
  
  const featuredActivity = filteredActivities[0];
  const remainingActivities = filteredActivities.slice(1);
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header transparent={false} />
      
      <main className="pt-20 px-4">
        <h2 className="text-2xl font-bold mb-4">
          {selectedCategory 
            ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Experiences` 
            : 'Recommended for You'}
        </h2>
        
        <CategorySelector 
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        
        <div className="mt-4">
          {featuredActivity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ActivityCard 
                activity={featuredActivity} 
                featured={true} 
                className="w-full"
              />
            </motion.div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            {remainingActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
              >
                <ActivityCard activity={activity} />
              </motion.div>
            ))}
          </div>
          
          {filteredActivities.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground">No activities found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
