import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Trophy, Zap, Brain, Users, BarChart3 } from 'lucide-react';
import { portfolioData } from '../mock/mock';

const iconMap = {
  Trophy,
  Zap,
  Brain,
  Users,
  BarChart3
};

const FunFactsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const facts = portfolioData.funFacts;

  // Auto-rotate facts
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === facts.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, facts.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? facts.length - 1 : currentIndex - 1);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === facts.length - 1 ? 0 : currentIndex + 1);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  if (!facts || facts.length === 0) return null;

  const currentFact = facts[currentIndex];
  const IconComponent = iconMap[currentFact.icon] || Brain;

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Carousel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 min-h-[200px] flex flex-col justify-center">
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          aria-label="Previous fact"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          aria-label="Next fact"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Content */}
        <div className="text-center px-12">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-gray-700" />
            </div>
          </div>

          {/* Fact Text */}
          <p className="text-lg md:text-xl font-light text-gray-800 leading-relaxed max-w-2xl mx-auto">
            {currentFact.fact}
          </p>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {facts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-black w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to fact ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-400">
          {isAutoPlaying ? 'Auto-rotating' : 'Paused'} • {currentIndex + 1} of {facts.length}
        </p>
      </div>
    </div>
  );
};

export default FunFactsCarousel;