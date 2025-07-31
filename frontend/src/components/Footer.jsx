import React from 'react';
import { ExternalLink, Mail } from 'lucide-react';
import { portfolioData } from '../mock/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-light tracking-tight text-black">
              {portfolioData.personal.name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              {portfolioData.personal.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-normal tracking-wide text-black uppercase">Quick Links</h4>
            <div className="space-y-2">
              <a 
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors duration-200"
              >
                <span>Download Resume</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="#projects"
                className="block text-sm text-gray-600 hover:text-black transition-colors duration-200"
              >
                View Projects
              </a>
              <a 
                href="#about"
                className="block text-sm text-gray-600 hover:text-black transition-colors duration-200"
              >
                About Me
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-normal tracking-wide text-black uppercase">Connect</h4>
            <div className="space-y-3">
              <a 
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-black transition-all duration-200 hover:translate-x-1"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <span>LinkedIn</span>
              </a>
              <a 
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-black transition-all duration-200 hover:translate-x-1"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                </div>
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 tracking-wide">
              © {currentYear} {portfolioData.personal.name}. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 tracking-wide">
              Designed & built with passion for great product experiences
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;