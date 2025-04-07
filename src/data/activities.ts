
export type Category = 
  | 'restaurant' 
  | 'beach' 
  | 'club' 
  | 'bar' 
  | 'massage' 
  | 'museum' 
  | 'local';

export type ActivityRating = {
  userId: string;
  rating: number;
  review?: string;
  date: Date;
};

export type Activity = {
  id: string;
  name: string;
  description: string;
  category: Category;
  location: string;
  priceRange: 1 | 2 | 3;  // 1 = $, 2 = $$, 3 = $$$
  imageUrl: string;
  tags: string[];
  ratings: ActivityRating[];
  averageRating: number;
};

// Tags for preference matching
export const interestTags = [
  'relaxing', 'exciting', 'romantic', 'adventure', 'cultural',
  'nightlife', 'family-friendly', 'luxury', 'budget', 'food',
  'drinks', 'nature', 'water', 'shopping', 'wellness',
  'music', 'art', 'history', 'local experience'
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    name: 'Banana Beach Club',
    description: 'Trendy beach club with lounge beds, cocktails, and a Mediterranean-inspired menu. Perfect for watching the sunset with a drink in hand.',
    category: 'beach',
    location: 'Bangtao Beach',
    priceRange: 2,
    imageUrl: 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb',
    tags: ['relaxing', 'drinks', 'water', 'luxury', 'romantic'],
    ratings: [
      { userId: 'user1', rating: 4.5, review: 'Great atmosphere and amazing sunset views!', date: new Date('2023-11-15') },
      { userId: 'user2', rating: 5, review: 'The cocktails were incredible!', date: new Date('2023-12-03') }
    ],
    averageRating: 4.75
  },
  {
    id: '2',
    name: 'Blue Elephant Restaurant',
    description: 'Authentic Thai cuisine in a beautiful colonial mansion. Their cooking classes are also highly recommended.',
    category: 'restaurant',
    location: 'Phuket Town',
    priceRange: 3,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    tags: ['food', 'cultural', 'luxury', 'romantic'],
    ratings: [
      { userId: 'user1', rating: 5, review: 'The best Thai food I\'ve ever had!', date: new Date('2023-10-28') },
      { userId: 'user3', rating: 4.5, review: 'Beautiful setting and amazing flavors.', date: new Date('2023-11-14') }
    ],
    averageRating: 4.75
  },
  {
    id: '3',
    name: 'Illuzion Nightclub',
    description: 'Phuket\'s largest nightclub featuring international DJs, immersive light shows, and multiple dance floors.',
    category: 'club',
    location: 'Patong Beach',
    priceRange: 2,
    imageUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67',
    tags: ['nightlife', 'exciting', 'music', 'drinks'],
    ratings: [
      { userId: 'user2', rating: 4, review: 'Great DJs and energetic crowd!', date: new Date('2023-11-20') },
      { userId: 'user4', rating: 3.5, review: 'Fun night out but very crowded.', date: new Date('2023-12-05') }
    ],
    averageRating: 3.75
  },
  {
    id: '4',
    name: 'Ora Wellness Spa',
    description: 'Luxury spa offering traditional Thai massage, aromatherapy, and body treatments in a serene setting.',
    category: 'massage',
    location: 'Kata Beach',
    priceRange: 2,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
    tags: ['wellness', 'relaxing', 'luxury'],
    ratings: [
      { userId: 'user1', rating: 5, review: 'Best massage of my life. Truly relaxing!', date: new Date('2023-11-02') },
      { userId: 'user3', rating: 4.5, review: 'Beautiful spa with excellent service.', date: new Date('2023-12-01') }
    ],
    averageRating: 4.75
  },
  {
    id: '5',
    name: 'Phuket Thai Cooking Academy',
    description: 'Learn to cook authentic Thai dishes with local ingredients. Includes market tour and recipe book.',
    category: 'local',
    location: 'Phuket Town',
    priceRange: 2,
    imageUrl: 'https://images.unsplash.com/photo-1617651523904-95730d8cdb5e',
    tags: ['food', 'cultural', 'local experience'],
    ratings: [
      { userId: 'user2', rating: 5, review: 'Such a fun experience! Now I can make pad thai at home.', date: new Date('2023-10-15') },
      { userId: 'user4', rating: 4.5, review: 'The market tour was fascinating!', date: new Date('2023-11-22') }
    ],
    averageRating: 4.75
  },
  {
    id: '6',
    name: 'Phuket Trickeye Museum',
    description: 'Interactive art museum with 3D optical illusions that make for fun photo opportunities.',
    category: 'museum',
    location: 'Phuket Town',
    priceRange: 1,
    imageUrl: 'https://images.unsplash.com/photo-1553861826-9523f4124d27',
    tags: ['art', 'family-friendly', 'exciting'],
    ratings: [
      { userId: 'user3', rating: 4, review: 'Super fun place to take photos!', date: new Date('2023-11-10') },
      { userId: 'user1', rating: 3.5, review: 'Good for an hour of entertainment.', date: new Date('2023-12-07') }
    ],
    averageRating: 3.75
  },
  {
    id: '7',
    name: 'Surin Beach',
    description: 'Beautiful white sand beach with crystal clear water, perfect for swimming and sunbathing.',
    category: 'beach',
    location: 'Surin',
    priceRange: 1,
    imageUrl: 'https://images.unsplash.com/photo-1468413253725-0d5181091126',
    tags: ['water', 'nature', 'relaxing'],
    ratings: [
      { userId: 'user4', rating: 5, review: 'The most beautiful beach in Phuket!', date: new Date('2023-11-05') },
      { userId: 'user2', rating: 4.5, review: 'Clean and not too crowded.', date: new Date('2023-12-10') }
    ],
    averageRating: 4.75
  },
  {
    id: '8',
    name: 'Cafe del Mar',
    description: 'Stylish beach club with an infinity pool, international DJs, and Mediterranean cuisine.',
    category: 'bar',
    location: 'Kamala Beach',
    priceRange: 3,
    imageUrl: 'https://images.unsplash.com/photo-1507394293568-bf8ed416c6f0',
    tags: ['drinks', 'music', 'luxury', 'water'],
    ratings: [
      { userId: 'user1', rating: 4.5, review: 'Amazing sunset spot with great music!', date: new Date('2023-11-18') },
      { userId: 'user3', rating: 4, review: 'Pricey but worth it for the atmosphere.', date: new Date('2023-12-02') }
    ],
    averageRating: 4.25
  },
  {
    id: '9',
    name: 'Rum Jungle',
    description: 'Casual bar with live music, extensive rum selection, and a fun, tropical atmosphere.',
    category: 'bar',
    location: 'Patong Beach',
    priceRange: 2,
    imageUrl: 'https://images.unsplash.com/photo-1585681614878-98227d50d255',
    tags: ['drinks', 'music', 'nightlife'],
    ratings: [
      { userId: 'user2', rating: 4, review: 'Great live music and rum cocktails!', date: new Date('2023-11-25') },
      { userId: 'user4', rating: 3.5, review: 'Fun place but gets very busy.', date: new Date('2023-12-08') }
    ],
    averageRating: 3.75
  },
  {
    id: '10',
    name: 'Baan Rim Pa',
    description: 'Elegant cliff-top restaurant serving royal Thai cuisine with panoramic views of Patong Bay.',
    category: 'restaurant',
    location: 'Patong Beach',
    priceRange: 3,
    imageUrl: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88',
    tags: ['food', 'luxury', 'romantic', 'cultural'],
    ratings: [
      { userId: 'user3', rating: 5, review: 'Incredible food and the view is breathtaking!', date: new Date('2023-11-12') },
      { userId: 'user1', rating: 4.5, review: 'Perfect for a special occasion dinner.', date: new Date('2023-12-09') }
    ],
    averageRating: 4.75
  }
];

// User preferences from onboarding questionnaire
export type UserPreferences = {
  interests: string[];
  preferredCategories: Category[];
  budgetPreference: number;
  completed: boolean;
};

// Initial user preferences (empty)
export const initialUserPreferences: UserPreferences = {
  interests: [],
  preferredCategories: [],
  budgetPreference: 2,
  completed: false
};

// Simple recommendation algorithm based on user preferences
export const getRecommendedActivities = (activities: Activity[], preferences: UserPreferences): Activity[] => {
  if (!preferences.completed) return activities;
  
  return activities
    .map(activity => {
      let score = 0;
      
      // Match by interests/tags
      preferences.interests.forEach(interest => {
        if (activity.tags.includes(interest)) {
          score += 2;
        }
      });
      
      // Match by category
      if (preferences.preferredCategories.includes(activity.category)) {
        score += 3;
      }
      
      // Match by budget
      if (activity.priceRange <= preferences.budgetPreference) {
        score += 1;
      }
      
      return { ...activity, score };
    })
    .sort((a, b) => (b as any).score - (a as any).score)
    .map(({ score, ...activity }) => activity);
};
