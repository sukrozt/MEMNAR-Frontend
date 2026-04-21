import { useState, useEffect } from 'react';
import './App.css';
import ConfigForm from './components/configurations/ConfigForm';
import ResultForm from './components/configurations/ResultForm';
import * as StompJs from "@stomp/stompjs";

const stompClient = new StompJs.Client({
    brokerURL: "ws://localhost:8080/websocket-connect"
});

function App() {
    const [connected, setConnected] = useState(false);
    const [output, setOutput] = useState(null); 
    const [statusMessage, setStatusMessage] = useState('Waiting for action...');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUnformatted, setIsUnformatted] = useState(false);

    //to subscribe to server
    useEffect(() => {
        stompClient.onConnect = (frame) => {
            setConnected(true);
            console.log("Connected: " + frame);
            stompClient.subscribe("/memnarjar/status", (status) => {
                onStatusUpdate(status);
            });
        };

        stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
        
        stompClient.activate();
        return () => {
            if (stompClient.active) {
                stompClient.deactivate();
            }
        };
    }, []);

    function connect() {
        stompClient.activate();
    }

    function disconnect() {
        stompClient.deactivate();
        setConnected(false);
        console.log("Disconnected.");
    }

    function runAlgorithm() {
        setOutput(null);
        setStatusMessage('Running algorithm...');
        console.log("Sending Start command...");
        stompClient.publish({
            destination: "/app/memnarjar/start"
        });
    }

    async function uploadData(selectedFile) {
        if (!selectedFile) return;
        
        const out = await toBase64(selectedFile);
        const rawBase64 = out.split(",")[1];

        console.log("Uploading file...");
        stompClient.publish({
            destination: "/app/memnarjar/datainput",
            body: JSON.stringify({
                name: "mutation_data",
                base64: rawBase64
            })
        });

    }// This runs when you click the "Save File" button
    async function handleFileUpload() {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }
        
        // Convert the entire file to Base64 first to avoid corrupting data padding during chunking
        const fileBase64 = await toBase64(selectedFile);
        const rawBase64 = fileBase64.split(",")[1];

        // Reduce chunk size to avoid exceeding WebSocket message size limits (common default is 64KB).
        // 1MB is too large for many default server configurations.
        const CHUNK_SIZE = 60 * 1024; // 60KB string chunks
        const totalChunks = Math.ceil(rawBase64.length / CHUNK_SIZE);
        const fileName = selectedFile.name;

        console.log(`Starting upload: ${fileName} (Base64 length: ${rawBase64.length}), Total chunks: ${totalChunks}`);
        for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(rawBase64.length, start + CHUNK_SIZE);
            const chunk = rawBase64.slice(start, end);

            stompClient.publish({
                destination: "/app/memnarjar/datainput",
                body: JSON.stringify({
                    name: fileName,
                    base64: chunk,
                    chunkIndex: i,
                    totalChunks: totalChunks,
                    isUnformatted: isUnformatted // <-- Send the boolean to the backend
                })
            });

            console.log(`Uploaded chunk ${i + 1}/${totalChunks}`);
            // Small delay to ensure server processes
            await new Promise(r => setTimeout(r, 50)); 
        }
        console.log("Upload Complete.");
    }


    function onStatusUpdate(status) {
        let message = 'Status update received.';
        let responseOutput = '';

        try {
            const response = JSON.parse(status.body);
            message = response?.message || message;
            responseOutput = response?.output || '';
        } catch (e) {
            // Fallback in case the server sends plain text instead of JSON
            message = status.body;
        }

        console.log('Status update:', message);
        setStatusMessage(message);

        // Only show the result template after algorithm completion.
        if (message.startsWith('FINISHED')) {
            setOutput(responseOutput);
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

const handleFileSelection = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    }

    return (
        <div className="container">
            {output ? (
                <ResultForm output={output} onBack={() => setOutput(null)} />
            ) : (
                <div className="flex flex-column gap-8">
                    <div className="connection-status" style={{textAlign: 'right', marginBottom: '10px'}}>
                        Status: <strong style={{color: connected ? 'green' : 'red'}}>{connected ? "Connected" : "Disconnected"}</strong>
                    </div>
                    <div className="connection-status" style={{ marginBottom: '10px' }}>
                        Server Message: <strong>{statusMessage}</strong>
                    </div>

                    {/* Step 1: File Upload Section */}
                    <div className="card file-upload-section">
                        <h3>1. Upload Data</h3>
                        <div className="info-card" style={{ backgroundColor: '#eaf4f4', padding: '15px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.95em', color: '#333', border: '1px solid #cce3e3' }}>
                            <strong>Required Data Format:</strong>
                            <p style={{ marginTop: '8px', marginBottom: '8px' }}>
                                MEMNAR accepts datasets which have Patient IDs in the first column followed by mutations that
                                occurred in that particular patient all separated by space. So the dataset should be in current format:
                            </p>
                            <pre style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}>
                                {"P1 m1 m2 m3\nP2 m3 m1 m4"}
                            </pre>
                            <p style={{ marginBottom: 0 }}>
                                Where P1 P2 are patient IDs and m1, m2, m3, m4 are mutation names.
                            </p>
                        </div>
                        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                            <input type="file" onChange={handleFileSelection} />
                            <button 
                                className="btn btn-primary" 
                                onClick={handleFileUpload}
                                disabled={!connected || !selectedFile}
                            >
                                Save File to Server
                            </button>
                        </div>
                            {/* NEW CHECKBOX */}
                            <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <input 
                                    type="checkbox" 
                                    id="isUnformatted" 
                                    checked={isUnformatted} 
                                    onChange={(e) => setIsUnformatted(e.target.checked)} 
                                />
                                <label htmlFor="isUnformatted">My data is unformatted (Run DataConverter)</label>
                            </div>
                        </div>

                    <hr/>

                    {/* Step 2: Config Section */}
                    <div className="config-section">
                        <ConfigForm onRun={runAlgorithm} isConnected={connected}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;