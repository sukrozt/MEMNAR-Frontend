export default function Account({ isLoggedIn }) {
  return (
    <main className="flex-1 p-6 xl:p-8 overflow-y-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] font-semibold">
        Workspace / Account
      </p>

      <h1 className="text-4xl xl:text-5xl font-extrabold mt-3 text-[#6d6075]">
        My Account
      </h1>

      <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
        {isLoggedIn ? (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#6d6075] border-b border-[#ece7ef] pb-3">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-[#8b7a93] font-semibold uppercase tracking-wide mb-1">Status</p>
                <p className="text-lg text-[#4f4557] font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Active Member
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8b7a93] font-semibold uppercase tracking-wide mb-1">Account Type</p>
                <p className="text-lg text-[#4f4557] font-medium">Standard User</p>
              </div>
            </div>
            <p className="text-sm text-[#8b7a93] mt-6 pt-4 border-t border-[#ece7ef]">
              More account settings and preferences will be available soon.
            </p>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-[#8b7a93] font-medium mb-2">You are not logged in.</p>
            <p className="text-base text-[#4d4d4d]">Please log in or create an account to view your profile details.</p>
          </div>
        )}
      </div>
    </main>
  );
}
