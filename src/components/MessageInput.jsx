import { useState } from 'react';
import { Send } from 'lucide-react';

const MessageInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const canSend = input.trim().length > 0 && !disabled;

  return (
    <div className="border-t border-[var(--border)] bg-black/60 backdrop-blur-xl relative z-20">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 md:px-8 py-4">
        <div className="relative flex items-end gap-3">

          {/* Input Container */}
          <div className="flex-1 relative group">
            {/* Glow */}
            <div className="absolute -inset-px rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm"
              style={{ background: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.4), rgba(var(--primary-rgb), 0.1))` }}
            />

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (canSend) handleSubmit(e);
                }
              }}
              placeholder="Type your message..."
              disabled={disabled}
              rows={1}
              className="relative w-full bg-[var(--surface)] border border-[var(--border)] group-focus-within:border-[var(--primary)]/40 text-[var(--text)] rounded-xl px-4 py-3 pr-4 focus:outline-none placeholder:text-gray-600 font-['Share_Tech_Mono'] text-sm resize-none min-h-[48px] max-h-28 overflow-y-auto transition-colors duration-300"
            />

            {/* Focus underline */}
            <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--primary)] rounded-full scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-center" />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!canSend}
            className={`
              flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 flex-shrink-0
              ${canSend
                ? 'bg-[var(--primary)] text-black hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] hover:scale-105 active:scale-95'
                : 'bg-[var(--surface)] text-gray-600 border border-[var(--border)] cursor-not-allowed'
              }
            `}
            aria-label="Send message"
          >
            <Send size={18} strokeWidth={2} />
          </button>

        </div>

        {/* Helper text */}
        <p className="text-[10px] text-gray-700 font-['Share_Tech_Mono'] mt-2 text-center">
          Press <kbd className="px-1 py-0.5 bg-white/5 rounded text-gray-500 border border-white/10">Enter</kbd> to send · <kbd className="px-1 py-0.5 bg-white/5 rounded text-gray-500 border border-white/10">Shift+Enter</kbd> for new line
        </p>
      </form>
    </div>
  );
};

export default MessageInput;
