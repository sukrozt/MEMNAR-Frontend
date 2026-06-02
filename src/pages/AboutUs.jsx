import {
  FaReact,
  FaDatabase,
  FaFilePdf,
  FaCheckCircle,
  FaUniversity,
  FaCode,
  FaServer,
  FaCogs
} from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";

export default function AboutUs() {
  const scopeItems = [
    "Understanding the original MEMNAR workflow, configuration, and HTML outputs",
    "Integration of the MEMNAR JAR pipeline into a browser-based interface",
    "Configurable frontend controls (minsupp, minconf, mutual exclusive sets)",
    "Dynamic generation of configuration files based on user-defined parameters",
    "Dataset upload functionality for formatted mutation datasets",
    "DataConverter.jar integration for preprocessing raw mutation datasets",
    "Real-time monitoring of intermediate execution logs and progress tracking"
  ];

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary)] font-medium">
        Workspace / About the Project
      </p>

      <h2 className="text-3xl xl:text-4xl font-bold mt-2 leading-tight text-[#5f4b7a]">
        About the Project
      </h2>

      <div className="mt-8 space-y-8 max-w-6xl">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-3xl p-8 sm:p-10 shadow-lg border border-[#ece7ef]" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-soft))' }}>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl text-white">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                MEMNAR Web Server
              </h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-4">
                Transforming the MEMNAR command-line algorithm into an interactive, accessible web-based platform for discovering mutually exclusive mutation patterns in cancer genomics.
              </p>
              <p className="text-sm text-white/80">
                A modern solution that replaces manual configuration with a seamless graphical user interface.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a href="MEMNAR Web Server Poster.pdf" target='_blank' rel='noopener noreferrer' className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[var(--primary)] bg-white transition-all shadow-md hover:scale-105 hover:bg-gray-50">
                <FaFilePdf className="text-xl text-red-500" />
                Download Poster
              </a>
            </div>
          </div>
          {/* Background decorations */}
          <div className="absolute -top-24 -right-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 right-40 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* SCOPE */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-[#f3edf6] rounded-xl text-[var(--primary)]">
                <FaCode className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-[#4f4557]">Project Scope</h3>
            </div>
            <ul className="space-y-4">
              {scopeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm leading-6 text-[#555]">
                  <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TECHNOLOGIES */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef] hover:shadow-md transition-shadow flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-[#f3edf6] rounded-xl text-[var(--primary)]">
                <FaServer className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-[#4f4557]">Technologies</h3>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#f0f7ff] text-[#007acc] rounded-full text-sm font-semibold border border-[#dbeafe]">
                <FaReact className="text-lg" /> React & Vite
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#f2fbf5] text-[#2d7d32] rounded-full text-sm font-semibold border border-[#dcfce7]">
                <SiSpringboot className="text-lg" /> Spring Boot
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#fdf5f6] text-[#b64b59] rounded-full text-sm font-semibold border border-[#fce7ea]">
                <FaDatabase className="text-lg" /> Spring Data JPA
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#fef9f0] text-[#b47a16] rounded-full text-sm font-semibold border border-[#fef0d4]">
                <FaCogs className="text-lg" /> Java MEMNAR
              </div>
            </div>

            <ul className="mt-8 space-y-3 text-sm leading-6 text-[#555]">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#8b7a93]"></span> WebSocket for real-time execution updates</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#8b7a93]"></span> Maven dependency and build management</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#8b7a93]"></span> Interactive browser-based genomics workflow</li>
            </ul>
          </div>
        </section>

        {/* ACADEMIC CONTEXT */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#ece7ef]">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 bg-[#f3edf6] rounded-xl text-[var(--primary)]">
                  <FaUniversity className="text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-[#4f4557]">Academic Context</h2>
              </div>
              <p className="text-base leading-8 text-[#4d4d4d]">
                This project is being developed as a <strong>Computer Engineering Design Project</strong> at Hacettepe University. The main objective is to improve the accessibility and usability of the MEMNAR algorithm for researchers who may not be familiar with command-line tools.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#faf7fb] p-4 rounded-2xl border border-[#ece7ef]">
                  <p className="text-xs uppercase tracking-widest text-[#8b7a93] font-bold mb-2">Supervisor</p>
                  <p className="font-semibold text-[#4f4557] text-lg">Asst. Prof. Dr. Gülden Olgun</p>
                </div>
                <div className="bg-[#faf7fb] p-4 rounded-2xl border border-[#ece7ef]">
                  <p className="text-xs uppercase tracking-widest text-[#8b7a93] font-bold mb-2">Development Team</p>
                  <ul className="font-semibold text-[#4f4557] space-y-1">
                    <li>Şükriye Öztürk</li>
                    <li>Deniz Can Aksuoğlu</li>
                    <li>İrem Sıla Ay</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-[#fffcf3] rounded-3xl p-6 shadow-sm border border-[#fef0d4]">
            <h2 className="text-lg font-bold text-[#b47a16] mb-3">Data Retention Policy</h2>
            <p className="text-sm leading-7 text-[#735319]">
              Execution history and process logs are temporarily stored on your browser's local storage to ensure data privacy. Only your account details and configuration parameters are securely saved on the server.
            </p>
          </section>

          <section className="bg-[#f7f3f8] rounded-3xl p-6 shadow-sm border border-[#e6ddec]">
            <h2 className="text-lg font-bold text-[var(--primary)] mb-3">Acknowledgement</h2>
            <p className="text-sm leading-7 text-[#5d4e69]">
              Special thanks to Asst. Prof. Dr. Gülden Olgun for her supervision, and the original MEMNAR research contributors for providing the foundational algorithm.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}