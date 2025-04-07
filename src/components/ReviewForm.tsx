
import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ReviewFormProps = {
  onSubmit: (rating: number, review: string) => void;
  className?: string;
};

const ReviewForm = ({ onSubmit, className }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }
    
    onSubmit(rating, review);
    setRating(0);
    setReview("");
    toast.success("Review submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <h3 className="font-semibold text-lg">Leave a review</h3>
      
      <div className="flex items-center">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 focus:outline-none"
            >
              <Star
                size={24}
                className={cn(
                  "transition-colors", 
                  (hoverRating || rating) >= star 
                    ? "text-yellow-500 fill-yellow-500" 
                    : "text-muted stroke-muted-foreground"
                )}
              />
            </button>
          ))}
        </div>
        <span className="ml-2 text-sm text-muted-foreground">
          {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select a rating'}
        </span>
      </div>
      
      <Textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your experience..."
        className="min-h-[100px]"
      />
      
      <Button type="submit" className="w-full">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
