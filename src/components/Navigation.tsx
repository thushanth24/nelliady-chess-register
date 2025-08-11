import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Trophy } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Details", href: "/#details" },
    { name: "Prizes", href: "/#prizes" },
    { name: "Payment", href: "/#payment" },
    { name: "Register", href: "/register" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-chess-yellow" />
            <span className="font-bold text-lg sm:text-xl text-foreground">NCC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 flex-1 justify-center">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.href.startsWith("/#") ? (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-foreground hover:text-chess-yellow transition-colors font-medium whitespace-nowrap text-sm lg:text-base"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-foreground hover:text-chess-yellow transition-colors font-medium whitespace-nowrap text-sm lg:text-base ${
                      location.pathname === item.href ? "text-chess-yellow" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Register Button - Desktop */}
          <div className="hidden md:block flex-shrink-0">
            <Button asChild variant="tournament" size="sm">
              <Link to="/register" className="whitespace-nowrap">Register Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith("/#") ? (
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-foreground hover:text-chess-yellow transition-colors font-medium text-left w-full"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-foreground hover:text-chess-yellow transition-colors font-medium block ${
                        location.pathname === item.href ? "text-chess-yellow" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Button asChild variant="tournament" size="sm" className="w-full">
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Register Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;