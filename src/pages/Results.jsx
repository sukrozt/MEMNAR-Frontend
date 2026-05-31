import { useState, useEffect, useRef } from "react";

export default function Results() {
  const [activeTab, setActiveTab] = useState("normal");
  const [normalOutput, setNormalOutput] = useState(null);
  const [conditionalOutput, setConditionalOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        // Normal sonuçları çek
        const normalRes = await fetch("http://localhost:8080/results/normal");
        if (normalRes.ok) {
          setNormalOutput(await normalRes.text());
        }

        // Conditional sonuçları çek
        const conditionalRes = await fetch("http://localhost:8080/results/conditional");
        if (conditionalRes.ok) {
          setConditionalOutput(await conditionalRes.text());
        }
      } catch (error) {
        console.error("Sonuçları çekerken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  // İframe içindeki linklerin tıklanmasını engellemek için
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      try {
        const doc = iframe.contentDocument;
        if (doc) {
          doc.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link) {
              e.preventDefault();
            }
          });
        }
      } catch (err) {
        console.error("Iframe content document error:", err);
      }
    };

    iframe.addEventListener('load', onLoad);
    return () => {
      iframe.removeEventListener('load', onLoad);
    };
  }, [activeTab, normalOutput, conditionalOutput]);

  const hasResults = normalOutput || conditionalOutput;
  const currentOutput = activeTab === "normal" ? normalOutput : conditionalOutput;

  return (
    <main className="flex-1 p-6 xl:p-8 overflow-y-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] font-semibold">
        Workspace / Results
      </p>

      <div className="flex flex-col md:flex-row md:items-center justify-between mt-3 mb-8 gap-4">
        <h1 className="text-4xl xl:text-5xl font-extrabold text-[#6d6075]">
          Analysis Results
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {hasResults && (
            <div className="flex bg-[#f3edf6] p-1 rounded-2xl">
              <button
                onClick={() => setActiveTab("normal")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "normal"
                    ? "bg-white text-[var(--primary)] shadow-sm"
                    : "text-[#8b7a93] hover:text-[#6d6075]"
                }`}
              >
                Normal Results
              </button>
              <button
                onClick={() => setActiveTab("conditional")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "conditional"
                    ? "bg-white text-[var(--primary)] shadow-sm"
                    : "text-[#8b7a93] hover:text-[#6d6075]"
                }`}
              >
                Conditional Results
              </button>
            </div>
          )}

          <button
            onClick={() => window.location.href = "/"}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-sm hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-soft))' }}
          >
            Make a new calculation
          </button>
        </div>
      </div>

      <div className={`flex items-center justify-center bg-white rounded-3xl ${hasResults ? 'p-4' : 'p-10'} shadow-sm border border-[#ece7ef] min-h-[400px]`}>
        {isLoading ? (
          <p className="text-lg text-[#8b7a93] font-medium text-center">
            Loading results...
          </p>
        ) : !hasResults ? (
          <p className="text-lg text-[#8b7a93] font-medium text-center">
            Please upload your data and run MEMNAR first to see the results.
          </p>
        ) : currentOutput ? (
          <iframe
            ref={iframeRef}
            srcDoc={currentOutput}
            width="100%"
            className="w-full min-h-[600px] border-0 rounded-xl"
            sandbox="allow-scripts allow-same-origin"
            title="MEMNAR Analysis Results"
          />
        ) : (
          <p className="text-lg text-[#8b7a93] font-medium text-center">
            No data available for the selected view.
          </p>
        )}
      </div>
    </main>
  );
}