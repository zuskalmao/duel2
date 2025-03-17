import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sword } from 'lucide-react';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (heroRef.current && titleRef.current && subtitleRef.current) {
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .from(".hero-buttons button", {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(".hero-coin", {
        scale: 0.5,
        opacity: 0,
        rotation: "-45deg",
        duration: 1.2,
        ease: "elastic.out(1, 0.4)"
      }, "-=0.8");
    }
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(".hero-coin", {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-background-light via-background to-background-dark"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/5 animate-pulse-slow"
            style={{
              width: `${Math.random() * 20 + 5}rem`,
              height: `${Math.random() * 20 + 5}rem`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="gradient-text">Battle</span> Your Way to <span className="text-primary">Victory</span>
          </h1>
          <p
            ref={subtitleRef}
            className="mt-6 text-xl md:text-2xl text-white/70 max-w-2xl mx-auto lg:mx-0"
          >
            The first Solana memecoin with real dueling utility. Stake your $DUEL tokens and challenge others in 1v1 battles or compete for massive jackpots.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 hero-buttons justify-center lg:justify-start">
            <button className="btn-primary text-lg group">
              Join The Duel
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-outline text-lg">Learn More</button>
          </div>
        </div>
        
        <div className="lg:w-1/2 flex justify-center mb-10 lg:mb-0 mt-10 lg:mt-0">
          <div className="hero-coin relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary via-primary-light to-accent flex items-center justify-center border-4 border-white/10 animate-float shadow-lg shadow-primary/20">
            <Sword className="w-32 h-32 md:w-40 md:h-40 text-white" />
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse-slow"></div>
            <div className="absolute -inset-4 rounded-full border border-white/10 animate-glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
