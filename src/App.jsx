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
  <div className="min-h-screen bg-slate-950 text-white flex">
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-wide text-cyan-400">MEMNAR</h1>
        <p className="text-sm text-slate-400 mt-2">Bioinformatics Lab</p>

        <nav className="mt-10 space-y-3">
          <div className="bg-slate-800 text-cyan-400 px-4 py-3 rounded-lg">Dashboard</div>
          <div className="text-slate-300 px-4 py-3 rounded-lg">Sequencing</div>
          <div className="text-slate-300 px-4 py-3 rounded-lg">Analysis</div>
          <div className="text-slate-300 px-4 py-3 rounded-lg">Logs</div>
          <div className="text-slate-300 px-4 py-3 rounded-lg">Archive</div>
        </nav>
      </div>

      <div className="text-sm text-slate-500">
        {connected ? (
          <span className="text-emerald-400 font-semibold">Connected</span>
        ) : (
          <span className="text-red-400 font-semibold">Disconnected</span>
        )}
      </div>
    </aside>

    <main className="flex-1 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">Workspace / Analytical Dashboard</p>
          <h2 className="text-4xl font-bold mt-2">Sequence Analysis Workflow</h2>
        </div>

        <div className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm">
          {connected ? (
            <span className="text-emerald-400">● Connected</span>
          ) : (
            <span className="text-red-400">● Disconnected</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold">01</div>
            <h3 className="text-2xl font-semibold">Upload Data</h3>
          </div>

          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 bg-black/30 text-center">
            <p className="text-slate-300 text-lg mb-4">Select sequence file</p>

            <input
              type="file"
              onChange={handleFileSelection}
              className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-cyan-400"
            />

            <div className="mt-6 text-sm text-slate-400">
              {selectedFile ? selectedFile.name : "No file selected"}
            </div>

            <button
              onClick={handleFileUpload}
              disabled={!selectedFile || !connected}
              className="mt-6 w-full rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              Save File to Server
            </button>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <ConfigForm onRun={runAlgorithm} isConnected={connected} />
        </section>
      </div>

      <section className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold">03</div>
          <h3 className="text-2xl font-semibold">Process Logs</h3>
        </div>

        <div className="bg-black rounded-2xl border border-slate-800 p-5 h-80 overflow-auto font-mono text-sm">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="text-emerald-400 mb-2 whitespace-pre-wrap">
                {log}
              </div>
            ))
          ) : (
            <div className="text-slate-500">No logs yet</div>
          )}
        </div>
      </section>
    </main>
  </div>
);
}

export default App;