import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('prd');
  const [isGenerating, setIsGenerating] = useState(false);

  // Form States
  const [prdData, setPrdData] = useState({ projectName: '', targetAudience: '', coreFeatures: '' });
  const [apiData, setApiData] = useState({ apiName: '', baseUrl: '', endpoints: '' });
  const [auditData, setAuditData] = useState({ projectName: '', auditScope: 'Web Application', codeSnippet: '' });
  const handleAuditChange = (e) => setAuditData({ ...auditData, [e.target.name]: e.target.value });

  const handleGenerateAudit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auditData)
      });
      if (!response.ok) throw new Error('Generation failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${auditData.projectName ? auditData.projectName.replace(/\s+/g, '_') : 'Security_Audit'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to generate Audit. Make sure backend is running!');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Form Inputs
  const handlePrdChange = (e) => setPrdData({ ...prdData, [e.target.name]: e.target.value });
  const handleApiChange = (e) => setApiData({ ...apiData, [e.target.name]: e.target.value });

  // Route 1: Generate PRD (DOCX)
  const handleGeneratePRD = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate/prd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prdData)
      });
      if (!response.ok) throw new Error('Generation failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${prdData.projectName ? prdData.projectName.replace(/\s+/g, '_') : 'PRD'}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to generate PRD. Make sure backend is running!');
    } finally {
      setIsGenerating(false);
    }
  };

  // Route 2: Generate API (PDF)
  const handleGenerateAPI = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      });
      if (!response.ok) throw new Error('Generation failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${apiData.apiName ? apiData.apiName.replace(/\s+/g, '_') : 'API_Docs'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to generate PDF. Make sure backend is running!');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex bg-[#F6F8FA]">
      {/* Sidebar Navigation */}
      <aside className="w-64 h-screen p-5 flex flex-col gap-4 bg-white/40 backdrop-blur-3xl z-10 border-r border-slate-200/60">
        <div className="flex items-center gap-3 px-2 py-4 mb-4">
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center font-bold text-white text-lg shadow-md">
            N
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">NexusDoc</h1>
        </div>

        <nav className="flex flex-col gap-2">
          <button onClick={() => setActiveTab('prd')} className={`px-4 py-3 rounded-2xl text-left font-medium transition-all duration-300 ${activeTab === 'prd' ? 'bg-white text-black shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}>📄 PRD Generator</button>
          <button onClick={() => setActiveTab('api')} className={`px-4 py-3 rounded-2xl text-left font-medium transition-all duration-300 ${activeTab === 'api' ? 'bg-white text-black shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}>⚡ API Docs</button>
          <button onClick={() => setActiveTab('audit')} className={`px-4 py-3 rounded-2xl text-left font-medium transition-all duration-300 ${activeTab === 'audit' ? 'bg-white text-black shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}>🛡️ Security Audit</button>
        </nav>

        <div className="mt-auto p-4 rounded-2xl bg-white/60 border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Local Engine Active
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen p-12 z-10 relative overflow-y-auto">
        <header className="mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            {activeTab === 'prd' && 'Product Requirements'}
            {activeTab === 'api' && 'API Documentation'}
            {activeTab === 'audit' && 'Security Audit'}
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Configure and compile your local codebase securely.</p>
        </header>

        {/* Dynamic Content Panel */}
        <div className="glass-panel rounded-[2rem] p-10 min-h-[55vh] max-w-3xl">
          
          {/* PRD DOCS FORM */}
          {activeTab === 'prd' && (
            <form onSubmit={handleGeneratePRD} className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Project Name</label>
                <input type="text" name="projectName" value={prdData.projectName} onChange={handlePrdChange} placeholder="e.g., Nexus System" className="input-field" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Target Audience</label>
                <textarea name="targetAudience" value={prdData.targetAudience} onChange={handlePrdChange} placeholder="Describe who this product is for..." className="input-field h-24 resize-none" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Core Features & Architecture</label>
                <textarea name="coreFeatures" value={prdData.coreFeatures} onChange={handlePrdChange} placeholder="List the primary technical capabilities..." className="input-field h-32 resize-none" required />
              </div>

              <button type="submit" disabled={isGenerating} className="btn-primary">
                {isGenerating ? 'Compiling Document...' : '✓ Generate PRD (.docx)'}
              </button>
            </form>
          )}

          {/* API DOCS FORM */}
          {activeTab === 'api' && (
            <form onSubmit={handleGenerateAPI} className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Service Name</label>
                  <input type="text" name="apiName" value={apiData.apiName} onChange={handleApiChange} placeholder="e.g., Nexus Data API" className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Base URL</label>
                  <input type="text" name="baseUrl" value={apiData.baseUrl} onChange={handleApiChange} placeholder="https://api.example.com/v1" className="input-field" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Endpoints (Markdown/JSON format)</label>
                <textarea name="endpoints" value={apiData.endpoints} onChange={handleApiChange} placeholder="GET /users - Fetches all users&#10;POST /auth - Authenticates a session..." className="input-field h-40 resize-none" required />
              </div>

              <button type="submit" disabled={isGenerating} className="btn-primary">
                {isGenerating ? 'Rendering PDF...' : '✓ Generate API PDF'}
              </button>
            </form>
          )}

         {/* SECURITY AUDIT FORM */}
          {activeTab === 'audit' && (
            <form onSubmit={handleGenerateAudit} className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Target Name</label>
                  <input type="text" name="projectName" value={auditData.projectName} onChange={handleAuditChange} placeholder="e.g., Mempool.exe" className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Audit Scope</label>
                  <select name="auditScope" value={auditData.auditScope} onChange={handleAuditChange} className="input-field cursor-pointer">
                    <option>Web Application</option>
                    <option>Smart Contract / Web3</option>
                    <option>Cloud Infrastructure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Target Code / Architecture (Markdown)</label>
                <textarea name="codeSnippet" value={auditData.codeSnippet} onChange={handleAuditChange} placeholder="Paste the critical logic or smart contract code here..." className="input-field h-40 resize-none font-mono text-sm" required />
              </div>

              <button type="submit" disabled={isGenerating} className="btn-primary !bg-red-600 hover:!bg-red-700 shadow-[0_8px_20px_rgba(239,68,68,0.2)]">
                {isGenerating ? 'Compiling Audit...' : '🛡️ Generate Audit Report'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

export default App