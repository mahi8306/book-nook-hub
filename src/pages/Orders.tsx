import { Link, Navigate } from "react-router-dom";
import { Package, ArrowRight, Clock, Check, Truck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

// Mock orders data - in production this would come from the database
const mockOrders = [
  {
    id: "CV-12345678",
    date: "2024-01-10",
    status: "Delivered",
    total: 54.97,
    items: [
      { title: "The Midnight Library", author: "Matt Haig", quantity: 1, price: 16.99 },
      { title: "Atomic Habits", author: "James Clear", quantity: 2, price: 18.99 },
    ],
  },
  {
    id: "CV-12345679",
    date: "2024-01-08",
    status: "Shipped",
    total: 32.98,
    items: [
      { title: "Dune", author: "Frank Herbert", quantity: 1, price: 19.99 },
      { title: "The Alchemist", author: "Paulo Coelho", quantity: 1, price: 12.99 },
    ],
  },
];

const Orders = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth?redirect=orders" replace />;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Check className="h-4 w-4" />;
      case "Shipped":
        return <Truck className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-sage/20 text-sage";
      case "Shipped":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-amber/20 text-amber";
    }
  };

  if (mockOrders.length === 0) {
    return (
      <Layout>
        <div className="container py-16 md:py-24 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-6 rounded-full bg-secondary/50 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold mb-3">
              No orders yet
            </h1>
            <p className="text-muted-foreground mb-6">
              You haven't placed any orders yet. Start exploring our collection!
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

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">My Orders</h1>

        <div className="space-y-6">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="bg-card rounded-lg p-6 shadow-subtle animate-fade-in"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{order.status}</span>
                  </Badge>
                  <span className="font-bold">${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-t first:border-t-0"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        by {item.author} · Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="flex gap-3 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm">
                  Track Order
                </Button>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
