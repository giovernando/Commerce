import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/data/products';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success('Produk ditambahkan ke keranjang');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
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
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group relative bg-card rounded-lg overflow-hidden border hover-lift card-shadow transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount && (
              <Badge variant="destructive" className="text-xs">
                -{product.discount}%
              </Badge>
            )}
            {product.freeShipping && (
              <Badge className="text-xs bg-success">Gratis Ongkir</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-card/90 hover:bg-card p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`h-4 w-4 ${
                isInWishlist(product.id) ? 'fill-primary text-primary' : ''
              }`}
            />
          </Button>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 mb-2 min-h-[40px]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating & Sold */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-warning text-warning" />
              <span>{product.rating}</span>
            </div>
            <span>{product.sold} terjual</span>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="sm"
            className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Tambah
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
