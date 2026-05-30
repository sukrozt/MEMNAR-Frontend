function Dashboard({ 
  connected, 
  selectedFile, 
  logs, 
  output, 
  isFileSaved, 
  handleFileSelection, 
  handleFileUpload, 
  runAlgorithm, 
  statusMessage,
  isUploading
}) {
  return (
    // ...
    <FileUploadForm 
      connected={connected}
      selectedFile={selectedFile}
      handleFileSelection={handleFileSelection}
      handleFileUpload={handleFileUpload}
      statusMessage={statusMessage}
      isUploading={isUploading}
    />
    // ...
  );
}
import React from 'react';

function FileUploadForm({
    handleFileSelection,
    selectedFile,
    statusMessage,
    handleFileUpload,
    connected,
    isUploading
}) {
    return (
        <section className="bg-[var(--surface-container)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[var(--secondary-soft)] text-[var(--secondary)] flex items-center justify-center font-bold">
                    01
                </div>

                <h3
                    className="text-2xl font-bold text-[var(--text-main)]"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                    Upload Data
                </h3>
            </div>

            <div className="rounded-2xl p-8 bg-[var(--surface)] text-center">
                <p className="text-[var(--secondary)] text-lg mb-4">Select file</p>
                <input
                    type="file"
                    accept=".txt,text/plain"
                    onChange={handleFileSelection}
                    className="block w-full text-sm text-[var(--secondary)] file:mr-4 file:rounded-xl file:border-0 file:bg-[var(--surface-soft)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--primary)] hover:file:bg-[var(--secondary-soft)]"
                />

                <div className="mt-6 text-sm text-[var(--text-muted)]">
                    {selectedFile ? selectedFile.name : "No file selected"}
                </div>
                
                <div className="connection-status" style={{ marginBottom: '10px' }}>
                    Server Message: <strong>{statusMessage}</strong>
                </div>

                <div className="info-card" style={{ backgroundColor: '#eaf4f4', padding: '15px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.95em', color: '#333', border: '1px solid #cce3e3' }}>
                    <strong>Required Data Format:</strong>
                    <p style={{ marginTop: '8px', marginBottom: '8px' }}>
                        MEMNAR accepts datasets which have Patient IDs in the first column followed by mutations that
                        occurred in that particular patient all separated by space. So the dataset should be in current format:
                    </p>
                    <pre style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}>
                        {"P1 m1 m2 m3\nP2 m3 m1 m4"}
                    </pre>
                    <p style={{ marginBottom: 0 }}>
                        Where P1 P2 are patient IDs and m1, m2, m3, m4 are mutation names.
                    </p>
                </div>
                
                <button
                    onClick={handleFileUpload}
                    disabled={!selectedFile || !connected || isUploading}
                    className="mt-6 w-full rounded-xl px-5 py-3 font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-soft))' }}
                >
                    {isUploading ? "Uploading file, please wait..." : "Save File to Server"}
                </button>
            </div>
        </section>
    );
}

export default FileUploadForm;
