export default function AboutMemnar() {
  const pipelineSteps = [
    "Raw Dataset",
    "DataConverter.jar",
    "Filtered Mutation Data",
    "MEMNAR Config",
    "Negative Rules",
    "ME / CME Sets",
  ];

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary)] font-medium">
        Workspace / About MEMNAR
      </p>

      <h2 className="text-3xl xl:text-4xl font-bold mt-2 leading-tight text-[#5f4b7a]">
        About MEMNAR
      </h2>

      <div className="mt-8 space-y-6 max-w-6xl">
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-6">
            What is MEMNAR?
          </h2>

          <p className="text-[var(--text-main)] leading-9 text-[#4d4d4d]">
            MEMNAR is a computational method proposed for identifying mutually
            exclusive mutation gene sets through negative association rule
            mining. The method analyzes patient mutation data and constructs
            mutually exclusive gene sets based on extracted negative association
            rules.
          </p>

          <p className="text-[var(--text-main)] leading-9 text-[#4d4d4d] mt-6">
            The motivation behind MEMNAR is based on the observation that
            certain gene mutations tend not to occur concurrently in the same
            patient. These mutual exclusivity patterns may indicate functional
            relationships between genes and may help study cancer-driver
            alterations.
          </p>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
            <h3 className="text-2xl font-bold text-[#4f4557] mb-5">
              Negative Association Rules
            </h3>

            <p className="text-base leading-8 text-[#555]">
              MEMNAR formulates mutual exclusivity as a negative association
              rule mining problem. A negative association rule represents a
              relation where the presence of one mutation set is associated with
              the absence of another mutation set.
            </p>

            <div className="mt-6 bg-[#f7f3f8] rounded-2xl p-5 font-mono text-[#6d6075] text-[var(--text-main)]">
              X → ¬Y
            </div>

            <p className="text-sm text-[#777] mt-4 leading-7">
              In this notation, X is the antecedent mutation set and ¬Y
              represents the absence of the mutations in Y.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
            <h3 className="text-2xl font-bold text-[#4f4557] mb-5">
              Mutual Exclusivity
            </h3>

            <p className="text-base leading-8 text-[#555]">
              For a mutually exclusive mutation set, if a tumor contains one of
              the mutations in the set, the other mutations in the same set are
              expected to be absent or rarely observed together.
            </p>

            <div className="mt-6 bg-[#f7f3f8] rounded-2xl p-5 font-mono text-[#6d6075] text-[var(--text-main)]">
              {"{mi} → {¬mj, ¬mk}"}
            </div>

            <p className="text-sm text-[#777] mt-4 leading-7">
              If complementary negative association rules satisfy the selected
              support, confidence and significance thresholds, MEMNAR constructs
              a mutually exclusive gene set.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-8">
            Algorithm Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-[#faf7fb] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#d9cde3] flex items-center justify-center font-bold text-[#5d4e69] mb-5">
                1
              </div>

              <h4 className="font-bold text-[var(--text-main)] text-[#4f4557] mb-3">
                Frequent Itemsets
              </h4>

              <p className="text-sm leading-7 text-[#666]">
                MEMNAR first generates positive frequent mutation sets. A set is
                treated as frequent when its support is above the minimum
                support threshold.
              </p>
            </div>

            <div className="bg-[#faf7fb] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#d9cde3] flex items-center justify-center font-bold text-[#5d4e69] mb-5">
                2
              </div>

              <h4 className="font-bold text-[var(--text-main)] text-[#4f4557] mb-3">
                Negative Itemsets
              </h4>

              <p className="text-sm leading-7 text-[#666]">
                Frequent single mutation sets are negated and combined with
                positive itemsets to generate candidate positive-negative
                mutation sets.
              </p>
            </div>

            <div className="bg-[#faf7fb] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#d9cde3] flex items-center justify-center font-bold text-[#5d4e69] mb-5">
                3
              </div>

              <h4 className="font-bold text-[var(--text-main)] text-[#4f4557] mb-3">
                Join and Filter
              </h4>

              <p className="text-sm leading-7 text-[#666]">
                Larger itemsets are generated using positive and negative join
                operations. Candidate itemsets are filtered using support,
                confidence and statistical significance.
              </p>
            </div>

            <div className="bg-[#faf7fb] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#d9cde3] flex items-center justify-center font-bold text-[#5d4e69] mb-5">
                4
              </div>

              <h4 className="font-bold text-[var(--text-main)] text-[#4f4557] mb-3">
                Rule Construction
              </h4>

              <p className="text-sm leading-7 text-[#666]">
                Valid negative association rules are combined to form mutually
                exclusive gene sets when the required complementary rules exist.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
            <h3 className="text-2xl font-bold text-[#4f4557] mb-5">
              Support and Confidence
            </h3>

            <p className="text-base leading-8 text-[#555]">
              MEMNAR evaluates association rules using support and confidence.
              Support measures how frequently a mutation set or rule appears in
              the patient cohort. Confidence measures the conditional
              probability of observing the consequent of a rule given its
              antecedent.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
            <h3 className="text-2xl font-bold text-[#4f4557] mb-5">
              Statistical Significance
            </h3>

            <p className="text-base leading-8 text-[#555]">
              The paper assesses rule significance using a z-score calculated
              from a chi-square statistic. Candidate rules are retained only
              when they satisfy the preset support, confidence and significance
              thresholds.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-6">
            Reported Evaluation
          </h2>

          <p className="text-[var(--text-main)] leading-9 text-[#4d4d4d]">
            The MLSB 2017 paper evaluates MEMNAR on simulated mutation datasets
            and breast cancer somatic mutation data. In the reported simulation
            experiments, MEMNAR is compared with MEGSA, Mutex and Multi-Dendrix
            under balanced and unbalanced mutation settings.
          </p>

          <p className="text-[var(--text-main)] leading-9 text-[#4d4d4d] mt-6">
            In the breast cancer analysis, the paper reports 21 significant
            mutually exclusive mutation sets. Examples include sets containing
            TP53, GATA3, CDH1 and CTCF, as well as sets related to MAPK/ERK and
            JAK-STAT signaling pathways.
          </p>
        </section>

        <section className="bg-[#f7f3f8] rounded-3xl p-6 border border-[#e6ddec]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-4">
            Further Reading
          </h2>

          <p className="text-base leading-8 text-[#555]">
            For the complete algorithmic details, definitions, formulas and
            experimental results, please refer to the original MEMNAR paper:
          </p>

          <a
            href="http://mlsb.cc/2017/abstracts/MLSB_2017_paper_5.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-5 rounded-2xl bg-[var(--primary)] px-6 py-3 text-white font-semibold hover:opacity-90 transition"
          >
            Go to MEMNAR Paper
          </a>
        </section>

        {/* --- SEQUENCING WORKFLOW SECTION --- */}
        <div className="my-10 border-t-2 border-[#ece7ef]"></div>

        <h2 className="text-3xl font-extrabold mt-4 mb-8 text-[#6d6075]">
          Sequencing Workflow
        </h2>

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-5">
            Dataset Preparation Pipeline
          </h2>

          <p className="text-base leading-8 text-[#4d4d4d] mb-8">
            Before mutation data is analyzed by MEMNAR, it goes through a specific 
            preparation pipeline. This includes formatting the raw input, applying 
            DataConverter.jar, and filtering the data to make it suitable for mutual 
            exclusivity analysis.
          </p>

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

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
            <h3 className="text-2xl font-bold text-[#4f4557] mb-4">
              Input Dataset Format
            </h3>

            <p className="text-base leading-8 text-[#555]">
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
            <h3 className="text-2xl font-bold text-[#4f4557] mb-4">
              DataConverter Workflow
            </h3>

            <p className="text-base leading-8 text-[#555]">
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
                        className="bg-[#f7f3f8] text-[#4f4557] rounded-xl px-4 py-3 text-left text-sm"
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
                        className="bg-[#faf7fb] rounded-xl px-4 py-3 text-sm text-[#555]"
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