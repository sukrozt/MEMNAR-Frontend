import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";

import Dashboard from "./pages/Dashboard";
import AboutMemnar from "./pages/AboutMemnar";
import Sequencing from "./pages/Sequencing";
import Results from "./pages/Results";
import ProcessLogs from "./pages/ProcessLogs";
import RunArchive from "./pages/RunArchive";
import AboutUs from "./pages/AboutUs";
import ResultForm from "./components/configurations/ResultForm";

const stompClient = new StompJs.Client({
  brokerURL: "ws://localhost:8080/websocket-connect",
});

function SidebarLink({ to, children }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-3 rounded-xl font-medium transition ${
        active
          ? "bg-[var(--surface-soft)] text-[var(--primary)]"
          : "text-[var(--secondary)] hover:bg-[var(--surface-soft)]"
      }`}
    >
      {children}
    </Link>
  );
}

function App() {
  const [connected, setConnected] = useState(false);
  const [output, setOutput] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Waiting for action...");
  const [selectedFile, setSelectedFile] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isFileSaved, setIsFileSaved] = useState(false);

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
      console.error("Error with websocket", error);
      setConnected(false);
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    stompClient.activate();

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, []);

  function runAlgorithm() {
    if (!stompClient.connected) {
      alert("Not connected to the server! Please wait or refresh.");
      return;
    }

    setOutput(null);
    setLogs([]);
    setStatusMessage("Running algorithm...");
    console.log("Sending Start command...");

    stompClient.publish({
      destination: "/app/memnarjar/start",
    });
  }

  async function handleFileUpload() {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    if (!stompClient.connected) {
      alert("Not connected to the server! Please wait or refresh.");
      return;
    }

    const fileBase64 = await toBase64(selectedFile);
    const rawBase64 = fileBase64.split(",")[1];
    const CHUNK_SIZE = 60 * 1024;
    const totalChunks = Math.ceil(rawBase64.length / CHUNK_SIZE);
    const fileName = selectedFile.name;

    console.log(
      `Starting upload: ${fileName} (Base64 length: ${rawBase64.length}), Total chunks: ${totalChunks}`
    );

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
          totalChunks,
        }),
      });

      console.log(`Uploaded chunk ${i + 1}/${totalChunks}`);
      await new Promise((r) => setTimeout(r, 50));
    }

    console.log("Upload Complete.");
    setIsFileSaved(true);
    setStatusMessage("File saved to server.");
  }

  function onStatusUpdate(status) {
    let message = "Status update received.";
    let responseOutput = "";
    let isFinished = false;

    try {
      const response = JSON.parse(status.body);
      message = response?.message || message;
      responseOutput = response?.output || "";
      isFinished = message.startsWith("FINISHED") || message.includes("-----FINISHED-----");

      if (!isFinished) {
        const time = new Date().toLocaleString();
        message = `[${time}] ${message}${responseOutput ? ` - ${responseOutput}` : ""}`;
      }
    } catch (e) {
      message = status.body;
      isFinished = message.startsWith("FINISHED") || message.includes("-----FINISHED-----");
    }

    console.log("Status update:", message);

    if (isFinished) {
      if (responseOutput) {
        setOutput(responseOutput);
      }
      setStatusMessage("Algorithm finished.");
      setLogs((prev) => [...prev, message]);
    } else {
      setStatusMessage(message);
      setLogs((prev) => [...prev, message]);
    }
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  function handleFileSelection(e) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsFileSaved(false);
      setStatusMessage("File selected. Save it to the server before running MEMNAR.");
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-[var(--surface)] text-[var(--text-main)]">
      <aside className="w-64 bg-[var(--surface-sidebar)] p-6 flex flex-col justify-between">
        <div>
          <h1
            className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--primary)]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            MEMNAR
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Negative Association Rule Mining for Cancer Genomics
          </p>

          <nav className="mt-10 space-y-3 flex flex-col">
            <SidebarLink to="/">Dashboard</SidebarLink>
            <SidebarLink to="/about-memnar">About MEMNAR</SidebarLink>
            <SidebarLink to="/sequencing">Sequencing</SidebarLink>
            <SidebarLink to="/results">Results</SidebarLink>
            <SidebarLink to="/process-logs">Process Logs</SidebarLink>
            <SidebarLink to="/run-archive">Run Archive</SidebarLink>
            <SidebarLink to="/about-us">About Us</SidebarLink>
          </nav>
        </div>

        <div className="text-sm text-slate-500">
          {connected ? (
            <span className="text-[var(--primary)]">● Connected</span>
          ) : (
            <span className="text-[#b67b84]">● Disconnected</span>
          )}
        </div>
      </aside>

      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
  connected={connected}
  selectedFile={selectedFile}
  logs={logs}
  output={output}
  isFileSaved={isFileSaved}
  handleFileSelection={handleFileSelection}
  handleFileUpload={handleFileUpload}
  runAlgorithm={runAlgorithm}
/>
          }
        />

        <Route path="/about-memnar" element={<AboutMemnar />} />
        <Route path="/sequencing" element={<Sequencing />} />
        <Route
          path="/results"
          element={
            output ? (
              <main className="flex-1 p-8">
                <ResultForm output={output} onBack={() => setOutput(null)} />
              </main>
            ) : (
              <Results />
            )
          }
        />
        <Route path="/process-logs" element={<ProcessLogs logs={logs} />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/run-archive" element={<RunArchive logs={logs} />} />
      </Routes>
    </div>
  );
}

export default App;
