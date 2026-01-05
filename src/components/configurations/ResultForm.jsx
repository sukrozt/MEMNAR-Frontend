// components/ResultForm.jsx
import React from 'react';

const ResultForm = ({ output, onBack }) => {
    return (
        <div id="output">
            <h2>Algorithm Result</h2>
            {/* Render the HTML string received from backend */}
            <div dangerouslySetInnerHTML={{ __html: output }} />
            <br />
            <button className="btn btn-default" onClick={onBack}>
                Go Back
            </button>
        </div>
    );
};

export default ResultForm;