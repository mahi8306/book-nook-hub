import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Book } from "@/lib/books-data";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  const { addItem } = useCart();

  return (
    <div className="group bg-card rounded-lg shadow-subtle hover:shadow-book transition-all duration-300 overflow-hidden animate-fade-in">
      {/* Cover Image */}
      <Link to={`/books/${book.id}`} className="block relative overflow-hidden">
        <div className="aspect-[2/3] bg-muted">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {book.bestseller && (
          <Badge className="absolute top-2 left-2 bg-amber text-espresso hover:bg-amber/90">
            Bestseller
          </Badge>
        )}
        {book.originalPrice && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Sale
          </Badge>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/books/${book.id}`}>
          <h3 className="font-serif font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="h-4 w-4 fill-amber text-amber" />
          <span className="text-sm font-medium">{book.rating}</span>
          <span className="text-xs text-muted-foreground">({book.reviews.toLocaleString()})</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">${book.price.toFixed(2)}</span>
            {book.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="gold"
            onClick={() => addItem(book)}
            disabled={!book.inStock}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
