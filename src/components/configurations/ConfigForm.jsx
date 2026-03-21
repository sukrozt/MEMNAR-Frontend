import { useState, useEffect } from 'react';

function ConfigForm({ onRun, isConnected}) {
    const [config, setConfig] = useState({
        minSupp: 0.1,
        minConf: 0.5,
        findConditionalMutualExclusiveSets: true,
        findMutualExclusiveSets: true,
        minZScore: -10,
        maxSetSize: 6,
        pValueCutoff: 1.0,
        sortByPathway: false,
        tumorsOfInterest: "other"
    });
    
    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => { if (data) setConfig(data); })
            .catch(err => console.error("Failed to load config", err));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    // Button 1: Save Configuration Only
    const handleSaveConfig = async () => {
        try {
            const response = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            if (response.ok) {
                alert("Configuration Saved!");
            } else {
                alert("Failed to save config.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

   return (
  <div>
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold">02</div>
      <h3 className="text-2xl font-semibold">Configure & Run</h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm uppercase tracking-wide text-slate-400 mb-2">
          Min Support (0.0 - 1.0)
        </label>
        <input
          type="number"
          step="0.01"
          name="minSupp"
          value={config.minSupp}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wide text-slate-400 mb-2">
          Min Confidence (0.0 - 1.0)
        </label>
        <input
          type="number"
          step="0.01"
          name="minConf"
          value={config.minConf}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wide text-slate-400 mb-2">
          Min Z-Score
        </label>
        <input
          type="number"
          name="minZScore"
          value={config.minZScore}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wide text-slate-400 mb-2">
          Max Set Size
        </label>
        <input
          type="number"
          name="maxSetSize"
          value={config.maxSetSize}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>
    </div>

    <div className="mt-6 rounded-2xl border border-slate-800 bg-black/30 p-4 space-y-4">
      <label className="flex items-center gap-3 text-slate-200">
        <input
          type="checkbox"
          name="findMutualExclusiveSets"
          checked={config.findMutualExclusiveSets}
          onChange={handleChange}
          className="h-4 w-4 accent-cyan-400"
        />
        Find Mutual Exclusive Sets
      </label>

      <label className="flex items-center gap-3 text-slate-200">
        <input
          type="checkbox"
          name="findConditionalMutualExclusiveSets"
          checked={config.findConditionalMutualExclusiveSets}
          onChange={handleChange}
          className="h-4 w-4 accent-cyan-400"
        />
        Find Conditional Mutual Exclusive Sets
      </label>

      <label className="flex items-center gap-3 text-slate-200">
        <input
          type="checkbox"
          name="sortByPathway"
          checked={config.sortByPathway}
          onChange={handleChange}
          className="h-4 w-4 accent-cyan-400"
        />
        Sort By Pathway
      </label>
    </div>

    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <button
        className="flex-1 rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white hover:bg-slate-600"
        onClick={handleSaveConfig}
      >
        Save Configuration
      </button>

      <button
        className="flex-1 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        onClick={onRun}
        disabled={!isConnected}
      >
        Run Algorithm
      </button>
    </div>
  </div>
);
}

export default ConfigForm;