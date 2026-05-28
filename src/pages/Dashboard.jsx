import ConfigForm from "../components/configurations/ConfigForm";

export default function Dashboard({
  connected,
  selectedFile,
  logs,
  output,
  isFileSaved,
  handleFileSelection,
  handleFileUpload,
  runAlgorithm,
})  {
  return (
    <main className="flex-1 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary)] font-medium">
            Workspace / Analytical Dashboard
          </p>

          <h2 className="text-3xl xl:text-4xl font-bold mt-2 leading-tight text-[#5f4b7a]">
            Mutual Exclusivity Analysis in Cancer Genomics
          </h2>
        </div>

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
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Upload Data
            </h3>
          </div>

          <div className="rounded-2xl p-8 bg-[var(--surface)] text-center">
            <p className="text-[var(--secondary)] text-lg mb-4">
              Select file
            </p>

            <input
              type="file"
              onChange={handleFileSelection}
              className="block w-full text-sm text-[var(--secondary)] file:mr-4 file:rounded-xl file:border-0 file:bg-[var(--surface-soft)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--primary)] hover:file:bg-[var(--secondary-soft)]"
            />

            <div className="mt-6 text-sm text-[var(--text-muted)]">
              {selectedFile ? selectedFile.name : "No file selected"}
            </div>

            <button
              onClick={handleFileUpload}
              disabled={!selectedFile || !connected}
              className="mt-6 w-full rounded-xl px-5 py-3 font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary), var(--primary-soft))",
              }}
            >
              Save File to Server
            </button>
          </div>
        </section>

        <section className="bg-[var(--surface-container)] rounded-2xl p-6 shadow-sm">
          <ConfigForm
  onRun={runAlgorithm}
  isConnected={connected}
  isFileSaved={isFileSaved}
/>
        </section>
      </div>

      <section className="mt-8 bg-[var(--surface-container)] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[var(--secondary-soft)] text-[var(--secondary)] flex items-center justify-center font-bold">
            03
          </div>

          <h3
            className="text-2xl font-bold text-[var(--text-main)]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Process Logs
          </h3>
        </div>

        <div className="bg-[var(--log-bg)] rounded-2xl p-5 h-80 overflow-auto font-mono text-sm">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div
                key={index}
                className="text-[var(--log-text)] mb-2 whitespace-pre-wrap"
              >
                {log}
              </div>
            ))
          ) : (
            <div className="text-[var(--secondary)]">No logs yet</div>
          )}
        </div>
      </section>
    </main>
  );
}