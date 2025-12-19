import { useState } from 'react';
import FileLoader from './components/FileLoader';
import ReportViewer from './components/ReportViewer';
import LabelingForm from './components/LabelingForm';
import { LabelData } from './types';
import './App.css';

function App() {
  const [reportText, setReportText] = useState<string>('');
  const [reportFilename, setReportFilename] = useState<string>('');
  const [labelData, setLabelData] = useState<LabelData>({
    lesions: []
  });

  const handleFileLoad = (text: string, filename: string) => {
    setReportText(text);
    setReportFilename(filename);
    // Reset annotations when a new file is loaded
    setLabelData({
      lesions: []
    });
  };

  const handleSave = () => {
    // Transform data to match expected JSON format - always include all fields
    const exportData: any = {
      psa: labelData.psa ?? null,
      prostate_volume: labelData.prostate_volume ?? null,
      epe: labelData.epe === 'yes' ? true : labelData.epe === 'no' ? false : null,
      svi: labelData.svi === 'yes' ? true : labelData.svi === 'no' ? false : null,
      enlarged_lymph_nodes: labelData.enlarged_lymph_nodes === 'yes' ? true : labelData.enlarged_lymph_nodes === 'no' ? false : null,
      neurovascular_bundle_involvement: labelData.neurovascular_bundle_involvement === 'yes' ? true : labelData.neurovascular_bundle_involvement === 'no' ? false : null,
      bladder_neck_involvement: labelData.bladder_neck_involvement === 'yes' ? true : labelData.bladder_neck_involvement === 'no' ? false : null,
      rectal_wall_involvement: labelData.rectal_wall_involvement === 'yes' ? true : labelData.rectal_wall_involvement === 'no' ? false : null,
      lesions: labelData.lesions.map(lesion => ({
        id: lesion.id,
        pirads: lesion.pirads ?? null,
        maximum_diameter: lesion.maximum_diameter ?? null,
        sectors: lesion.sectors.map(sector => {
          const sectorObj: any = {
            region: sector.region || null,
            side: sector.side || null,
            zone: sector.zone === 'transition' ? 'transition' : 
                  sector.zone === 'peripheral' ? 'peripheral' :
                  sector.zone === 'central' ? 'central' :
                  sector.zone === 'anterior_fibromuscular_stroma' ? 'anterior_fibromuscular_stroma' : (sector.zone || null)
          };
          // Section is only for TZ and PZ, but always include it
          if (sector.zone === 'transition' || sector.zone === 'peripheral') {
            sectorObj.section = sector.section === 'posterior_medial' ? 'posterior_medial' :
                               sector.section === 'posterior_lateral' ? 'posterior_lateral' :
                               (sector.section || null);
          }
          return sectorObj;
        })
      }))
    };

    // Generate filename based on original report filename
    const baseFilename = reportFilename 
      ? reportFilename.replace(/\.txt$/i, '')
      : 'label';
    const jsonFilename = `${baseFilename}.json`;

    const jsonData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = jsonFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>PROSPECT ANNOTATOR</h1>
        <div className="header-actions">
          <FileLoader onFileLoad={handleFileLoad} />
          <button onClick={handleSave} className="save-button" disabled={!reportText}>
            Save Labels
          </button>
        </div>
      </header>
      <div className="app-content">
        <div className="left-panel">
          <ReportViewer text={reportText} />
        </div>
        <div className="right-panel">
          <LabelingForm labelData={labelData} setLabelData={setLabelData} />
        </div>
      </div>
    </div>
  );
}

export default App;

