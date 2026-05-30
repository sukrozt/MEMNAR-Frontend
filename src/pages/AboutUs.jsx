export default function AboutUs() {
  return (
    <main className="flex-1 p-6 xl:p-8 overflow-y-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] font-semibold">
        Workspace / About the Project
      </p>

      <h1 className="text-4xl xl:text-5xl font-extrabold mt-3 text-[#6d6075]">
        About the Project
      </h1>

      <div className="mt-8 space-y-6 max-w-6xl">
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-4">
            MEMNAR Web Server
          </h2>

          <p className="text-base leading-8 text-[#4d4d4d]">
            This project aims to develop a web-based platform for the MEMNAR
            algorithm, which was originally designed as a command-line
            bioinformatics tool for discovering mutually exclusive mutation
            patterns in cancer genomics data.
          </p>

          <p className="text-base leading-8 text-[#4d4d4d] mt-4">
            The original MEMNAR algorithm analyzes patient mutation datasets
            using negative association rule mining and identifies mutually
            exclusive and conditional mutually exclusive mutation sets. However,
            the original implementation requires command-line usage and manual
            configuration steps.
          </p>

          <p className="text-base leading-8 text-[#4d4d4d] mt-4">
            In this project, we redesign MEMNAR as an interactive web platform
            that supports dataset upload, parameter configuration, execution
            management and result visualization through a graphical user
            interface.
          </p>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#ece7ef]">
            <h3 className="text-xl font-bold text-[#4f4557] mb-4">
              Project Scope
            </h3>

            <ul className="space-y-3 text-sm leading-7 text-[#555]">
              <li>
                • Understanding the original MEMNAR workflow including JAR
                execution, configuration structure, dataset inputs and generated
                HTML outputs
              </li>

              <li>
                • Integration of the MEMNAR JAR execution pipeline into a web
                server environment through a browser-based interface
              </li>

              <li>
                • Development of configurable frontend controls for MEMNAR
                parameters including minsupp, minconf,
                FindMutualExclusiveSets and
                FindConditionalMutualExclusiveSets
              </li>

              <li>
                • Dynamic generation and management of MEMNAR configuration
                files according to user-defined analysis parameters
              </li>

              <li>
                • Implementation of dataset upload functionality for
                preprocessed and formatted mutation datasets compatible with
                MEMNAR
              </li>

              <li>
                • Integration of the DataConverter.jar preprocessing workflow
                for handling raw mutation datasets before MEMNAR execution
              </li>

              <li>
                • Real-time monitoring of intermediate execution logs including
                candidate set generation, filtering stages and algorithm
                progress tracking
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#ece7ef]">
            <h3 className="text-xl font-bold text-[#4f4557] mb-4">
              Technologies
            </h3>

            <ul className="space-y-3 text-sm leading-7 text-[#555]">
              <li>• React and Vite for frontend development</li>

              <li>
                • Spring Boot for backend orchestration and API services
              </li>

              <li>
                • WebSocket communication for real-time execution updates
              </li>

              <li>• Java-based MEMNAR and DataConverter integration</li>

              <li>• Maven dependency and build management</li>

              <li>
                • Spring Data JPA for analysis and configuration management
              </li>

              <li>
                • Interactive browser-based workflow for genomic analysis
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <h2 className="text-2xl font-bold text-[#4f4557] mb-4">
            Academic Context
          </h2>

          <p className="text-base leading-8 text-[#4d4d4d]">
            This project is being developed as a Computer Engineering Design
            Project at Hacettepe University under the supervision of Asst. Prof.
            Dr. Gülden Olgun.
          </p>

          <p className="text-base leading-8 text-[#4d4d4d] mt-4">
            The project is carried out by Şükriye Öztürk, Deniz Can Aksuoğlu
            and İrem Sıla Ay. The main objective is to improve the accessibility
            and usability of the MEMNAR algorithm for researchers who may not be
            familiar with command-line tools or manual configuration processes.
          </p>

          <p className="text-base leading-8 text-[#4d4d4d] mt-4">
            The system focuses on providing a more manageable and accessible
            environment for cancer genomics analysis workflows by wrapping the
            original MEMNAR execution process inside a web-based interface.
          </p>
        </section>

        <section className="bg-[#f7f3f8] rounded-3xl p-5 border border-[#e6ddec]">
          <h2 className="text-xl font-bold text-[#4f4557] mb-3">
            Acknowledgement
          </h2>

          <p className="text-sm leading-7 text-[#555]">
            We would like to thank Asst. Prof. Dr. Gülden Olgun for her
            supervision and guidance throughout the development of this project
            and the MEMNAR research contributors for providing the original
            algorithm and research foundation.
          </p>
        </section>
      </div>
    </main>
  );
}