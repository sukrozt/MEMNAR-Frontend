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
    const [selectedFile, setSelectedFile] = useState(null);

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
//asdasdasa
    function connect() {
        stompClient.activate();
    }

    function disconnect() {
        stompClient.deactivate();
        setConnected(false);
        console.log("Disconnected.");
    }

    function runAlgorithm() {
        console.log("Config saved. Sending Start command...");
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
        
        const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
        const totalChunks = Math.ceil(selectedFile.size / CHUNK_SIZE)+1;
        const fileName = selectedFile.name;

        console.log(`Starting upload: ${fileName} (${selectedFile.size} bytes), Total chunks: ${totalChunks}`);
        for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(selectedFile.size, start + CHUNK_SIZE);
            const chunk = selectedFile.slice(start, end);
            
            const chunkBase64 = await toBase64(chunk);
            const rawBase64 = chunkBase64.split(",")[1];

            stompClient.publish({
                destination: "/app/memnarjar/datainput",
                body: JSON.stringify({
                    name: fileName,
                    base64: rawBase64,
                    chunkIndex: i,
                    totalChunks: totalChunks
                })
            });

            console.log(`Uploaded chunk ${i + 1}/${totalChunks} (Size: ${chunk.size})`);            // Small delay to ensure server processes
            await new Promise(r => setTimeout(r, 50)); 
        }
        console.log("Upload Complete.");
    }


    function onStatusUpdate(status) {
        const response = JSON.parse(status.body);
        console.log("Received Output");
        setOutput(response.output); 
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

                    {/* Step 1: File Upload Section */}
                    <div className="card file-upload-section">
                        <h3>1. Upload Data</h3>
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
                    </div>

                    <hr />

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