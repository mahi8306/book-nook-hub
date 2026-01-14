import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative bg-hero-gradient text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber/20 text-amber px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Over 10,000 titles available
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Discover Your Next
              <span className="block text-amber">Great Read</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg mx-auto lg:mx-0">
              From timeless classics to contemporary bestsellers, find the perfect 
              book to ignite your imagination and expand your horizons.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/books">
                <Button variant="hero" size="xl">
                  Browse Collection
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/books?filter=bestseller">
                <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  View Bestsellers
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Books */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Floating book cards */}
              <div className="absolute -top-10 -left-10 w-48 h-72 bg-card rounded-lg shadow-elevated rotate-[-15deg] overflow-hidden animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop" 
                  alt="Featured book"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-56 h-80 bg-card rounded-lg shadow-elevated overflow-hidden z-10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=350&h=500&fit=crop" 
                  alt="Featured book"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-64 bg-card rounded-lg shadow-elevated rotate-[12deg] overflow-hidden animate-float" style={{ animationDelay: "1.5s" }}>
                <img 
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=280&h=400&fit=crop" 
                  alt="Featured book"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
