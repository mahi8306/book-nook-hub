import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-amber text-espresso">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-serif text-xl font-semibold">
                Chapter & Verse
              </span>
            </Link>
            <p className="text-primary-foreground/80 text-sm max-w-md">
              Your destination for timeless stories and new discoveries. 
              We believe every book has the power to change a life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/books" className="text-primary-foreground/80 hover:text-amber transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/books?filter=bestseller" className="text-primary-foreground/80 hover:text-amber transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-primary-foreground/80 hover:text-amber transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-primary-foreground/80 hover:text-amber transition-colors">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4 text-amber" />
                123 Library Lane, Booktown
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="h-4 w-4 text-amber" />
                (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="h-4 w-4 text-amber" />
                hello@chapterverse.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© 2024 Chapter & Verse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
