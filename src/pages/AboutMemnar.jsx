export default function AboutMemnar() {
  return (
    <main className="flex-1 p-10 overflow-y-auto">
      <p className="text-sm tracking-[0.35em] uppercase text-[var(--primary)] font-semibold">
        Workspace / About
      </p>

      <h1 className="text-6xl font-extrabold mt-4 text-[#6d6075]">
        About MEMNAR
      </h1>

      <div className="mt-10 space-y-8 max-w-7xl">
        <section className="bg-white rounded-3xl p-10 shadow-sm border border-[#ece7ef]">
          <h2 className="text-3xl font-bold text-[#4f4557] mb-6">
            What is MEMNAR?
          </h2>

          <p className="text-lg leading-9 text-[#4d4d4d]">
            MEMNAR is a computational method proposed for identifying mutually
            exclusive mutation gene sets through negative association rule
            mining. The method analyzes patient mutation data and constructs
            mutually exclusive gene sets based on extracted negative association
            rules.
          </p>

          <p className="text-lg leading-9 text-[#4d4d4d] mt-6">
            The motivation behind MEMNAR is based on the observation that
            certain gene mutations tend not to occur concurrently in the same
            patient. These mutual exclusivity patterns may indicate functional
            relationships between genes and may help study cancer-driver
            alterations.
          </p>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#ece7ef]">
            <h3 className="text-2xl font-bold text-[#4f4557] mb-5">
              Negative Association Rules
            </h3>

            <p className="text-base leading-8 text-[#555]">
              MEMNAR formulates mutual exclusivity as a negative association
              rule mining problem. A negative association rule represents a
              relation where the presence of one mutation set is associated with
              the absence of another mutation set.
            </p>

            <div className="mt-6 bg-[#f7f3f8] rounded-2xl p-5 font-mono text-[#6d6075] text-lg">
              X → ¬Y
            </div>

            <p className="text-sm text-[#777] mt-4 leading-7">
              In this notation, X is the antecedent mutation set and ¬Y
              represents the absence of the mutations in Y.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#ece7ef]">
            <h3 className="text-2xl font-bold text-[#4f4557] mb-5">
              Mutual Exclusivity
            </h3>

            <p className="text-base leading-8 text-[#555]">
              For a mutually exclusive mutation set, if a tumor contains one of
              the mutations in the set, the other mutations in the same set are
              expected to be absent or rarely observed together.
            </p>

            <div className="mt-6 bg-[#f7f3f8] rounded-2xl p-5 font-mono text-[#6d6075] text-lg">
              {"{mi} → {¬mj, ¬mk}"}
            </div>

            <p className="text-sm text-[#777] mt-4 leading-7">
              If complementary negative association rules satisfy the selected
              support, confidence and significance thresholds, MEMNAR constructs
              a mutually exclusive gene set.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-10 shadow-sm border border-[#ece7ef]">
          <h2 className="text-3xl font-bold text-[#4f4557] mb-8">
            Algorithm Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-[#faf7fb] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#d9cde3] flex items-center justify-center font-bold text-[#5d4e69] mb-5">
                1
              </div>

              <h4 className="font-bold text-lg text-[#4f4557] mb-3">
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

              <h4 className="font-bold text-lg text-[#4f4557] mb-3">
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

              <h4 className="font-bold text-lg text-[#4f4557] mb-3">
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

              <h4 className="font-bold text-lg text-[#4f4557] mb-3">
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
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#ece7ef]">
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

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#ece7ef]">
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

        <section className="bg-white rounded-3xl p-10 shadow-sm border border-[#ece7ef]">
          <h2 className="text-3xl font-bold text-[#4f4557] mb-6">
            Reported Evaluation
          </h2>

          <p className="text-lg leading-9 text-[#4d4d4d]">
            The MLSB 2017 paper evaluates MEMNAR on simulated mutation datasets
            and breast cancer somatic mutation data. In the reported simulation
            experiments, MEMNAR is compared with MEGSA, Mutex and Multi-Dendrix
            under balanced and unbalanced mutation settings.
          </p>

          <p className="text-lg leading-9 text-[#4d4d4d] mt-6">
            In the breast cancer analysis, the paper reports 21 significant
            mutually exclusive mutation sets. Examples include sets containing
            TP53, GATA3, CDH1 and CTCF, as well as sets related to MAPK/ERK and
            JAK-STAT signaling pathways.
          </p>
        </section>

        <section className="bg-[#f7f3f8] rounded-3xl p-8 border border-[#e6ddec]">
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
      </div>
    </main>
  );
}