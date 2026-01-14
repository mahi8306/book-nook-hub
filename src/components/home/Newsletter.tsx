import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing! Check your inbox for updates.");
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber/20 text-amber mb-6">
            <Mail className="h-6 w-6" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Stay in the Story
          </h2>
          
          <p className="text-primary-foreground/80 mb-8">
            Get weekly recommendations, exclusive deals, and updates on new arrivals 
            delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-amber"
              required
            />
            <Button type="submit" variant="hero" className="shrink-0">
              Subscribe
              <Send className="h-4 w-4 ml-1" />
            </Button>
          </form>
          
          <p className="text-xs text-primary-foreground/60 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};
