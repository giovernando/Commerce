import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { products, categories } from '@/data/products';

const Category = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('cat') || '';

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryQuery ? [categoryQuery] : []
  );
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    let result = products;

    // Filter by search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price
    if (priceMin) {
      result = result.filter((p) => p.price >= Number(priceMin));
    }
    if (priceMax) {
      result = result.filter((p) => p.price <= Number(priceMax));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result = [...result].sort((a, b) => b.sold - a.sold);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategories, priceMin, priceMax, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Kategori</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category} className="cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Rentang Harga</h3>
        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Harga minimum"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Harga maksimum"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>
      </div>

      {/* Reset */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setPriceMin('');
          setPriceMax('');
        }}
      >
        Reset Filter
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-secondary/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Filter - Desktop */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-card rounded-lg p-4 sticky top-20">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5" />
                  <h2 className="font-bold">Filter</h2>
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Header */}
              <div className="bg-card rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    {searchQuery && (
                      <p className="text-sm text-muted-foreground">
                        Hasil pencarian untuk "{searchQuery}"
                      </p>
                    )}
                    <p className="font-medium">
                      {filteredProducts.length} Produk ditemukan
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Sort */}
                    <RadioGroup value={sortBy} onValueChange={setSortBy}>
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="border rounded-md px-3 py-1.5 text-sm bg-background"
                        >
                          <option value="default">Urutkan</option>
                          <option value="popular">Terpopuler</option>
                          <option value="rating">Rating Tertinggi</option>
                          <option value="price-asc">Harga Terendah</option>
                          <option value="price-desc">Harga Tertinggi</option>
                        </select>
                      </div>
                    </RadioGroup>

                    {/* Mobile Filter */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="md:hidden">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left">
                        <SheetHeader>
                          <SheetTitle>Filter Produk</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <FilterContent />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-lg p-12 text-center">
                  <p className="text-muted-foreground">Tidak ada produk ditemukan</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Category;
