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

  const handleBinaryChange = (
    field: 'epe' | 'svi' | 'enlarged_lymph_nodes' | 'neurovascular_bundle_involvement' | 'bladder_neck_involvement' | 'rectal_wall_involvement',
    value: 'yes' | 'no' | ''
  ) => {
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
                N/A
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
                N/A
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
                N/A
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Neurovascular Bundle Involvement</label>
            <div className="binary-buttons">
              <button
                className={labelData.neurovascular_bundle_involvement === 'yes' ? 'active' : ''}
                onClick={() => handleBinaryChange('neurovascular_bundle_involvement', 'yes')}
              >
                Yes
              </button>
              <button
                className={labelData.neurovascular_bundle_involvement === 'no' ? 'active' : ''}
                onClick={() => handleBinaryChange('neurovascular_bundle_involvement', 'no')}
              >
                No
              </button>
              <button
                className={labelData.neurovascular_bundle_involvement === '' || labelData.neurovascular_bundle_involvement === undefined ? 'active' : ''}
                onClick={() => handleBinaryChange('neurovascular_bundle_involvement', '')}
              >
                N/A
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Bladder Neck Involvement</label>
            <div className="binary-buttons">
              <button
                className={labelData.bladder_neck_involvement === 'yes' ? 'active' : ''}
                onClick={() => handleBinaryChange('bladder_neck_involvement', 'yes')}
              >
                Yes
              </button>
              <button
                className={labelData.bladder_neck_involvement === 'no' ? 'active' : ''}
                onClick={() => handleBinaryChange('bladder_neck_involvement', 'no')}
              >
                No
              </button>
              <button
                className={labelData.bladder_neck_involvement === '' || labelData.bladder_neck_involvement === undefined ? 'active' : ''}
                onClick={() => handleBinaryChange('bladder_neck_involvement', '')}
              >
                N/A
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Rectal Wall Involvement</label>
            <div className="binary-buttons">
              <button
                className={labelData.rectal_wall_involvement === 'yes' ? 'active' : ''}
                onClick={() => handleBinaryChange('rectal_wall_involvement', 'yes')}
              >
                Yes
              </button>
              <button
                className={labelData.rectal_wall_involvement === 'no' ? 'active' : ''}
                onClick={() => handleBinaryChange('rectal_wall_involvement', 'no')}
              >
                No
              </button>
              <button
                className={labelData.rectal_wall_involvement === '' || labelData.rectal_wall_involvement === undefined ? 'active' : ''}
                onClick={() => handleBinaryChange('rectal_wall_involvement', '')}
              >
                N/A
              </button>
            </div>
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

