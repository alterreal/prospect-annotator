import React from 'react';
import './ReportViewer.css';

interface ReportViewerProps {
  text: string;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ text }) => {
  return (
    <div className="report-viewer">
      <div className="report-viewer-header">
        <h2>Report Content</h2>
      </div>
      <div className="report-content">
        {text ? (
          <pre>{text}</pre>
        ) : (
          <div className="empty-state">
            <p>No report loaded. Click "Load Report" to load a .txt file.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportViewer;

