import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import credenceLogo from 'figma:asset/ad478d862079e6b2cb55ae50301685630988af4c.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <img 
                src={credenceLogo} 
                alt="Credence Logo" 
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                Credence
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </a>
            <a href="#value-propositions" className="text-foreground hover:text-primary transition-colors font-medium">
              Solutions
            </a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors font-medium">
              FAQ
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
              <a href="mailto:support@credenceapp.co">
                Contact Sales
              </a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <a href="https://tally.so/r/mKABMg" target="_blank" rel="noopener noreferrer">
                Request Financing
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
                Services
              </a>
              <a href="#value-propositions" className="text-foreground hover:text-primary transition-colors font-medium">
                Solutions
              </a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors font-medium">
                FAQ
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                  <a href="mailto:support@credenceapp.co">
                    Contact Sales
                  </a>
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <a href="https://tally.so/r/mKABMg" target="_blank" rel="noopener noreferrer">
                    Request Financing
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}