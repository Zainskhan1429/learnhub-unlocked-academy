
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/courses/StarRating';
import { Course } from '@/hooks/useCourses';

export type CourseCardProps = Course & {
  enrolled?: boolean;
  progress?: number;
};

export function CourseCard({
  id,
  title,
  description,
  instructor,
  category,
  difficulty = 'beginner',
  duration,
  thumbnail,
  rating = 0,
  lessons = [],
  enrolled = false,
  progress = 0,
}: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const truncatedDescription = description.length > 100 
    ? `${description.substring(0, 100)}...` 
    : description;

  // Safely handle difficulty value
  const safetyDifficulty = typeof difficulty === 'string' ? 
    difficulty.toLowerCase() : 'beginner';
    
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }[safetyDifficulty as 'beginner' | 'intermediate' | 'advanced'] || 'bg-gray-100 text-gray-800';

  return (
    <Link to={`/courses/${id}`}>
      <Card 
        className="overflow-hidden transition-all duration-300 h-full hover:shadow-md hover:border-brand-200 hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={thumbnail || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=280&q=80'} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {difficulty && (
              <Badge className={difficultyColor}>
                {difficulty}
              </Badge>
            )}
            {duration && (
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                {duration} hrs
              </Badge>
            )}
          </div>
          {enrolled && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <div 
                className="h-full bg-brand-500 transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {lessons && lessons.length > 0 && (
            <Badge variant="secondary" className="absolute bottom-2 left-2">
              {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-1 text-brand-800 dark:text-brand-100">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{truncatedDescription}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {rating > 0 && (
                <>
                  <StarRating rating={rating} />
                  <span className="ml-2 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
                </>
              )}
            </div>
            {instructor && (
              <span className="text-sm text-muted-foreground">by {instructor}</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-4 py-3 bg-muted/50 flex items-center justify-between">
          <Badge variant="outline">{category}</Badge>
          {enrolled ? (
            <Badge variant="secondary">
              {progress === 100 ? 'Completed' : 'In Progress'}
            </Badge>
          ) : (
            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
              View Course →
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
