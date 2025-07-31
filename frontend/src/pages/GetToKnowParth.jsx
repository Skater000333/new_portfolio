import React from 'react';
import { ExternalLink, Award, GraduationCap, Heart, BookOpen, Trophy, MapPin } from 'lucide-react';
import { portfolioData } from '../mock/mock';

const GetToKnowParth = () => {
  const personalInfo = portfolioData.personalInfo;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-black mb-6">
            Get to Know Parth
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Beyond the projects and achievements, here's what drives me, shapes my perspective, 
            and defines who I am as a person and professional.
          </p>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-8">
              My Journey
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                My path to product management wasn't traditional, but it's been shaped by a unique 
                combination of technical depth, leadership experience, and a genuine passion for 
                solving complex problems that matter.
              </p>
              <p>
                Starting as a Research ML Intern at DRDO, I learned that the best technology solutions 
                are those that directly improve people's lives. Whether it was building avalanche 
                detection systems for army operations or developing water quality monitoring for 
                rural communities, I discovered my calling at the intersection of technology and impact.
              </p>
              <p>
                My leadership journey began on the roller hockey field, where I've been captain for 
                8+ years. The discipline, strategic thinking, and team coordination I learned in sports 
                directly translates to how I approach product management - understanding that success 
                comes from bringing out the best in everyone around you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Role */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-4">
              What I Do Today
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-black">{personalInfo.currentRole}</h3>
                <p className="text-gray-600">{personalInfo.location}</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At PharmaSecure, I'm leading the development of AI-driven solutions that are revolutionizing 
              pharmaceutical supply chains. From fraud detection systems that have reduced counterfeit 
              identification time by 90% to inventory management platforms that unlock new revenue streams, 
              I'm passionate about building products that create measurable business value.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Key Focus Areas</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">AI/ML Product Development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Cross-functional Team Leadership</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Data-driven Decision Making</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Stakeholder Management</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Industries</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Pharmaceutical & Healthcare</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Government & Public Sector</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Defense & Security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Smart Cities & IoT</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-8 h-8 text-gray-600" />
                <h2 className="text-3xl font-light tracking-tight text-black">Education</h2>
              </div>
              
              <div className="space-y-6">
                {personalInfo.education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-800 font-medium leading-relaxed">{edu}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-8 h-8 text-gray-600" />
                <h2 className="text-3xl font-light tracking-tight text-black">Certifications</h2>
              </div>
              
              <div className="space-y-4">
                {personalInfo.certifications.map((cert, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-4">
              Beyond Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The interests and values that shape my perspective and drive my passion for meaningful work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {personalInfo.interests.map((interest, index) => {
              const icons = [Trophy, BookOpen, Heart, ExternalLink];
              const IconComponent = icons[index] || ExternalLink;
              
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{interest}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Personal Philosophy */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-8">
            My Philosophy
          </h2>
          <div className="bg-black text-white p-8 md:p-12 rounded-2xl">
            <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-6">
              "The best products are born from deep empathy for users, rigorous data analysis, 
              and the courage to challenge conventional thinking. Technology should simplify 
              complexity, not create it."
            </blockquote>
            <p className="text-gray-300 text-sm">— My approach to product management</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-6">
            Let's Connect
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you're interested in collaboration, mentorship, or just want to chat about 
            product management and technology, I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-md hover:bg-gray-800 transition-all duration-200 hover:scale-105"
            >
              <span>Send Me an Email</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-8 py-4 rounded-md hover:bg-gray-50 transition-all duration-200 hover:scale-105"
            >
              <span>Connect on LinkedIn</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetToKnowParth;