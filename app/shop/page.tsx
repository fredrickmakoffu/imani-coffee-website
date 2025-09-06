"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Star, Search, X, ArrowLeft } from "lucide-react";
import { products } from "@/data/data";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
}

export default function StorefrontPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ["all", "coffee", "merch"];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.type === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id || item.id === product.name);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        (item.id === product.id || item.id === product.name)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id || product.name,
        name: product.name,
        price: product.price,
        quantity: 1,
        type: product.type
      }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-bridal-health pb-8">
      {/* Shop Header */}
      <div className="bg-bridal-health border-b border-trace-ash/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-trace-ash hover:text-cod-gray transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm uppercase tracking-wide">Back to Home</span>
              </Link>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-trace-ash text-bridal-health text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
              <span className="hidden sm:inline ml-2">Cart</span>
            </Button>
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-bold text-trace-ash uppercase tracking-tight mb-4">
            Imani Store
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-trace-ash/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-trace-ash/20 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-trace-ash/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter & Products */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === "all" ? "All Products" : category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id || index}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="aspect-square bg-swiss-coffee flex items-center justify-center relative overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-trace-ash/40 text-6xl font-light">
                    {product.type === "coffee" ? "☕" : "🛍️"}
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-trace-ash/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => addToCart(product)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <span className="text-xs uppercase tracking-wide text-trace-ash/60 font-medium">
                      {product.type === 'coffee' ? `${product.origin || 'Coffee'}` : product.type}
                    </span>
                    <h3 className="font-semibold text-trace-ash text-lg leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-trace-ash">
                      ${product.price}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-trace-ash/70 line-clamp-2">
                  {product.description}
                </p>

                {/* Coffee specific details */}
                {product.type === 'coffee' && (product.process || product.roast) && (
                  <div className="flex gap-2 text-xs text-trace-ash/60">
                    {product.process && <span className="bg-swiss-coffee px-2 py-1 rounded">{product.process}</span>}
                    {product.roast && <span className="bg-swiss-coffee px-2 py-1 rounded">{product.roast}</span>}
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-current" : "text-trace-ash/20"}`}
                    />
                  ))}
                  <span className="text-xs text-trace-ash/60 ml-1">({product.reviews || 24})</span>
                </div>

                <Button
                  onClick={() => addToCart(product)}
                  className="w-full"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-trace-ash mb-2">No products found</h3>
            <p className="text-trace-ash/60">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-trace-ash">
                  Shopping Cart ({getTotalItems()})
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-trace-ash/30 mx-auto mb-4" />
                    <p className="text-trace-ash/60">Your cart is empty</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-bridal-health rounded-lg">
                      <div className="w-12 h-12 bg-swiss-coffee rounded flex items-center justify-center text-trace-ash/40">
                        {item.type === "coffee" ? "☕" : "🛍️"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-trace-ash text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-trace-ash/60 capitalize">{item.type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-6 h-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-6 h-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-sm font-semibold text-trace-ash">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-trace-ash">Total:</span>
                    <span className="text-xl font-bold text-trace-ash">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
