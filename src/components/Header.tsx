
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type HeaderProps = {
  transparent?: boolean;
  title?: string;
};

const Header = ({ transparent = false, title = 'Phuket Fun Finder' }: HeaderProps) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between',
        transparent ? 'bg-transparent' : 'bg-background/80 backdrop-blur-lg shadow-sm'
      )}
    >
      <div className="flex items-center">
        {title && (
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h1>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {isSearchOpen ? (
          <div className="relative animate-fade-in">
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full h-10 px-4 py-2 rounded-full bg-background/90 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
          </div>
        ) : (
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 hover:bg-background transition-colors"
          >
            <Search size={20} />
          </button>
        )}
        
        <button 
          onClick={() => navigate('/profile')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 hover:bg-background transition-colors"
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
