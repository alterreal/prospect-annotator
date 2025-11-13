import React from 'react';
import { LabelData } from '../types';
import './LabelingForm.css';
import LesionManager from './LesionManager';

interface LabelingFormProps {
  labelData: LabelData;
  setLabelData: React.Dispatch<React.SetStateAction<LabelData>>;
}

const LabelingForm: React.FC<LabelingFormProps> = ({ labelData, setLabelData }) => {
  const updateField = <K extends keyof LabelData>(field: K, value: LabelData[K]) => {
    setLabelData(prev => ({ ...prev, [field]: value }));
  };

  const handleBinaryChange = (field: 'epe' | 'svi' | 'enlarged_lymph_nodes', value: 'yes' | 'no' | '') => {
    updateField(field, value);
  };

  const handleNumberChange = (field: 'prostate_volume' | 'psa', value: string) => {
    const numValue = value === '' ? undefined : parseFloat(value);
    updateField(field, numValue);
  };

  return (
    <div className="labeling-form">
      <div className="form-header">
        <h2>Labeling Fields</h2>
      </div>
      <div className="form-content">
        <div className="form-section">
          <h3>Clinical Findings</h3>
          
          <div className="form-group">
            <label>PSA Levels (ng/mL)</label>
            <input
              type="number"
              step="0.1"
              value={labelData.psa ?? ''}
              onChange={(e) => handleNumberChange('psa', e.target.value)}
              placeholder="Enter PSA level"
            />
          </div>

          <div className="form-group">
            <label>Prostate Volume (cc)</label>
            <input
              type="number"
              step="0.1"
              value={labelData.prostate_volume ?? ''}
              onChange={(e) => handleNumberChange('prostate_volume', e.target.value)}
              placeholder="Enter volume"
            />
          </div>

          <div className="form-group">
            <label>Extracapsular Extension (EPE)</label>
            <div className="binary-buttons">
              <button
                className={labelData.epe === 'yes' ? 'active' : ''}
                onClick={() => handleBinaryChange('epe', 'yes')}
              >
                Yes
              </button>
              <button
                className={labelData.epe === 'no' ? 'active' : ''}
                onClick={() => handleBinaryChange('epe', 'no')}
              >
                No
              </button>
              <button
                className={labelData.epe === '' || labelData.epe === undefined ? 'active' : ''}
                onClick={() => handleBinaryChange('epe', '')}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Seminal Vesicle Invasion (SVI)</label>
            <div className="binary-buttons">
              <button
                className={labelData.svi === 'yes' ? 'active' : ''}
                onClick={() => handleBinaryChange('svi', 'yes')}
              >
                Yes
              </button>
              <button
                className={labelData.svi === 'no' ? 'active' : ''}
                onClick={() => handleBinaryChange('svi', 'no')}
              >
                No
              </button>
              <button
                className={labelData.svi === '' || labelData.svi === undefined ? 'active' : ''}
                onClick={() => handleBinaryChange('svi', '')}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Enlarged Lymph Nodes</label>
            <div className="binary-buttons">
              <button
                className={labelData.enlarged_lymph_nodes === 'yes' ? 'active' : ''}
                onClick={() => handleBinaryChange('enlarged_lymph_nodes', 'yes')}
              >
                Yes
              </button>
              <button
                className={labelData.enlarged_lymph_nodes === 'no' ? 'active' : ''}
                onClick={() => handleBinaryChange('enlarged_lymph_nodes', 'no')}
              >
                No
              </button>
              <button
                className={labelData.enlarged_lymph_nodes === '' || labelData.enlarged_lymph_nodes === undefined ? 'active' : ''}
                onClick={() => handleBinaryChange('enlarged_lymph_nodes', '')}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Main Findings</label>
            <textarea
              value={labelData.main_findings ?? ''}
              onChange={(e) => updateField('main_findings', e.target.value)}
              placeholder="Enter main findings..."
              rows={4}
            />
          </div>
        </div>

        <div className="form-section">
          <LesionManager labelData={labelData} setLabelData={setLabelData} />
        </div>
      </div>
    </div>
  );
};

export default LabelingForm;

