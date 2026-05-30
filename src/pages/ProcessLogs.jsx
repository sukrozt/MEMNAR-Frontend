import { useEffect, useRef } from "react";

export default function ProcessLogs({ logs }) {
  const hasLogs = logs.length > 0;

  const currentRun = {
    id: "CURRENT-RUN",
    dataset: "Current uploaded dataset",
    status: hasLogs ? "Active / Finished" : "No run yet",
    retention: "30 days",
    logCount: logs.length,
  };

  // Log penceresinin en altını referans almak için
  const logBottomRef = useRef(null);

  useEffect(() => {
    // Yeni log geldiğinde (logs dizisi değiştiğinde) en alta yumuşak bir şekilde kaydır
    logBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <main className="flex-1 p-6 xl:p-8 overflow-y-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] font-semibold">
        Workspace / Process Logs
      </p>

      <h1 className="text-4xl xl:text-5xl font-extrabold mt-3 text-[#6d6075]">
        Process Logs
      </h1>

      <div className="mt-8 space-y-6 max-w-6xl">

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-4">
            Current Run Logs
          </h2>

          <p className="text-base leading-8 text-[#4d4d4d]">
            This page displays real-time execution logs generated during MEMNAR
            analysis. Logs include dataset loading, candidate set generation,
            filtering steps and rule generation progress.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#4f4557]">
              Live Execution Log
            </h3>

            <span className="text-sm text-[#777]">
              {logs.length} log entries
            </span>
          </div>

          <div className="bg-[var(--log-bg)] rounded-2xl p-5 h-[500px] overflow-auto font-mono text-sm">

            {logs.length === 0 ? (
              <div className="text-[#8b7a93]">
                No logs yet
              </div>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className="text-[var(--log-text)] mb-2 leading-7"
                >
                  {log}
                </div>
              ))
            )}
          {/* Kaydırma hedefine odaklanacak görünmez element */}
          <div ref={logBottomRef} />
          </div>
        </section>

        {/* --- LOG ARCHIVE SECTION --- */}
        <div className="my-10 border-t-2 border-[#ece7ef]"></div>

        <h2 className="text-4xl font-extrabold mt-4 mb-8 text-[#6d6075]">
          Log Archive
        </h2>

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-4">
            Archived Process Logs
          </h2>

          <p className="text-base leading-8 text-[#4d4d4d]">
            This page keeps the execution history of MEMNAR runs. Process logs,
            selected parameters and generated outputs can be stored for a
            limited retention period so previous analyses can be reviewed later.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-xl font-bold text-[#4f4557]">
                  {currentRun.dataset}
                </h3>

                <span className="text-xs bg-[#f3edf6] text-[#6d6075] px-3 py-1 rounded-full font-semibold">
                  {currentRun.id}
                </span>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    hasLogs
                      ? "bg-[#e7f5ea] text-[#43664d]"
                      : "bg-[#f8e8ea] text-[#9c4f5b]"
                  }`}
                >
                  {currentRun.status}
                </span>
              </div>

              <p className="text-sm text-[#777] mt-2">
                This record reflects the latest log history kept in the current
                frontend session.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button className="rounded-2xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">
                View Logs
              </button>

              <button className="rounded-2xl bg-white border border-[#ece7ef] px-4 py-2 text-sm font-semibold text-[#4f4557]">
                Export Logs
              </button>

              <button className="rounded-2xl bg-[#fff5f6] border border-[#f1d7dc] px-4 py-2 text-sm font-semibold text-[#9c4f5b]">
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#faf7fb] rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8b7a93]">
                Logs
              </p>
              <p className="text-lg font-bold text-[#6d6075] mt-2">
                {currentRun.logCount}
              </p>
            </div>

            <div className="bg-[#faf7fb] rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8b7a93]">
                Retention
              </p>
              <p className="text-lg font-bold text-[#6d6075] mt-2">
                {currentRun.retention}
              </p>
            </div>

            <div className="bg-[#faf7fb] rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8b7a93]">
                Storage
              </p>
              <p className="text-lg font-bold text-[#6d6075] mt-2">
                Temporary
              </p>
            </div>

            <div className="bg-[#faf7fb] rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8b7a93]">
                Source
              </p>
              <p className="text-lg font-bold text-[#6d6075] mt-2">
                WebSocket
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f3f8] rounded-3xl p-5 border border-[#e6ddec]">
          <h2 className="text-xl font-bold text-[#4f4557] mb-3">
            Archive Retention Policy
          </h2>

          <p className="text-sm leading-7 text-[#555]">
            Uploaded datasets and generated outputs should be stored only
            temporarily. Process logs and run metadata can be retained for a
            defined period, such as 30 days, to support reproducibility and
            review of previous analyses.
          </p>
        </section>
      </div>
    </main>
  );
}