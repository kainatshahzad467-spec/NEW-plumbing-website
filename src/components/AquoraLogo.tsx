import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
}

export const AquoraLogo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  theme = 'light',
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  };

  const textStyles = {
    sm: 'text-xl tracking-tight',
    md: 'text-2xl sm:text-[28px] tracking-tight',
    lg: 'text-3xl sm:text-4xl tracking-tight',
    xl: 'text-4xl sm:text-5xl tracking-tight',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Premium Architectural Aquora Emblem: Emerald & Aqua Marine Waterdrop / Vortex */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconDimensions[size]}`}>
        {/* Ambient back-glow matching website theme primary emerald #10B981 / #00E575 */}
        <div className="absolute inset-0 bg-[#10B981]/25 rounded-2xl blur-md transition-opacity duration-300 group-hover:opacity-100 group-hover:blur-lg" />

        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-transform duration-300 group-hover:scale-105"
        >
          {/* Deep sleek metallic dark foundation squircle with subtle emerald border */}
          <rect width="48" height="48" rx="14" fill="url(#aquora-base-grad)" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />

          {/* Fluid Modern Hydro-Vortex Geometric Monogram in Website Emerald/Teal Gradient */}
          <path
            d="M24 10C24 10 15 21.2 15 27.5C15 32.7467 19.0294 37 24 37C28.9706 37 33 32.7467 33 27.5C33 21.2 24 10 24 10Z"
            fill="url(#aquora-drop-grad)"
          />

          {/* Inner negative space dynamic swirl cut */}
          <path
            d="M24 16C24 16 18.5 23.5 18.5 28C18.5 31.0376 20.9624 33.5 24 33.5C27.0376 33.5 29.5 31.0376 29.5 28C29.5 25.5 28 23 26 21.5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Glowing central precision droplet */}
          <circle cx="24" cy="28" r="2.8" fill="white" />

          <defs>
            {/* Sleek Dark Tech Base */}
            <linearGradient id="aquora-base-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#131B24" />
              <stop offset="1" stopColor="#0B1118" />
            </linearGradient>

            {/* Website Primary Emerald & Aqua Marine Gradient */}
            <linearGradient id="aquora-drop-grad" x1="15" y1="10" x2="33" y2="37" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="0.55" stopColor="#10B981" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {!iconOnly && (
        <span
          className={`font-extrabold leading-none ${textStyles[size]} ${
            theme === 'light'
              ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]'
              : 'text-slate-950'
          }`}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: '-0.035em',
          }}
        >
          Aquora
        </span>
      )}
    </div>
  );
};
