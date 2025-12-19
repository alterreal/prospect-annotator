import React, { useState } from 'react';
import { LabelData, Lesion } from '../types';
import SectorSelector from './SectorSelector';
import './LesionManager.css';

interface LesionManagerProps {
  labelData: LabelData;
  setLabelData: React.Dispatch<React.SetStateAction<LabelData>>;
}

const LesionManager: React.FC<LesionManagerProps> = ({ labelData, setLabelData }) => {
  const [selectedLesionId, setSelectedLesionId] = useState<number | null>(null);

  const addLesion = () => {
    const newId = labelData.lesions.length > 0
      ? Math.max(...labelData.lesions.map(l => l.id)) + 1
      : 1;
    const newLesion: Lesion = {
      id: newId,
      pirads: undefined,
      maximum_diameter: undefined,
      sectors: []
    };
    setLabelData(prev => ({
      ...prev,
      lesions: [...prev.lesions, newLesion]
    }));
    setSelectedLesionId(newId);
  };

  const removeLesion = (id: number) => {
    setLabelData(prev => ({
      ...prev,
      lesions: prev.lesions.filter(l => l.id !== id)
    }));
    if (selectedLesionId === id) {
      setSelectedLesionId(null);
    }
  };

  const updateLesion = (id: number, updates: Partial<Lesion>) => {
    setLabelData(prev => ({
      ...prev,
      lesions: prev.lesions.map(l =>
        l.id === id ? { ...l, ...updates } : l
      )
    }));
  };

  const selectedLesion = labelData.lesions.find(l => l.id === selectedLesionId);

  return (
    <div className="lesion-manager">
      <div className="lesion-manager-header">
        <h3>Lesions</h3>
        <button onClick={addLesion} className="add-lesion-button">
          + Add Lesion
        </button>
      </div>

      {labelData.lesions.length === 0 ? (
        <div className="empty-lesions">
          <p>No lesions added. Click "Add Lesion" to start.</p>
        </div>
      ) : (
        <div className="lesions-list">
          {labelData.lesions.map(lesion => (
            <div
              key={lesion.id}
              className={`lesion-card ${selectedLesionId === lesion.id ? 'selected' : ''}`}
              onClick={() => setSelectedLesionId(lesion.id)}
            >
              <div className="lesion-card-header">
                <span className="lesion-id">Lesion #{lesion.id}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLesion(lesion.id);
                  }}
                  className="remove-lesion-button"
                >
                  ×
                </button>
              </div>
              <div className="lesion-card-content">
                <div className="lesion-field">
                  <label>PI-RADS Score</label>
                  <select
                    value={lesion.pirads ?? ''}
                    onChange={(e) => updateLesion(lesion.id, {
                      pirads: e.target.value === '' ? undefined : parseInt(e.target.value)
                    })}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="">Select...</option>
                    {[1, 2, 3, 4, 5].map(score => (
                      <option key={score} value={score}>{score}</option>
                    ))}
                  </select>
                </div>
                <div className="lesion-field">
                  <label>Maximum Diameter (mm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={lesion.maximum_diameter ?? ''}
                    onChange={(e) => updateLesion(lesion.id, {
                      maximum_diameter: e.target.value === '' ? undefined : parseFloat(e.target.value)
                    })}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Enter maximum diameter"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedLesion && (
        <div className="lesion-details">
          <h4>Lesion #{selectedLesion.id} - Sector Selection</h4>
          <SectorSelector
            sectors={selectedLesion.sectors}
            onSectorsChange={(sectors) => updateLesion(selectedLesion.id, { sectors })}
          />
        </div>
      )}
    </div>
  );
};

export default LesionManager;

