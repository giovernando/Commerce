import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';

const Wishlist = () => {
  const { items } = useWishlist();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-secondary/30">
          <div className="text-center">
            <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Wishlist Kosong</h2>
            <p className="text-muted-foreground mb-6">
              Simpan produk favoritmu di sini!
            </p>
            <Button onClick={() => navigate('/')}>Mulai Belanja</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-secondary/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Wishlist Saya</h1>
            <p className="text-muted-foreground">{items.length} Produk</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((item) => {
              const product = {
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                rating: item.rating,
                sold: 0,
                category: '',
                description: '',
                images: [item.image],
              };
              return <ProductCard key={item.id} product={product} />;
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
