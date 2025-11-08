import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Star, Heart, ShoppingCart, Minus, Plus, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
            <Button onClick={() => navigate('/')}>Kembali ke Beranda</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: Object.values(selectedVariants).join(', ') || undefined,
    });
    toast.success('Produk ditambahkan ke keranjang');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-secondary/30">
        <div className="container mx-auto px-4 py-6">
          {/* Product Detail */}
          <div className="bg-card rounded-lg p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Images */}
              <div>
                <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-4">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? 'border-primary'
                          : 'border-transparent hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">{product.sold} Terjual</span>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        {product.discount && (
                          <Badge variant="destructive">{product.discount}% OFF</Badge>
                        )}
                      </>
                    )}
                  </div>
                  {product.freeShipping && (
                    <Badge className="bg-success">Gratis Ongkir</Badge>
                  )}
                </div>

                {/* Variants */}
                {product.variants?.map((variant) => (
                  <div key={variant.type} className="mb-6">
                    <Label className="text-sm font-medium mb-2 block">
                      {variant.type}
                    </Label>
                    <RadioGroup
                      value={selectedVariants[variant.type]}
                      onValueChange={(value) =>
                        setSelectedVariants((prev) => ({
                          ...prev,
                          [variant.type]: value,
                        }))
                      }
                    >
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((option) => (
                          <div key={option}>
                            <RadioGroupItem
                              value={option}
                              id={`${variant.type}-${option}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`${variant.type}-${option}`}
                              className="flex items-center justify-center px-4 py-2 rounded-md border-2 border-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50 transition-colors"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                ))}

                {/* Quantity */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Jumlah</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mb-6">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Tambah ke Keranjang
                  </Button>
                  <Button size="lg" className="flex-1" onClick={handleBuyNow}>
                    Beli Sekarang
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      toggleWishlist({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        rating: product.rating,
                      });
                      toast.success(
                        isInWishlist(product.id)
                          ? 'Dihapus dari wishlist'
                          : 'Ditambahkan ke wishlist'
                      );
                    }}
                  >
                    <Heart
                      className={`h-5 w-5 mr-2 ${
                        isInWishlist(product.id) ? 'fill-primary text-primary' : ''
                      }`}
                    />
                    Wishlist
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-card rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Deskripsi Produk</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Produk Serupa</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
