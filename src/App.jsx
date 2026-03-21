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
    const [logs, setLogs] = useState([]);

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
    //21032026
    
    function runAlgorithm() {
        setLogs([]);
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

//21.03.26 5. adım icin ekliyorum;
    function onStatusUpdate(status) {
        const response = JSON.parse(status.body);
        console.log(response);

        if (response.message) {
            setLogs(prev => [...prev, response.message]);
        }

        if (response.output && response.message?.includes("FINISHED")) {
            setOutput(response.output);
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
  //<div className="min-h-screen bg-slate-950 text-white flex">
  //<div className="min-h-screen bg-[#f6f3f8] text-[#4f4660] flex">
  <div className="min-h-screen w-full flex bg-[var(--surface)] text-[var(--text-main)]">
<aside className="w-64 bg-[var(--surface-sidebar)] p-6 flex flex-col justify-between">
      <div>
<h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--primary)]" style={{ fontFamily: 'Manrope, sans-serif' }}>
  MEMNAR
</h1>
        <p className="text-sm text-slate-400 mt-2">Negative Association Rule Mining for Cancer Genomics</p>

        <nav className="mt-10 space-y-3">


<div className="bg-[var(--surface-soft)] text-[var(--primary)] px-4 py-3 rounded-xl font-medium">
  Dashboard
</div>          <div className="text-[var(--secondary)] px-4 py-3 rounded-xl">Sequencing</div>
          <div className="text-[var(--secondary)] px-4 py-3 rounded-xl">Analysis</div>
          <div className="text-[var(--secondary)] px-4 py-3 rounded-xl">Logs</div>
          <div className="text-[var(--secondary)] px-4 py-3 rounded-xl">Archive</div>
        </nav>
      </div>

      <div className="text-sm text-slate-500">
        {connected ? (
<span className="text-[var(--primary)]">● Connected</span>        ) : (
<span className="text-[#b67b84]">● Disconnected</span>        )}
      </div>
    </aside>

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
<section className="bg-[var(--surface-container)] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
<div className="w-10 h-10 rounded-full bg-[var(--secondary-soft)] text-[var(--secondary)] flex items-center justify-center font-bold">
  01
</div>


<h3
  className="text-2xl font-bold text-[var(--text-main)]"
  style={{ fontFamily: 'Manrope, sans-serif' }}
>
  Upload Data
</h3>        </div>

<div className="rounded-2xl p-8 bg-[var(--surface)] text-center">

<p className="text-[var(--secondary)] text-lg mb-4">Select file</p>
            <input
              type="file"
              onChange={handleFileSelection}

className="block w-full text-sm text-[var(--secondary)] file:mr-4 file:rounded-xl file:border-0 file:bg-[var(--surface-soft)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--primary)] hover:file:bg-[var(--secondary-soft)]"              />

<div className="mt-6 text-sm text-[var(--text-muted)]">
                  {selectedFile ? selectedFile.name : "No file selected"}
            </div>

            <button
              onClick={handleFileUpload}
              disabled={!selectedFile || !connected}
className="mt-6 w-full rounded-xl px-5 py-3 font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
style={{
  background: 'linear-gradient(135deg, var(--primary), var(--primary-soft))'
}}            >
              Save File to Server
            </button>
          </div>
        </section>

<section className="bg-[var(--surface-container)] rounded-2xl p-6 shadow-sm">
          <ConfigForm onRun={runAlgorithm} isConnected={connected} />
        </section>
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
<div key={index} className="text-[var(--log-text)] mb-2 whitespace-pre-wrap">                {log}
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