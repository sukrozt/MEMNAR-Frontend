export default function Sequencing() {
  const pipelineSteps = [
    "Raw Dataset",
    "DataConverter.jar",
    "Filtered Mutation Data",
    "MEMNAR Config",
    "Negative Rules",
    "ME / CME Sets",
  ];

  return (
    <main className="flex-1 p-6 xl:p-8 overflow-y-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] font-semibold">
        Workspace / Sequencing
      </p>

      <h1 className="text-4xl xl:text-5xl font-extrabold mt-3 text-[#6d6075]">
        Sequencing Workflow
      </h1>

      <div className="mt-8 space-y-6 max-w-full">
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-4">
            What does this page show?
          </h2>

          <p className="text-base leading-8 text-[#4d4d4d]">
            This page explains how mutation data is prepared before it is
            analyzed by MEMNAR. It shows the expected input format, the role of
            DataConverter.jar, the filtering process and how the prepared
            dataset becomes suitable for mutual exclusivity analysis.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-5">
            Dataset Preparation Pipeline
          </h2>

          <div className="overflow-x-auto py-3">
            <div className="flex items-center gap-3 min-w-max">
              {pipelineSteps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className="w-[170px] bg-[#faf7fb] rounded-2xl p-4 border border-[#ece7ef] shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#d9cde3] text-[#5d4e69] flex items-center justify-center font-bold mb-4 text-base">
                      {index + 1}
                    </div>

                    <p className="text-[#4f4557] font-semibold text-base leading-7">
                      {step}
                    </p>
                  </div>

                  {index !== pipelineSteps.length - 1 && (
                    <div className="mx-2 flex items-center">
                      <svg
                        width="36"
                        height="18"
                        viewBox="0 0 60 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 12H54"
                          stroke="#8b7a93"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M44 4L54 12L44 20"
                          stroke="#8b7a93"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
            <h3 className="text-xl font-bold text-[#4f4557] mb-4">
              Input Dataset Format
            </h3>

            <p className="text-sm leading-8 text-[#555]">
              MEMNAR expects patient-based mutation data. Each row represents a
              patient and the first value is the patient identifier. The
              remaining values represent mutations observed in that patient.
            </p>

            <div className="mt-5 bg-[#f7f3f8] rounded-2xl p-4 font-mono text-[#6d6075] text-sm leading-7">
              P1 TP53 GATA3 CDH1
              <br />
              P2 PIK3CA PTEN
              <br />
              P3 CDK4 CDKN2A RB1
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
            <h3 className="text-xl font-bold text-[#4f4557] mb-4">
              DataConverter Workflow
            </h3>

            <p className="text-sm leading-8 text-[#555]">
              DataConverter.jar is used before MEMNAR execution when the input
              data needs to be transformed into the filtered format expected by
              the MEMNAR algorithm.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#555] leading-8">
              <li>• Reads raw mutation data</li>
              <li>• Applies formatting and filtering steps</li>
              <li>• Produces MEMNAR-compatible mutation data</li>
              <li>• Passes the filtered dataset to the MEMNAR pipeline</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-6">
            Example Mutation Statistics
          </h2>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              ["Patients", "100"],
              ["Mutations", "34"],
              ["Candidate Sets", "542"],
              ["After Filtering", "61"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-[#faf7fb] rounded-2xl p-5 border border-[#ece7ef]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#8b7a93]">
                  {label}
                </p>

                <p className="text-3xl font-extrabold text-[#6d6075] mt-2">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
            <h3 className="text-xl font-bold text-[#4f4557] mb-4">
              Candidate Set Filtering
            </h3>

            <div className="space-y-3">
              {[
                ["Generated candidate sets", "542"],
                ["Remaining after support filtering", "61"],
                ["1 positive / 1 negative itemsets", "18"],
                ["1 positive / 2 negative itemsets", "7"],
                ["2 positive / 1 negative itemsets", "3"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between bg-[#faf7fb] rounded-2xl px-4 py-3"
                >
                  <span className="text-sm text-[#555]">{label}</span>
                  <span className="font-bold text-[#6d6075] text-sm">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
            <h3 className="text-xl font-bold text-[#4f4557] mb-4">
              Parameter Impact
            </h3>

            <div className="space-y-4 text-sm text-[#555] leading-8">
              <p>
                <span className="font-bold text-[#4f4557]">minsupp</span>{" "}
                controls the minimum mutation frequency required for keeping a
                mutation set during candidate generation.
              </p>

              <p>
                <span className="font-bold text-[#4f4557]">minconf</span>{" "}
                controls whether a generated rule has sufficient confidence to
                be retained.
              </p>

              <p>
                Higher threshold values usually reduce the number of retained
                itemsets and rules. Lower values may increase runtime and memory
                usage.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-6">
            Mutation Matrix Preview
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-2">
              <thead>
                <tr>
                  {["Patient", "TP53", "GATA3", "CDH1", "PIK3CA", "PTEN"].map(
                    (header) => (
                      <th
                        key={header}
                        className="bg-[#f7f3f8] text-[#4f4557] rounded-xl px-3 py-2 text-left text-sm"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {[
                  ["P1", 1, 1, 0, 0, 0],
                  ["P2", 0, 0, 1, 1, 0],
                  ["P3", 1, 0, 0, 0, 1],
                  ["P4", 0, 1, 0, 1, 0],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td
                        key={index}
                        className="bg-[#faf7fb] rounded-xl px-3 py-2 text-sm text-[#555]"
                      >
                        {index === 0 ? (
                          cell
                        ) : cell === 1 ? (
                          <span className="text-[#43664d] font-bold">●</span>
                        ) : (
                          <span className="text-[#c8bdcf]">○</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#777] mt-4">
            Simplified binary mutation matrix representation used for explaining
            the MEMNAR preprocessing workflow.
          </p>
        </section>
      </div>
    </main>
  );
}