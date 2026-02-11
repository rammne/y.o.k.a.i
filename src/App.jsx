import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar from './components/Sidebar'
import ChatSession from './components/ChatSession'
import { personas } from './personas'

function App() {
  const [activePersona, setActivePersona] = useState(personas[0].id)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const themeClass = `theme-${activePersona}`

  return (
    <div className={`flex h-screen w-screen bg-[var(--secondary)] text-white overflow-hidden transition-all duration-700 ${themeClass}`}>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-[60] p-2.5 bg-black/70 border border-[var(--border)] rounded-lg text-white backdrop-blur-md hover:bg-black/90 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <Sidebar
        activePersona={activePersona}
        setActivePersona={setActivePersona}
        isMobileOpen={isMobileOpen}
        toggleMobile={setIsMobileOpen}
      />

      {/* Main Chat Area — flex-1 fills remaining space */}
      <main className="flex-1 flex flex-col h-full min-w-0 relative">

        {/* Ambient Background Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-1/2 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.04] blur-[120px] transition-colors duration-1000"
            style={{ background: `rgb(var(--primary-rgb))` }}
          />
          <div
            className="absolute -bottom-1/3 -left-1/4 w-[40vw] h-[40vw] rounded-full opacity-[0.03] blur-[100px] transition-colors duration-1000"
            style={{ background: `rgb(var(--primary-rgb))` }}
          />
        </div>

        {/* Scanline Effect (subtle) */}
        <div className="absolute inset-0 pointer-events-none z-[5] opacity-[0.015]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />

        {/* Chat Session */}
        <ChatSession key={activePersona} activePersona={activePersona} />

      </main>
    </div>
  )
}

export default App
