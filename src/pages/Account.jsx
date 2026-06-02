import { useState, useEffect } from "react";
import axios from "axios";

export default function Account({ isLoggedIn }) {
  const [profile, setProfile] = useState(null);
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    const authHeaders = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const fetchAccountData = async () => {
      try {
        const [profileRes, configsRes] = await Promise.all([
          axios.get("https://memnar.online:8080/api/history/me", authHeaders),
          axios.get("https://memnar.online:8080/api/history/configs", authHeaders),
        ]);

        setProfile(profileRes.data);
        setConfigs(configsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [isLoggedIn]);

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary)] font-medium">
        Workspace / Account
      </p>

      <h2 className="text-3xl xl:text-4xl font-bold mt-2 leading-tight text-[#5f4b7a]">
        My Account
      </h2>

      {!isLoggedIn ? (
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
          <div className="text-center py-10">
            <p className="text-lg text-[#8b7a93] font-medium mb-2">You are not logged in.</p>
            <p className="text-base text-[#4d4d4d]">Please log in or create an account to view your profile details.</p>
          </div>
        </div>
      ) : loading ? (
        <div className="mt-8 text-center py-10 text-[var(--primary)] font-medium">
          Loading...
        </div>
      ) : (
        <div className="mt-8 space-y-8 max-w-6xl">
          {/* Profile Information */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
            <h2 className="text-2xl font-bold text-[#6d6075] border-b border-[#ece7ef] pb-3 mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-[#8b7a93] font-semibold uppercase tracking-wide mb-1">Username</p>
                <p className="text-lg text-[#4f4557] font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> {profile?.username || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8b7a93] font-semibold uppercase tracking-wide mb-1">User ID</p>
                <p className="text-lg text-[#4f4557] font-medium">{profile?.id || "-"}</p>
              </div>
            </div>
          </section>

          {/* Configurations (Inputs) */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7ef]">
            <h2 className="text-2xl font-bold text-[#6d6075] border-b border-[#ece7ef] pb-3 mb-6">Past Configurations (Inputs)</h2>
            {configs.length === 0 ? <p className="text-[#8b7a93]">You don't have any saved configurations yet.</p> : (
              <ul className="space-y-4">
                {configs.map(config => (
                  <li key={config.id} className="p-5 bg-[#faf7fb] rounded-2xl border border-[#ece7ef]">
                    <p className="mb-2"><strong className="text-[#8b7a93] font-medium uppercase text-xs tracking-wider">Date:</strong> <span className="text-[#4f4557] ml-2">{new Date(config.createdAt).toLocaleString()}</span></p>
                    <p className="mb-2"><strong className="text-[#8b7a93] font-medium uppercase text-xs tracking-wider">Dataset:</strong> <span className="text-[#4f4557] ml-2">{config.datasetName || '-'}</span></p>
                    <p className="flex flex-wrap gap-y-2">
                      <strong className="text-[#8b7a93] font-medium uppercase text-xs tracking-wider">minSupp:</strong> <span className="text-[#4f4557] ml-2">{config.minSupp}</span> <span className="mx-3 text-[#ece7ef]">|</span> 
                      <strong className="text-[#8b7a93] font-medium uppercase text-xs tracking-wider">minConf:</strong> <span className="text-[#4f4557] ml-2">{config.minConf}</span> <span className="mx-3 text-[#ece7ef]">|</span> 
                      <strong className="text-[#8b7a93] font-medium uppercase text-xs tracking-wider">minZScore:</strong> <span className="text-[#4f4557] ml-2">{config.minZScore}</span> <span className="mx-3 text-[#ece7ef]">|</span> 
                      <strong className="text-[#8b7a93] font-medium uppercase text-xs tracking-wider">maxSetSize:</strong> <span className="text-[#4f4557] ml-2">{config.maxSetSize}</span> <span className="mx-3 text-[#ece7ef]">|</span> 
                      <strong className="text-[#8b7a93] font-medium uppercase text-xs tracking-wider">pValueCutoff:</strong> <span className="text-[#4f4557] ml-2">{config.pValueCutoff ?? config.pvalueCutoff}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </main>
  );
}