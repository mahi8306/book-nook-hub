import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getFeaturedBooks } from "@/lib/books-data";
import { BookCard } from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";

export const FeaturedBooks = () => {
  const featuredBooks = getFeaturedBooks();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Featured Books
            </h2>
            <p className="text-muted-foreground mt-2">
              Hand-picked selections from our editors
            </p>
          </div>
          <Link to="/books">
            <Button variant="ghost" className="hidden sm:flex">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {featuredBooks.slice(0, 5).map((book, index) => (
            <div
              key={book.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/books">
            <Button variant="outline">
              View All Books
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
