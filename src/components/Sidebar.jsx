import React from 'react';

function Sidebar({ connected }) {
    return (
        <aside className="w-64 bg-[var(--surface-sidebar)] p-6 flex flex-col justify-between">
            <div>
                <h1 
                    className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--primary)]" 
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                    MEMNAR
                </h1>
                <p className="text-sm text-slate-400 mt-2">Negative Association Rule Mining for Cancer Genomics</p>

                <nav className="mt-10 space-y-3">
                    <div className="text-[var(--secondary)] px-4 py-3 rounded-xl cursor-pointer">About</div>
                    <div className="bg-[var(--surface-soft)] text-[var(--primary)] px-4 py-3 rounded-xl font-medium cursor-pointer">
                        Dashboard
                    </div>
                    <div className="text-[var(--secondary)] px-4 py-3 rounded-xl cursor-pointer">Logs</div>
                    <div className="text-[var(--secondary)] px-4 py-3 rounded-xl cursor-pointer">Result</div>
                </nav>
            </div>

            <div className="text-sm text-slate-500">
                {connected 
                    ? <span className="text-[var(--primary)]">● Connected</span>        
                    : <span className="text-[#b67b84]">● Disconnected</span>}
            </div>
        </aside>
    );
}

export default Sidebar;