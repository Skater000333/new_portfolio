import React, { useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="relative h-80 cursor-pointer group perspective-1000"
      onClick={handleCardClick}
    >
      {/* Card Container */}
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={project.image || '/api/placeholder/400/300'}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-light text-black mb-2 tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Flip Indicator */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-black text-white rounded-lg overflow-hidden shadow-lg">
          <div className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-light mb-4 tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Impact</p>
                <p className="text-sm text-white leading-relaxed">
                  {project.impact}
                </p>
              </div>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 text-white text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <button className="text-xs text-gray-400 hover:text-white transition-colors duration-200">
                  Click to flip back
                </button>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;