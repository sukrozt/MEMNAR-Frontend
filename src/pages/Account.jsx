export default function Account() {
  return (
    <main className="flex-1 p-6 xl:p-8 overflow-y-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] font-semibold">
        Workspace / Account
      </p>

      <h1 className="text-4xl xl:text-5xl font-extrabold mt-3 text-[#6d6075]">
        My Account
      </h1>

      <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
        <p className="text-base leading-8 text-[#4d4d4d]">
          Account settings, user details, and preferences will be displayed here.
        </p>
      </div>
    </main>
  );
}
