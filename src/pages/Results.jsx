export default function Results() {
  return (
    <main className="flex-1 p-6 xl:p-8 overflow-y-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] font-semibold">
        Workspace / Results
      </p>

      <h1 className="text-4xl xl:text-5xl font-extrabold mt-3 text-[#6d6075]">
        Analysis Results
      </h1>

      <div className="mt-8 flex items-center justify-center bg-white rounded-3xl p-10 shadow-sm border border-[#ece7ef] min-h-[400px]">
        <p className="text-lg text-[#8b7a93] font-medium text-center">
          Please upload your data and run MEMNAR first to see the results.
        </p>
      </div>
    </main>
  );
}