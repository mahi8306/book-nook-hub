import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBookById, getBestsellers } from "@/lib/books-data";
import { useCart } from "@/context/CartContext";
import { BookCard } from "@/components/books/BookCard";
import { toast } from "sonner";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const book = getBookById(id || "");
  const relatedBooks = getBestsellers().filter((b) => b.id !== id).slice(0, 4);

  if (!book) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Book not found</h1>
          <Link to="/books">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Books
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem(book);
    toast.success(`"${book.title}" added to cart`, {
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart",
      },
    });
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/30 py-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/books" className="hover:text-foreground transition-colors">Books</Link>
            <span>/</span>
            <span className="text-foreground">{book.title}</span>
          </div>
        </div>
      </div>

      {/* Book Details */}
      <div className="container py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Cover Image */}
          <div className="relative">
            <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-elevated bg-muted sticky top-24">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              {book.bestseller && (
                <Badge className="absolute top-4 left-4 bg-amber text-espresso">
                  Bestseller
                </Badge>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">{book.genre}</Badge>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground">by {book.author}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.rating)
                        ? "fill-amber text-amber"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">{book.rating}</span>
              <span className="text-muted-foreground">
                ({book.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                  <Badge variant="destructive">
                    {Math.round((1 - book.price / book.originalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {book.inStock ? (
                <>
                  <Check className="h-5 w-5 text-sage" />
                  <span className="text-sage font-medium">In Stock</span>
                </>
              ) : (
                <span className="text-destructive font-medium">Out of Stock</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="hero"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!book.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-3">About this book</h3>
              <p className="text-muted-foreground leading-relaxed">{book.description}</p>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-2 gap-4 bg-secondary/50 rounded-lg p-6">
              <div>
                <span className="text-sm text-muted-foreground">Pages</span>
                <p className="font-medium">{book.pages}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Publisher</span>
                <p className="font-medium">{book.publisher}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Published</span>
                <p className="font-medium">{new Date(book.publishedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">ISBN</span>
                <p className="font-medium">{book.isbn}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookDetail;
