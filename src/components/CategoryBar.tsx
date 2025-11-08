import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { ChevronRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const CategoryBar = () => {
  return (
    <div className="bg-card border-b">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full">
          <div className="flex items-center gap-6 py-3">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category?cat=${encodeURIComponent(category)}`}
                className="flex items-center gap-1 text-sm hover:text-primary transition-colors whitespace-nowrap"
              >
                {category}
                <ChevronRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryBar;
