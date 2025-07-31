import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, ExternalLink, ChevronLeft, ChevronRight, Share2, Copy, Check } from 'lucide-react';
import { portfolioData } from '../mock/mock';
import ProjectCard from '../components/ProjectCard';
import FunFactsCarousel from '../components/FunFactsCarousel';

const Home = () => {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleDownloadResume = () => {
    // Open resume in new tab for download
    window.open(portfolioData.personal.resumeUrl, '_blank');
  };

  const handleSharePage = async () => {
    const currentUrl = window.location.href;
    
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Avatar */}
          <div className="mb-8 inline-block">
            <img
              src={portfolioData.personal.avatarUrl}
              alt={portfolioData.personal.name}
              className="w-32 h-32 rounded-full mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-extralight tracking-tight text-black mb-6 leading-none">
            {portfolioData.personal.name}
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {portfolioData.personal.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-md hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">Download Resume</span>
            </button>
            <button
              onClick={handleSharePage}
              className="flex items-center gap-3 border border-gray-300 text-gray-700 px-8 py-4 rounded-md hover:bg-gray-50 transition-all duration-200 hover:scale-105"
            >
              {copiedUrl ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
              <span className="font-medium">
                {copiedUrl ? 'Link Copied!' : 'Share This Page'}
              </span>
            </button>
          </div>

          {/* Abstract Graphic - Simple AI-inspired design */}
          <div className="inline-block">
            <div className="w-24 h-24 relative">
              <div className="absolute inset-0 border-2 border-gray-200 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 border-2 border-gray-300 rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-4 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts Carousel */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-4">
              Quick Facts
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Some highlights from my professional and personal journey
            </p>
          </div>
          <FunFactsCarousel />
        </div>
      </section>

      {/* Featured Work - Split into Work & Side Projects */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              A glimpse into my professional projects and personal initiatives that drive impact
            </p>
          </div>

          {/* Work Projects Preview */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-black">
                Work Projects
              </h3>
              <Link
                to="/work-projects"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors duration-200 font-medium group"
              >
                <span>View All Work Projects</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.workProjects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Side Projects Preview */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-black">
                Side Projects
              </h3>
              <Link
                to="/side-projects"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors duration-200 font-medium group"
              >
                <span>View All Side Projects</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.sideProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-8">
            About Me
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            {portfolioData.personal.bio}
          </p>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            When I'm not building products, you'll find me leading my roller hockey team to championships 
            or teaching underprivileged children. I believe the best solutions come from understanding 
            both technology and people.
          </p>
          <Link
            to="/get-to-know-parth"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all duration-200 hover:scale-105"
          >
            <span>Get to Know Me Better</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;