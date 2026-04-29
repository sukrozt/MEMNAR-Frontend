import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';

function ConfigForm({ onRun, isConnected}) {
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
        timeLimit: 0
    });
    const stompClientRef = useRef(null);
    
    useEffect(() => {
    // Initialize the STOMP client
        const client = new Client({
            brokerURL: 'ws://localhost:8080/websocket-connect', // Ensure this matches your backend host/port
            onConnect: () => {
                console.log('Connected to WebSocket for Config');
                
                // 1. Subscribe to the config topic so we get the data when it's fetched or updated
                client.subscribe('/memnarjar/config', (message) => {
                    try {
                        const data = JSON.parse(message.body);
                        if (data) {
                            setConfig(data);
                        }
                    } catch (error) {
                        console.error("Failed to parse WebSocket message:", error);
                    }
                });

                // 2. Once connected and subscribed, ask the server for the current config
                client.publish({ destination: '/app/config/get' });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
            onWebSocketError: (error) => {
                console.error('Error with websocket', error);
            }
        });

        // Activate the connection
        client.activate();
        stompClientRef.current = client;

        // Cleanup on component unmount
        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
            }
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Button 1: Save Configuration Only
    const handleSaveConfig = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            // Send the updated config over WebSocket
            stompClientRef.current.publish({
                destination: '/app/config/save',
                body: JSON.stringify(config)
            });
            alert("Configuration save request sent!");
            // Note: The UI will automatically update if the server broadcasts the saved config back to '/memnarjar/config'
        } else {
            alert("Cannot save config: WebSocket is disconnected.");
        }
    };
    
    // 2. THE FIX: Stop rendering here if config is null! 
    // This prevents the React crash.
    if (!config) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                <p>Loading configuration...</p>
            </div>
        );
    }

    return (
        <div className="config-card" style={{ padding: '20px', border: '1px solid #ccc' }}>
            <h3>2. Configure & Run</h3>
            
            <div className="form-group-row">
                <label>Dataset Name:</label>
                <input type="text" name="datasetName" value={config.datasetName || ''} onChange={handleChange} />
            </div>

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

        <div className="form-group-row">
            <label>P-Value Cutoff:</label>
            <input type="number" step="0.01" name="pvalueCutoff" value={config.pvalueCutoff ?? ''} onChange={handleChange} />
        </div>

        <div className="form-group-row">
            <label>Tumors of Interest:</label>
            <input type="text" name="tumorsOfInterest" value={config.tumorsOfInterest || ''} onChange={handleChange} />
        </div>

        <div className="form-group-row">
            <label>Time Limit:</label>
            <input type="number" name="timeLimit" value={config.timeLimit} onChange={handleChange} />
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