import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Search, 
  Heart, 
  Sparkles, 
  Ghost, 
  GraduationCap,
  Baby,
  Globe
} from "lucide-react";

const genreItems = [
  { name: "Fiction", icon: BookOpen, color: "bg-blue-100 text-blue-600" },
  { name: "Non-Fiction", icon: GraduationCap, color: "bg-green-100 text-green-600" },
  { name: "Mystery", icon: Search, color: "bg-purple-100 text-purple-600" },
  { name: "Romance", icon: Heart, color: "bg-pink-100 text-pink-600" },
  { name: "Science Fiction", icon: Sparkles, color: "bg-indigo-100 text-indigo-600" },
  { name: "Fantasy", icon: Ghost, color: "bg-amber-100 text-amber-700" },
  { name: "Children's", icon: Baby, color: "bg-teal-100 text-teal-600" },
  { name: "History", icon: Globe, color: "bg-orange-100 text-orange-600" },
];

export const GenreSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Browse by Genre
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Find your next favorite book in your preferred genre
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {genreItems.map((genre, index) => (
            <Link
              key={genre.name}
              to={`/books?genre=${encodeURIComponent(genre.name)}`}
              className="group opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex flex-col items-center p-4 rounded-xl bg-card hover:shadow-book transition-all duration-300 group-hover:scale-105">
                <div className={`p-3 rounded-full ${genre.color} mb-3 transition-transform group-hover:scale-110`}>
                  <genre.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">
                  {genre.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
