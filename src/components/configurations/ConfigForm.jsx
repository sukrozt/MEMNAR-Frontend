import { useState, useEffect, useRef } from 'react';

function ConfigForm({ onRun, isConnected, isFileSaved }) {
    const [config, setConfig] = useState({
        datasetName: "",
        minSupp: 0.1,
        minConf: 0.5,
        findConditionalMutualExclusiveSets: true,
        findMutualExclusiveSets: true,
        minZScore: -10,
        maxSetSize: 6,
        pvalueCutoff: 1.0,
        sortByPathway: false,
        tumorsOfInterest: "other",
        timeLimit: 0,
        unformatted: true
    });
    const [isConfigSaved, setIsConfigSaved] = useState(false);
    const [saveMessage, setSaveMessage] = useState("Please save configuration to continue.");
    
    useEffect(() => {
        fetch('http://localhost:8080/api/config')
            .then(res => res.json())
            .then(data => { 
                if (data) {
                    setConfig(data);
                    setSaveMessage("Loaded configuration from server. Please save to confirm.");
                } 
            })
            .catch(err => console.error("Failed to load config", err));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setIsConfigSaved(false);
        setSaveMessage("Unsaved changes...");
    };

    // Button 1: Save Configuration Only
    const handleSaveConfig = async () => {
        setSaveMessage("Saving configuration...");
        try {
            const response = await fetch('http://localhost:8080/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            if (response.ok) {
                setSaveMessage("Configuration saved to server.");
                setIsConfigSaved(true);
            } else {
                setSaveMessage(`Failed to save config. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error:", error);
            setSaveMessage("Error saving configuration.");
        }
    };

   return (
  <div>
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-full bg-[var(--secondary-soft)] text-[var(--secondary)] flex items-center justify-center font-bold">
        02
      </div>
      <h3
        className="text-2xl font-bold text-[var(--text-main)]"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Configure & Run
      </h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm uppercase tracking-wide text-[var(--text-muted)] mb-2">
          Min Support (0.0 - 1.0)
        </label>
        <input
          type="number"
          step="0.01"
          name="minSupp"
          value={config.minSupp}
          onChange={handleChange}
          className="w-full rounded-xl bg-[var(--surface)] px-4 py-3 text-[var(--text-main)] outline-none focus:ring-2"
          style={{ '--tw-ring-color': 'var(--primary-soft)' }}
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wide text-[var(--text-muted)] mb-2">
          Min Confidence (0.0 - 1.0)
        </label>
        <input
          type="number"
          step="0.01"
          name="minConf"
          value={config.minConf}
          onChange={handleChange}
          className="w-full rounded-xl bg-[var(--surface)] px-4 py-3 text-[var(--text-main)] outline-none focus:ring-2"
          style={{ '--tw-ring-color': 'var(--primary-soft)' }}
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wide text-[var(--text-muted)] mb-2">
          Min Z-Score
        </label>
        <input
          type="number"
          name="minZScore"
          value={config.minZScore}
          onChange={handleChange}
          className="w-full rounded-xl bg-[var(--surface)] px-4 py-3 text-[var(--text-main)] outline-none focus:ring-2"
          style={{ '--tw-ring-color': 'var(--primary-soft)' }}
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wide text-[var(--text-muted)] mb-2">
          Max Set Size
        </label>
        <input
          type="number"
          name="maxSetSize"
          value={config.maxSetSize}
          onChange={handleChange}
          className="w-full rounded-xl bg-[var(--surface)] px-4 py-3 text-[var(--text-main)] outline-none focus:ring-2"
          style={{ '--tw-ring-color': 'var(--primary-soft)' }}
        />
      </div>
    </div>

    <div className="mt-6 rounded-2xl bg-[var(--surface)] p-4 space-y-4">
      <label className="flex items-center gap-3 text-[var(--text-main)]">
        <input
          type="checkbox"
          name="findMutualExclusiveSets"
          checked={config.findMutualExclusiveSets}
          onChange={handleChange}
          className="h-4 w-4 accent-[var(--primary)]"
        />
        Find Mutual Exclusive Sets
      </label>

      <label className="flex items-center gap-3 text-[var(--text-main)]">
        <input
          type="checkbox"
          name="findConditionalMutualExclusiveSets"
          checked={config.findConditionalMutualExclusiveSets}
          onChange={handleChange}
          className="h-4 w-4 accent-[var(--primary)]"
        />
        Find Conditional Mutual Exclusive Sets
      </label>

      <label className="flex items-center gap-3 text-[var(--text-main)]">
        <input
          type="checkbox"
          name="sortByPathway"
          checked={config.sortByPathway}
          onChange={handleChange}
          className="h-4 w-4 accent-[var(--primary)]"
        />
        Sort By Pathway
      </label>

        <label className="flex items-center gap-3 text-[var(--text-main)]">
          <input
            type="checkbox"
            name="unformatted"
            checked={!!config.unformatted}
            onChange={handleChange}
            className="h-4 w-4 accent-[var(--primary)]"
          />
          My data is unformatted (Run DataConverter)
        </label>
    </div>

    <div className="mt-4 text-sm text-[var(--primary)] font-semibold">
      Config Message: {saveMessage}
    </div>

    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <button
        className="flex-1 rounded-xl bg-[var(--secondary-soft)] px-5 py-3 font-semibold text-[var(--secondary)] hover:opacity-90"
        onClick={handleSaveConfig}
      >
        Save Configuration
      </button>

      <button
        className="flex-1 rounded-xl px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: 'linear-gradient(135deg, var(--primary), var(--primary-soft))'
        }}
        onClick={onRun}
        disabled={!isConnected || !isFileSaved || !isConfigSaved}
        title={
          !isConnected ? "Not connected to server" :
          (!isFileSaved && !isConfigSaved) ? "you should upload file and configuration first" :
          !isFileSaved ? "Upload your data first" :
          !isConfigSaved ? "Save your configuration first" :
          ""
        }
      >
        Run Algorithm
      </button>
    </div>
  </div>
);
}

export default ConfigForm;