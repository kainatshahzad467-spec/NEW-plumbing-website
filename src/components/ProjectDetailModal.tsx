import React from 'react';
import { X, CheckCircle2, Clock, ShieldCheck, MapPin, Tag, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onBookService,
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#12151b] border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-white my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-colors"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Hero Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12151b] via-[#12151b]/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#10B981] text-black">
                {project.category}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-md">
                <MapPin className="w-3 h-3 text-[#10B981]" />
                {project.location}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1">Client: {project.client}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
            {project.metrics.map((m, i) => (
              <div key={i} className="text-center">
                <span className="text-xs text-slate-400 block font-medium">{m.label}</span>
                <span className="text-lg sm:text-xl font-extrabold text-white">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Project Narrative */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#10B981]">
              Executive Case Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {project.fullDescription}
            </p>
          </div>

          {/* Technical Scope Tags */}
          <div className="pt-2">
            <span className="text-xs text-slate-400 block mb-2 font-medium">
              Technical Standards & Procedures Deployed:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 text-slate-200 border border-white/10"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Full warranty documentation issued to client</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookService(project.title);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm tracking-tight transition-all shadow-xl active:scale-95"
            >
              <span>Schedule Similar Job</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
