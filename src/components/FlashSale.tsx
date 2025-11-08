import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = products.filter((p) => p.discount && p.discount >= 30).slice(0, 6);

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gradient mb-1">FLASH SALE</h2>
          <p className="text-sm text-muted-foreground">Buruan! Waktu terbatas</p>
        </div>
        <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg">
          <Clock className="h-5 w-5" />
          <div className="flex items-center gap-1 font-mono font-bold">
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-4">
          {flashSaleProducts.map((product) => (
            <div key={product.id} className="w-[200px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default FlashSale;
