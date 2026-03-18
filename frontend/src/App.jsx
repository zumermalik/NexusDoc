import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('prd');
  
  // Form State
  const [formData, setFormData] = useState({
    projectName: '',
    targetAudience: '',
    coreFeatures: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // The Magic Function: Talks to Backend and Triggers Download
  const handleGeneratePRD = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // Send the data to your Node Express server
      const response = await fetch('/api/generate/prd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Generation failed');

      // Convert the response into a downloadable file (Blob)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create a hidden link, click it to download, and remove it
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.projectName ? formData.projectName.replace(/\s+/g, '_') : 'PRD_Document'}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate document. Make sure your backend is running!');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex bg-[#0B0F19]">
      {/* Background glowing orbs */}
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
          <button onClick={() => setActiveTab('prd')} className={`px-4 py-3 rounded-xl text-left transition-all duration-300 ${activeTab === 'prd' ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>📄 PRD Generator</button>
          <button onClick={() => setActiveTab('api')} className={`px-4 py-3 rounded-xl text-left transition-all duration-300 ${activeTab === 'api' ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>⚡ API Docs</button>
          <button onClick={() => setActiveTab('audit')} className={`px-4 py-3 rounded-xl text-left transition-all duration-300 ${activeTab === 'audit' ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>🛡️ Security Audit</button>
        </nav>

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
        </header>

        {/* Dynamic Content Panel */}
        <div className="glass-panel rounded-3xl p-10 min-h-[55vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
          {activeTab === 'prd' && (
            <form onSubmit={handleGeneratePRD} className="relative z-10 flex flex-col gap-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Project Name</label>
                <input 
                  type="text" 
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="e.g., BioRevive AI" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Audience</label>
                <textarea 
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  placeholder="Describe who this product is for..." 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Core Features & Architecture</label>
                <textarea 
                  name="coreFeatures"
                  value={formData.coreFeatures}
                  onChange={handleChange}
                  placeholder="List the primary technical capabilities..." 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-32 resize-none"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={isGenerating}
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 flex items-center justify-center cursor-pointer"
              >
                {isGenerating ? 'Compiling Document...' : 'Generate PRD (.docx)'}
              </button>
            </form>
          )}

          {activeTab !== 'prd' && (
             <div className="flex flex-col items-center justify-center h-full text-center mt-20">
               <div className="text-4xl mb-4">🚧</div>
               <h3 className="text-xl font-medium text-white mb-2">Under Construction</h3>
               <p className="text-slate-400 text-sm">We will wire up this module next.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App