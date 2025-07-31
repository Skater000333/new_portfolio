import React from 'react';
import { ExternalLink, Heart, Calendar, Users } from 'lucide-react';
import { portfolioData } from '../mock/mock';

const SideProjects = () => {
  const projects = portfolioData.sideProjects;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-black mb-6">
            Side Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Personal initiatives and passion projects that reflect my commitment to 
            community impact, innovation, and continuous learning.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                {/* Project Image */}
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title */}
                  <h3 className="text-xl font-light tracking-tight text-black">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact */}
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-3 h-3 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Impact
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 font-medium">
                      {project.impact}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{project.period}</span>
                    </div>
                  </div>

                  {/* Technologies/Skills */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-8">
            Beyond Professional Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-black">Community Impact</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dedicated to creating positive change through education and mentorship 
                in underserved communities.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-black">Social Responsibility</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Believing in technology's power to solve real-world problems and 
                improve lives at scale.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                <ExternalLink className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-black">Continuous Learning</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Always exploring new technologies and methodologies to stay at 
                the forefront of innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-6">
            Have a Project Idea?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            I'm always interested in collaborating on meaningful projects that create positive impact.
          </p>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-md hover:bg-gray-800 transition-all duration-200 hover:scale-105"
          >
            <span>Let's Collaborate</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default SideProjects;