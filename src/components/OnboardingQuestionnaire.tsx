
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Category, interestTags, UserPreferences } from '@/data/activities';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type OnboardingQuestionnaireContinueProps = {
  onComplete: (preferences: UserPreferences) => void;
};

const initialPreferences: UserPreferences = {
  interests: [],
  preferredCategories: [],
  budgetPreference: 2,
  completed: false
};

const OnboardingQuestionnaire = ({ onComplete }: OnboardingQuestionnaireContinueProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  
  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      
      return { ...prev, interests };
    });
  };
  
  const handleCategoryToggle = (category: Category) => {
    setPreferences(prev => {
      const preferredCategories = prev.preferredCategories.includes(category)
        ? prev.preferredCategories.filter(c => c !== category)
        : [...prev.preferredCategories, category];
      
      return { ...prev, preferredCategories };
    });
  };
  
  const handleBudgetChange = (budget: number) => {
    setPreferences(prev => ({ ...prev, budgetPreference: budget }));
  };
  
  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete({ ...preferences, completed: true });
    }
  };
  
  const steps = [
    {
      title: "What interests you?",
      description: "Select all that apply to personalize your experience",
      content: (
        <div className="flex flex-wrap gap-2 mt-6">
          {interestTags.map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all",
                preferences.interests.includes(interest)
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {interest}
            </button>
          ))}
        </div>
      )
    },
    {
      title: "What places do you want to discover?",
      description: "Choose categories that interest you most",
      content: (
        <div className="grid grid-cols-2 gap-3 mt-6">
          {['restaurant', 'beach', 'club', 'bar', 'massage', 'museum', 'local'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category as Category)}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all",
                preferences.preferredCategories.includes(category as Category)
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              <span className="capitalize">{category}</span>
              {preferences.preferredCategories.includes(category as Category) && (
                <Check size={16} />
              )}
            </button>
          ))}
        </div>
      )
    },
    {
      title: "What's your budget?",
      description: "This helps us recommend places that fit your spending preferences",
      content: (
        <div className="space-y-4 mt-6">
          {[
            { value: 1, label: "Budget friendly ($)" },
            { value: 2, label: "Mid-range ($$)" },
            { value: 3, label: "Luxury ($$$)" }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleBudgetChange(option.value)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-4 rounded-lg text-left transition-all",
                preferences.budgetPreference === option.value
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              <span>{option.label}</span>
              {preferences.budgetPreference === option.value && (
                <Check size={16} />
              )}
            </button>
          ))}
        </div>
      )
    }
  ];
  
  const currentStepData = steps[currentStep];
  
  return (
    <div className="flex flex-col min-h-[85vh] px-6">
      <motion.div 
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col"
      >
        <h1 className="text-2xl font-bold mt-6">{currentStepData.title}</h1>
        <p className="text-muted-foreground mt-2">{currentStepData.description}</p>
        
        <div className="flex-1">
          {currentStepData.content}
        </div>
      </motion.div>
      
      <div className="sticky bottom-6 w-full mt-6">
        <div className="flex gap-2 mb-4">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1 flex-1 rounded-full",
                i === currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
        
        <Button 
          onClick={handleNext}
          disabled={
            (currentStep === 0 && preferences.interests.length === 0) ||
            (currentStep === 1 && preferences.preferredCategories.length === 0)
          }
          className="w-full"
          size="lg"
        >
          {currentStep < 2 ? "Continue" : "Find My Activities"}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;
