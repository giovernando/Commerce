import Navbar from '@/components/Navbar';
import CategoryBar from '@/components/CategoryBar';
import HeroBanner from '@/components/HeroBanner';
import FlashSale from '@/components/FlashSale';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { products } from '@/data/products';

const Index = () => {
  const recommendedProducts = products.slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryBar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Hero Banner */}
          <HeroBanner />

          {/* Flash Sale */}
          <FlashSale />

          {/* Recommended Products */}
          <section className="py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">Rekomendasi untuk Anda</h2>
              <p className="text-sm text-muted-foreground">Produk pilihan terbaik</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
