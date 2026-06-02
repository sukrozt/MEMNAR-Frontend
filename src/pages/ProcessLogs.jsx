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
      </div>
    </main>
  );
}