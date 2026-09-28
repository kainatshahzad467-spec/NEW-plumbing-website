import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/content';
import { Project } from '../types';
import {
  FolderGit2,
  Clock,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';

interface ProjectsPageProps {
  onOpenProjectModal: (project: Project) => void;
  onOpenBooking: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenProjectModal, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Commercial', 'Residential', 'Emergency', 'Drain & Pipe'];

  const filtered = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#0b0e14] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Real-World Proof of Work</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Recent Case Studies & Projects
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Detailed engineering breakdowns of our emergency restorations, luxury residential retrofits, and high-volume commercial installations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                    {project.category}
                  </span>
                </div>
                {project.metrics && project.metrics.length > 0 && (
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg">
                    {project.metrics[0].value} {project.metrics[0].label}
                  </div>
                )}
              </div>

              <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {project.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                  <span className="text-xs text-slate-500">Client: <strong className="text-slate-900">{project.client}</strong></span>
                  <button
                    onClick={() => onOpenProjectModal(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-950 text-white font-semibold text-xs tracking-tight transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center bg-white p-8 rounded-3xl border border-slate-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-950">Have a similar project or emergency?</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Our certified master plumbers provide complete CAD review, upfront estimates, and manufacturer-backed warranties.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs tracking-tight transition-all shadow-md active:scale-95 cursor-pointer mt-2"
          >
            Schedule Free Estimate Call
          </button>
        </div>
      </div>
    </div>
  );
};
