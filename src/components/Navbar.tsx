import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, Bell } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      {/* Top Bar */}
      <div className="bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm text-primary-foreground">
            <div className="flex items-center gap-6">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                Beranda
              </Link>
              <Link to="/category" className="hover:opacity-80 transition-opacity">
                Kategori
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifikasi</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mr-4">
            <div className="text-2xl font-bold text-gradient">ShopMart</div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Cari produk, brand, atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 h-10"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-0 top-0 h-10 px-4 rounded-l-none"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex gap-2"
              onClick={() => navigate('/wishlist')}
            >
              <Heart className="h-5 w-5" />
              <span className="hidden lg:inline">Wishlist</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative gap-2"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="hidden lg:inline">Keranjang</span>
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-5 w-5" />
                    <span className="hidden lg:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    Pesanan Saya
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Keluar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => navigate('/auth')}
              >
                <User className="h-5 w-5" />
                <span className="hidden lg:inline">Masuk</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
