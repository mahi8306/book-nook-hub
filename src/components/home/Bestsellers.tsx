import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { getBestsellers } from "@/lib/books-data";
import { BookCard } from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";

export const Bestsellers = () => {
  const bestsellers = getBestsellers();

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-amber mb-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Trending Now</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Bestsellers
            </h2>
            <p className="text-muted-foreground mt-2">
              The books everyone's talking about
            </p>
          </div>
          <Link to="/books?filter=bestseller">
            <Button variant="ghost" className="hidden sm:flex">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.slice(0, 4).map((book, index) => (
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
          <Link to="/books?filter=bestseller">
            <Button variant="outline">
              View All Bestsellers
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
