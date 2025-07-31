import React from 'react';
import { ExternalLink, Calendar, Building, Award } from 'lucide-react';
import { portfolioData } from '../mock/mock';

const WorkProjects = () => {
  const projects = portfolioData.workProjects;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-black mb-6">
            Work Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional projects that showcase my expertise in AI/ML, IoT, and product management 
            across pharma, government, and defense sectors.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Project Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      <span>{project.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.period}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Key Impact
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium">
                      {project.impact}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">
                      Technologies Used
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">
                      Key Achievements
                    </p>
                    <ul className="space-y-2">
                      {project.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-6">
            Interested in Collaboration?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to work on challenging projects that combine technology with real-world impact.
          </p>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-md hover:bg-gray-800 transition-all duration-200 hover:scale-105"
          >
            <span>Let's Connect</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default WorkProjects;