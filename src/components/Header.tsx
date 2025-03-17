import React, { useState, useEffect } from 'react';
import { Menu, X, Sword, Wallet } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-background/90 backdrop-blur-md shadow-lg' : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Sword className="w-8 h-8 text-primary mr-2" />
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-primary">$</span>DUEL
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-white/80 hover:text-primary transition-colors">About</a>
          <a href="#duels" className="text-white/80 hover:text-primary transition-colors">1v1 Duels</a>
          <a href="#jackpot" className="text-white/80 hover:text-primary transition-colors">Jackpot</a>
          <button className="btn-primary">
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute w-full bg-background/95 backdrop-blur-md transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-[300px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <a 
            href="#about" 
            className="text-white/80 hover:text-primary transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <a 
            href="#duels" 
            className="text-white/80 hover:text-primary transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            1v1 Duels
          </a>
          <a 
            href="#jackpot" 
            className="text-white/80 hover:text-primary transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Jackpot
          </a>
          <button className="btn-primary w-full">
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
