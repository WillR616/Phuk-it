
import { useState } from 'react';
import { Umbrella, Utensils, Music, Glass, Building, Sparkles, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/data/activities';

type CategoryItem = {
  id: Category;
  label: string;
  icon: React.ReactNode;
  color: string;
};

const categories: CategoryItem[] = [
  { 
    id: 'beach', 
    label: 'Beaches', 
    icon: <Umbrella size={22} />, 
    color: 'bg-teal-light text-teal-dark'
  },
  { 
    id: 'restaurant', 
    label: 'Food', 
    icon: <Utensils size={22} />, 
    color: 'bg-coral-light text-coral-dark'
  },
  { 
    id: 'club', 
    label: 'Clubs', 
    icon: <Music size={22} />, 
    color: 'bg-purple-100 text-purple-800'
  },
  { 
    id: 'bar', 
    label: 'Bars', 
    icon: <Glass size={22} />, 
    color: 'bg-amber-100 text-amber-800'
  },
  { 
    id: 'museum', 
    label: 'Museums', 
    icon: <Building size={22} />, 
    color: 'bg-blue-100 text-blue-800'
  },
  { 
    id: 'massage', 
    label: 'Spa', 
    icon: <Sparkles size={22} />, 
    color: 'bg-green-100 text-green-800'
  },
  { 
    id: 'local', 
    label: 'Local', 
    icon: <Landmark size={22} />, 
    color: 'bg-orange-100 text-orange-800'
  },
];

type CategorySelectorProps = {
  onSelectCategory: (category: Category | null) => void;
  selectedCategory: Category | null;
};

const CategorySelector = ({ onSelectCategory, selectedCategory }: CategorySelectorProps) => {
  return (
    <div className="w-full">
      <div className="py-3 overflow-x-auto no-scrollbar">
        <div className="flex space-x-3 px-4 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(selectedCategory === category.id ? null : category.id)}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl py-2 px-4 transition-all",
                selectedCategory === category.id 
                  ? `${category.color} shadow-md scale-105` 
                  : "bg-background shadow-sm hover:bg-muted/50"
              )}
            >
              <div className="mb-1">{category.icon}</div>
              <span className="text-xs font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
