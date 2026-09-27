import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/content';
import { Project } from '../types';
import { ArrowUpRight, Clock, MapPin, CheckCircle2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface RecentProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const RecentProjects: React.FC<RecentProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const categories = ['All', 'Commercial', 'Residential', 'Emergency', 'Drain & Pipe'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const currentProject = filteredProjects[selectedIdx % filteredProjects.length] || PROJECTS_DATA[0];

  const handleNext = () => {
    setSelectedIdx((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section id="projects" className="py-20 lg:py-28 bg-white text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 tracking-wide uppercase mb-2">
            /Our Recent Projects
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-950 mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            Proven Engineering & Field Results
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            From 28-minute emergency hospital grease clearings to high-rise penthouse PEX retrofits, explore our verified client case studies.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedIdx(0);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-slate-950 text-white shadow-md scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Marquee Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-900/10 bg-[#12151c] min-h-[480px] lg:min-h-[580px] flex flex-col justify-end group cursor-pointer"
          onClick={() => onSelectProject(currentProject)}
        >
          {/* Main Background Project Photo */}
          <img
            src={currentProject.image}
            alt={currentProject.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05] transition-all duration-700 group-hover:scale-105"
          />

          {/* Gradients for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/20" />

          {/* Top badges & navigation arrows */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#10B981] text-black shadow-sm">
                {currentProject.category}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-slate-200 backdrop-blur-md border border-white/10">
                <MapPin className="w-3 h-3 text-[#10B981]" />
                {currentProject.location}
              </span>
            </div>

            {/* Slider Switchers */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Glass Overlay Bar */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 backdrop-blur-md bg-black/60 border-t border-white/15 m-4 sm:m-6 rounded-2xl shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Title */}
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold text-[#10B981] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Field Case Study · {currentProject.duration}</span>
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  {currentProject.title}
                </h3>
              </div>

              {/* Right Description & Details Button */}
              <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md font-normal">
                  {currentProject.summary}
                </p>

                {/* View Details Pill Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProject(currentProject);
                  }}
                  className="group/btn relative inline-flex items-center justify-between gap-3 bg-white hover:bg-slate-100 text-slate-900 pl-5 pr-1.5 py-1.5 rounded-full font-semibold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-xl active:scale-95 shrink-0 self-start sm:self-auto"
                >
                  <span className="whitespace-nowrap">View Case Study</span>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#111317] text-white group-hover/btn:bg-[#10B981] group-hover/btn:text-black transition-colors duration-200">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail quick-selector row with proper contrast */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS_DATA.map((proj, idx) => (
            <button
              key={proj.id}
              type="button"
              onClick={() => {
                const foundIdx = filteredProjects.findIndex((p) => p.id === proj.id);
                if (foundIdx !== -1) setSelectedIdx(foundIdx);
                else {
                  setActiveCategory('All');
                  setSelectedIdx(idx);
                }
              }}
              className={`p-4 rounded-2xl text-left border transition-all duration-200 shadow-sm ${
                currentProject.id === proj.id
                  ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-[#10B981] shadow-md scale-[1.02]'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    currentProject.id === proj.id
                      ? 'bg-white/20 text-[#10B981]'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {proj.category}
                </span>
                <span className="text-[11px] opacity-70 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {proj.duration}
                </span>
              </div>
              <p className={`text-xs sm:text-sm font-bold truncate ${currentProject.id === proj.id ? 'text-white' : 'text-slate-900'}`}>
                {proj.title}
              </p>
              <p className={`text-[11px] truncate mt-1 ${currentProject.id === proj.id ? 'text-slate-300' : 'text-slate-500'}`}>
                {proj.client}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
