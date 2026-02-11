import { personas } from '../personas';
import { ChevronRight } from 'lucide-react';

const Sidebar = ({ activePersona, setActivePersona, isMobileOpen, toggleMobile }) => {

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-black/95 border-r border-[var(--border)] backdrop-blur-xl
        transition-transform duration-300 ease-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:w-80
        flex flex-col
      `}
    >
      <div className="flex flex-col h-full">

        {/* ── Logo ──────────────────────────────────────── */}
        <div className="px-6 pt-8 pb-6 border-b border-[var(--border)]">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black font-['Bangers'] tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-cyan-400 leading-tight">
              Y.O.K.A.I
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--border)]" />
              <span className="text-[9px] text-gray-600 font-['Orbitron'] tracking-[0.3em] uppercase">
                Dandadan
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--border)]" />
            </div>
          </div>
        </div>

        {/* ── Persona List ──────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          <p className="px-3 mb-3 text-[10px] font-['Orbitron'] uppercase tracking-[0.2em] text-gray-600">
            Select Character
          </p>
          {personas.map((persona, index) => {
            const Icon = persona.icon;
            const isActive = activePersona === persona.id;

            return (
              <button
                key={persona.id}
                onClick={() => {
                  setActivePersona(persona.id);
                  if (window.innerWidth < 768) toggleMobile(false);
                }}
                className={`
                  w-full relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group
                  ${isActive
                    ? 'bg-[var(--primary)]/10 border border-[var(--primary)]/30 shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]'
                    : 'border border-transparent hover:bg-white/[0.03] hover:border-[var(--border)]'
                  }
                `}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Active left bar */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]" />
                )}

                {/* Icon */}
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300
                  ${isActive
                    ? 'bg-[var(--primary)] text-black shadow-[0_0_12px_rgba(var(--primary-rgb),0.4)]'
                    : 'bg-white/[0.04] text-gray-500 group-hover:text-gray-300 group-hover:bg-white/[0.06]'
                  }
                `}>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                </div>

                {/* Label */}
                <div className="flex-1 text-left min-w-0">
                  <p className={`text-sm font-['Orbitron'] font-semibold truncate transition-colors ${isActive ? 'text-[var(--text)]' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {persona.name}
                  </p>
                  <p className={`text-[10px] font-['Share_Tech_Mono'] uppercase tracking-wider truncate transition-colors ${isActive ? 'text-[var(--primary)]' : 'text-gray-600 group-hover:text-gray-500'}`}>
                    {persona.desc}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight size={14} className={`
                  transition-all duration-300
                  ${isActive ? 'text-[var(--primary)] opacity-100' : 'text-gray-700 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1'}
                `} />
              </button>
            );
          })}
        </nav>

        {/* ── Footer ────────────────────────────────────── */}
        <div className="px-6 py-5 border-t border-[var(--border)]">
          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600 font-['Share_Tech_Mono']">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            GEMINI API · READY
          </div>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
