import { useState, useEffect } from 'react';
import './App.css';
import ConfigForm from './components/configurations/ConfigForm';
import ResultForm from './components/configurations/ResultForm';
import FileUploadForm from './components/FileUploadForm';
import Sidebar from './components/Sidebar';
import * as StompJs from "@stomp/stompjs";

const stompClient = new StompJs.Client({
    brokerURL: "ws://localhost:8080/websocket-connect"
});

function App() {
    const [connected, setConnected] = useState(false);
    const [output, setOutput] = useState(null); 
    const [statusMessage, setStatusMessage] = useState('Waiting for action...');
    const [selectedFile, setSelectedFile] = useState(null);
    const [logs, setLogs] = useState([]);
    const [isFileSaved, setIsFileSaved] = useState(false);

    //to subscribe to server
    useEffect(() => {
        stompClient.onConnect = (frame) => {
            setConnected(true);
            console.log("Connected: " + frame);
            stompClient.subscribe("/memnarjar/status", (status) => {
                onStatusUpdate(status);
            });
        };

        stompClient.onWebSocketClose = () => {
            setConnected(false);
            console.log("WebSocket disconnected.");
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
        if (!stompClient.connected) {
            alert("Not connected to the server! Please wait or refresh.");
            return;
        }
        setOutput(null);
        setStatusMessage('Running algorithm...');
        console.log("Sending Start command...");
        stompClient.publish({
            destination: "/app/memnarjar/start"
        });
    }

    async function uploadData(selectedFile) {
        if (!selectedFile) return;
        
        if (!stompClient.connected) {
            console.error("Not connected to the server.");
            return;
        }
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

        if (!stompClient.connected) {
            alert("Not connected to the server! Please wait or refresh.");
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
                    totalChunks: totalChunks
                })
            });

            console.log(`Uploaded chunk ${i + 1}/${totalChunks}`);
            // Small delay to ensure server processes
            await new Promise(r => setTimeout(r, 50)); 
        }
        console.log("Upload Complete.");
        setIsFileSaved(true);
    }

//21.03.26 5. adım icin ekliyorum;
    function onStatusUpdate(status) {
        let message = 'Status update received.';
        let responseOutput = '';
        var d = new Date();
        var isFinished;

        try {
            const response = JSON.parse(status.body);
            message = response?.message || message;
            responseOutput = response?.output || '';
            isFinished = message.startsWith('FINISHED');

            if (!isFinished) {
                message = "\[" + d.toLocaleString() + "\] " + message + " - " + responseOutput;
            }
        } catch (e) {
            // Fallback in case the server sends plain text instead of JSON
            message = status.body;
        }

        console.log('Status update:', message);

        // Only show the result template after algorithm completion.
        if (isFinished) {
            setOutput(responseOutput);
        } else {
            setStatusMessage(message);
            setLogs(prev => [...prev, message]);
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
            setIsFileSaved(false);
        }
    }

    return (
  //<div className="min-h-screen bg-slate-950 text-white flex">
  //<div className="min-h-screen bg-[#f6f3f8] text-[#4f4660] flex">
  <div className="min-h-screen w-full flex bg-[var(--surface)] text-[var(--text-main)]">
    <Sidebar connected={connected} />

    <main className="flex-1 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary)] font-medium">
  Workspace / Analytical Dashboard
</p>
<h2 className="text-3xl xl:text-4xl font-bold mt-2 leading-tight text-[#5f4b7a]">
  Mutual Exclusivity Analysis in Cancer Genomics
</h2>        </div>

<div className="rounded-full bg-white px-4 py-2 text-sm shadow-sm text-[var(--primary)]">
          {connected ? (
            <span className="text-emerald-400">● Connected</span>
          ) : (
            <span className="text-red-400">● Disconnected</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {output ? (
          <div className="col-span-1 xl:col-span-2 bg-[var(--surface-container)] rounded-2xl p-6 shadow-sm">
              <ResultForm 
              output={output} onBack={() => setOutput(null)} />
          </div>
        ) : (
          <>
            <FileUploadForm
              handleFileSelection={handleFileSelection}
              selectedFile={selectedFile}
              statusMessage={statusMessage}
              handleFileUpload={handleFileUpload}
              connected={connected}
            />
            <section className="bg-[var(--surface-container)] rounded-2xl p-6 shadow-sm">
              <ConfigForm 
                onRun={runAlgorithm}
                isConnected={connected}
                isFileSaved={isFileSaved} />
            </section>
        </>
        )}
      </div>

<section className="mt-8 bg-[var(--surface-container)] rounded-2xl p-6 shadow-sm">        <div className="flex items-center gap-3 mb-5">
<div className="w-10 h-10 rounded-full bg-[var(--secondary-soft)] text-[var(--secondary)] flex items-center justify-center font-bold">
  03
</div>
<h3
  className="text-2xl font-bold text-[var(--text-main)]"
  style={{ fontFamily: 'Manrope, sans-serif' }}
>
  Process Logs
</h3>        </div>

<div className="bg-[var(--log-bg)] rounded-2xl p-5 h-80 overflow-auto font-mono text-sm">
              {logs.length > 0 ? (
            logs.map((log, index) => (
<div key={index} className="text-[var(--log-text)] mb-2 whitespace-pre-wrap">    {log}
              </div>
            ))
          ) : (
<div className="text-[var(--secondary-soft)]">No logs yet</div>          )}
        </div>
      </section>
    </main>
  </div>
);
}

export default App;