import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/auth?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16 md:py-24 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-6 rounded-full bg-secondary/50 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold mb-3">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any books yet. Discover your next great read!
            </p>
            <Link to="/books">
              <Button variant="hero" size="lg">
                Browse Books
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const subtotal = total;
  const shipping = total > 35 ? 0 : 4.99;
  const orderTotal = subtotal + shipping;

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.book.id}
                className="flex gap-4 bg-card rounded-lg p-4 shadow-subtle animate-fade-in"
              >
                {/* Book Cover */}
                <Link to={`/books/${item.book.id}`} className="shrink-0">
                  <div className="w-20 h-28 md:w-24 md:h-36 rounded-md overflow-hidden bg-muted">
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link to={`/books/${item.book.id}`}>
                    <h3 className="font-serif font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                      {item.book.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">{item.book.author}</p>
                  <p className="font-bold text-lg">${item.book.price.toFixed(2)}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.book.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right hidden sm:block">
                  <p className="font-bold text-lg">
                    ${(item.book.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="text-right">
              <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 shadow-book sticky top-24">
              <h2 className="font-serif text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items)
                  </span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-sage font-medium">FREE</span>
                  ) : (
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over $35
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>

              <Button
                variant="hero"
                className="w-full"
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Button>

              <div className="mt-4 text-center">
                <Link to="/books" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
