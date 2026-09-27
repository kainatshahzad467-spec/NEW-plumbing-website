import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Star, Volume2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Testimonial } from '../types';

interface VideoModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  testimonial,
  isOpen,
  onClose,
  onBookService,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    let interval: any;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen || !testimonial) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#13161c] border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-colors"
          aria-label="Close video player"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Simulation Screen */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13161c] via-transparent to-black/40" />

          {/* Audio Waveform Animation in Top Corner */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs">
            <Volume2 className="w-3.5 h-3.5 text-[#10B981]" />
            <div className="flex items-center gap-0.5 h-3">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className={`w-0.5 bg-[#10B981] rounded-full transition-all duration-300 ${
                    isPlaying ? 'animate-pulse' : 'h-1'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.sin(i + progress) * 8 + 8}px` : '3px',
                  }}
                />
              ))}
            </div>
            <span className="text-slate-300 text-[11px] font-mono">00:48 / {testimonial.videoDuration || '01:14'}</span>
          </div>

          {/* Central Play/Pause Control */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative z-10 w-16 h-16 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-2xl transition-transform hover:scale-105"
            aria-label={isPlaying ? 'Pause Story' : 'Play Story'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-slate-900" />
            ) : (
              <Play className="w-6 h-6 fill-slate-900 translate-x-0.5" />
            )}
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
            <div
              className="h-full bg-[#10B981] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Video Story Details & Transcript */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {testimonial.name}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Client</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{testimonial.role}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-300">5.0 / 5.0</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
              Client Transcript
            </p>
            <p className="text-sm text-slate-200 italic leading-relaxed">
              "{testimonial.videoSnippet || testimonial.comment}"
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              <span className="block text-slate-500 font-medium">Service Rendered:</span>
              <span className="text-white font-semibold">{testimonial.serviceUsed}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookService(testimonial.serviceUsed);
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#F95700] hover:bg-[#e65000] text-white font-bold text-xs sm:text-sm tracking-tight transition-all shadow-lg active:scale-95"
            >
              <span>Schedule Same Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
