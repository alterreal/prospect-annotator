import React, { useRef } from 'react';
import './FileLoader.css';

interface FileLoaderProps {
  onFileLoad: (text: string, filename: string) => void;
}

const FileLoader: React.FC<FileLoaderProps> = ({ onFileLoad }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onFileLoad(text, file.name);
      };
      reader.readAsText(file);
    } else if (file) {
      alert('Please select a .txt file');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-loader">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleClick} className="load-button">
        Load Report
      </button>
    </div>
  );
};

export default FileLoader;

