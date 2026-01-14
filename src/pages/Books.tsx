import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { BookCard } from "@/components/books/BookCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { books, genres, Book } from "@/lib/books-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "title" | "price-asc" | "price-desc" | "rating";

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialGenre = searchParams.get("genre") || "All";
  const initialFilter = searchParams.get("filter") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [sortBy, setSortBy] = useState<SortOption>("title");
  const [showFilters, setShowFilters] = useState(false);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    // Filter by genre
    if (selectedGenre !== "All") {
      result = result.filter((book) => book.genre === selectedGenre);
    }

    // Filter by bestseller
    if (initialFilter === "bestseller") {
      result = result.filter((book) => book.bestseller);
    }

    // Sort
    switch (sortBy) {
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchQuery, selectedGenre, sortBy, initialFilter]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    if (genre === "All") {
      searchParams.delete("genre");
    } else {
      searchParams.set("genre", genre);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSortBy("title");
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedGenre !== "All" || initialFilter;

  return (
    <Layout>
      <div className="bg-secondary/30 py-8">
        <div className="container">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            {initialFilter === "bestseller" ? "Bestsellers" : "Browse Books"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} found
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title or author..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Select value={selectedGenre} onValueChange={handleGenreChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="shrink-0">
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto opacity-50" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Books;
