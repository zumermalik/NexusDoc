import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('prd');

  return (
    <div className="relative min-h-screen w-full flex bg-[#0B0F19]">
      {/* Background glowing orbs for the Cluely effect */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar Navigation */}
      <aside className="w-64 h-screen p-5 flex flex-col gap-4 glass-panel z-10 border-r border-white/5 relative">
        <div className="flex items-center gap-3 px-2 py-4 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center font-bold text-white text-lg">
            N
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white/90">NexusDoc</h1>
        </div>

        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('prd')} 
            className={`px-4 py-3 rounded-xl text-left transition-all duration-300 ${activeTab === 'prd' ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            📄 PRD Generator
          </button>
          <button 
            onClick={() => setActiveTab('api')} 
            className={`px-4 py-3 rounded-xl text-left transition-all duration-300 ${activeTab === 'api' ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            ⚡ API Docs
          </button>
          <button 
            onClick={() => setActiveTab('audit')} 
            className={`px-4 py-3 rounded-xl text-left transition-all duration-300 ${activeTab === 'audit' ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            🛡️ Security Audit
          </button>
        </nav>

        {/* Local Server Status Indicator */}
        <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-white/5 glass-panel">
          <p className="text-xs text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Node Backend: Online
          </p>
        </div>
      </aside>

      {/* Main Content Dashboard */}
      <main className="flex-1 h-screen p-10 z-10 relative overflow-y-auto">
        <header className="flex justify-between items-center mb-10 mt-4">
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            {activeTab === 'prd' && 'Product Requirements Studio'}
            {activeTab === 'api' && 'API Documentation Engine'}
            {activeTab === 'audit' && 'Security Audit Compiler'}
          </h2>
          <button className="glass-panel px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
            Preferences
          </button>
        </header>

        {/* Central Action Panel */}
        <div className="glass-panel rounded-3xl p-12 min-h-[55vh] flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Subtle inner glow for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
          <div className="w-20 h-20 mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-2xl relative z-10">
            ✨
          </div>
          <h3 className="text-2xl font-medium mb-3 text-white">Ready to Compile</h3>
          <p className="text-slate-400 max-w-md mb-8 text-sm leading-relaxed">
            Select your codebase directory or provide your markdown inputs. NexusDoc will securely generate your structured documents locally.
          </p>
          
          <button className="bg-white text-black px-8 py-3.5 rounded-xl font-semibold hover:bg-slate-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] z-10 relative cursor-pointer">
            Select Source Data
          </button>
        </div>
      </main>
    </div>
  )
}

export default App