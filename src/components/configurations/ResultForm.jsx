// components/ResultForm.jsx
import React from 'react';
import { useEffect, useRef } from 'react';

const ResultForm = ({ output, onBack }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    const onLoad = () => {
      const doc = iframe.contentDocument;

      doc.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        if (link) {
          e.preventDefault();
        }
      });
    };

    iframe.addEventListener('load', onLoad);

    return () => {
      iframe.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <div id="output">
      <h2>Algorithm Result</h2>
      {/* Render the HTML string received from backend */}
      <iframe ref={iframeRef} id="outputframe" srcDoc={output} width="100%" height="100%" sandbox="allow-scripts allow-same-origin" />
      <br />
      <button
        className="flex-1 rounded-xl px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: 'linear-gradient(135deg, var(--primary), var(--primary-soft))'
        }}
        onClick={onBack}>
        Go Back
      </button>
    </div>
  );
};

export default ResultForm;