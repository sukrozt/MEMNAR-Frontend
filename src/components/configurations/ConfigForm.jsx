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
        <div className="config-card" style={{ padding: '20px', border: '1px solid #ccc' }}>
            <h3>2. Configure & Run</h3>
            
            <div className="form-group-row">
                <label>Min Support (0.0 - 1.0):</label>
                <input type="number" step="0.01" name="minSupp" value={config.minSupp} onChange={handleChange} />
            </div>

            <div className="form-group-row">
                <label>Min Confidence (0.0 - 1.0):</label>
                <input type="number" step="0.01" name="minConf" value={config.minConf} onChange={handleChange} />
            </div>

            <div className="form-group-row">
                <label>Min Z-Score (Integer):</label>
                <input type="number" name="minZScore" value={config.minZScore} onChange={handleChange} />
            </div>

            <div className="form-group-row">
                <label>Max Set Size (Integer):</label>
                <input type="number" name="maxSetSize" value={config.maxSetSize} onChange={handleChange} />
            </div>

            <hr/>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    <input type="checkbox" name="findMutualExclusiveSets" checked={config.findMutualExclusiveSets} onChange={handleChange} />
                    Find Mutual Exclusive Sets
                </label>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    <input type="checkbox" name="findConditionalMutualExclusiveSets" checked={config.findConditionalMutualExclusiveSets} onChange={handleChange} />
                    Find Conditional Mutual Exclusive Sets
                </label>
            </div>
            
             <div style={{ marginBottom: '20px' }}>
                <label>
                    <input type="checkbox" name="sortByPathway" checked={config.sortByPathway} onChange={handleChange} />
                    Sort By Pathway
                </label>
            </div>

            <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                <button 
                    className="btn btn-secondary" 
                    onClick={handleSaveConfig}
                    style={{flex: 1}}
                >
                    Save Configuration
                </button>

                <button 
                    className="btn btn-success" 
                    onClick={onRun} 
                    disabled={!isConnected}
                    style={{flex: 1}}
                >
                    Run Algorithm
                </button>
            </div>
        </div>
    );
}

export default ConfigForm;