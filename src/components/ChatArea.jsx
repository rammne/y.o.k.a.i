import { useRef, useEffect } from 'react';
import { User, Bot, ArrowRight } from 'lucide-react';
import { personas } from '../personas';

const ChatArea = ({ messages, activePersona, isTyping, onSuggestionClick }) => {
  const scrollRef = useRef(null);
  const currentPersona = personas.find(p => p.id === activePersona);
  const PersonaIcon = currentPersona?.icon || Bot;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const SUGGESTIONS = {
    turbo: [
      "Tell me about your speed powers!",
      "What do you think of Okarun?",
      "Race me if you can!",
      "Why are you called Turbo Granny?",
    ],
    aira: [
      "Tell me about your acrobatics!",
      "What do you think of Momo?",
      "Do you believe in the occult?",
      "What happened at the tunnel?",
    ],
    serpo: [
      "What planet are you from?",
      "Tell me about your species.",
      "What is your mission on Earth?",
      "Do you know the Flatwoods Monster?",
    ],
  };

  const suggestions = SUGGESTIONS[activePersona] || SUGGESTIONS.turbo;

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth h-full relative">

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-6 space-y-6">

        {/* ── Empty State ─────────────────────────────── */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-in-up">

            {/* Persona Icon */}
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full animate-float" style={{
                background: `radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%)`,
                transform: 'scale(2.5)',
                filter: 'blur(20px)',
              }} />
              <div className="relative w-24 h-24 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-[0_0_40px_rgba(var(--primary-rgb),0.1)] animate-float">
                <PersonaIcon size={40} className="text-[var(--primary)]" strokeWidth={1.5} />
              </div>
            </div>

            {/* Greeting */}
            <h2 className="text-2xl md:text-3xl font-['Bangers'] text-[var(--text)] tracking-wider mb-3">
              {currentPersona?.name || 'SYSTEM'}
            </h2>
            <p className="font-['Share_Tech_Mono'] text-gray-500 text-sm max-w-sm leading-relaxed mb-10">
              {currentPersona?.intro || 'Select a character to begin.'}
            </p>

            {/* Suggestions */}
            <div className="w-full max-w-md space-y-2">
              <p className="text-[10px] font-['Orbitron'] uppercase tracking-[0.2em] text-gray-600 mb-3">
                Suggested Questions
              </p>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => onSuggestionClick?.(s)}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--primary)]/30 text-sm font-['Share_Tech_Mono'] text-gray-400 hover:text-[var(--text)] text-left flex items-center justify-between group transition-all duration-300"
                  style={{ animationDelay: `${i * 100 + 300}ms` }}
                >
                  <span>{s}</span>
                  <ArrowRight size={14} className="text-[var(--primary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Messages ────────────────────────────────── */}
        {messages.map((msg, index) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : ''}`}>

                {/* Avatar */}
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-1
                  ${isUser
                    ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                    : 'bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)]'
                  }
                `}>
                  {isUser ? <User size={14} /> : <PersonaIcon size={14} />}
                </div>

                {/* Bubble */}
                <div className={`
                  px-4 py-3 rounded-2xl relative
                  ${isUser
                    ? 'bg-[var(--primary)] text-black rounded-tr-sm'
                    : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-tl-sm'
                  }
                `}>
                  {/* Header */}
                  <div className={`flex items-center gap-2 mb-1.5 text-[10px] font-['Share_Tech_Mono'] uppercase tracking-wider ${isUser ? 'text-black/50' : 'text-gray-600'}`}>
                    <span>{isUser ? 'You' : msg.senderName}</span>
                    <span className="opacity-30">·</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Body */}
                  <p className={`font-['Share_Tech_Mono'] text-[0.95rem] leading-relaxed whitespace-pre-wrap ${isUser ? 'text-black' : ''}`}>
                    {msg.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* ── Typing Indicator ────────────────────────── */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mt-1 text-[var(--primary)]">
                <PersonaIcon size={14} />
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] px-5 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={scrollRef} className="h-2" />
      </div>
    </div>
  );
};

export default ChatArea;
