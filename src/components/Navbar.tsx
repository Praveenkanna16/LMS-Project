import { Button } from "@/components/ui/button";
import { Code2, Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">GenZEd</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#courses" className="text-sm font-medium hover:text-primary transition-colors">
              Courses
            </a>
            <a href="#paths" className="text-sm font-medium hover:text-primary transition-colors">
              Learning Paths
            </a>
            <a href="#community" className="text-sm font-medium hover:text-primary transition-colors">
              Community
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <a href="#courses" className="block text-sm font-medium hover:text-primary transition-colors">
              Courses
            </a>
            <a href="#paths" className="block text-sm font-medium hover:text-primary transition-colors">
              Learning Paths
            </a>
            <a href="#community" className="block text-sm font-medium hover:text-primary transition-colors">
              Community
            </a>
            <a href="#pricing" className="block text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button variant="default" size="sm">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
