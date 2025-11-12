import React, { useState } from 'react';
import { Sector, Region, Side, Zone, Section } from '../types';
import './SectorSelector.css';

interface SectorSelectorProps {
  sectors: Sector[];
  onSectorsChange: (sectors: Sector[]) => void;
}

const SectorSelector: React.FC<SectorSelectorProps> = ({ sectors, onSectorsChange }) => {
  const [currentSector, setCurrentSector] = useState<Partial<Sector>>({
    region: '',
    side: '',
    zone: '',
    section: ''
  });

  const addSector = () => {
    if (currentSector.region && currentSector.side && currentSector.zone) {
      // Section is only required for TZ and PZ
      if ((currentSector.zone === 'transition' || currentSector.zone === 'peripheral') && !currentSector.section) {
        alert('Section is required for Transition Zone and Peripheral Zone');
        return;
      }

      const newSector: Sector = {
        region: currentSector.region as Region,
        side: currentSector.side as Side,
        zone: currentSector.zone as Zone,
        ...(currentSector.section && { section: currentSector.section as Section })
      };

      // Check if sector already exists
      const exists = sectors.some(s =>
        s.region === newSector.region &&
        s.side === newSector.side &&
        s.zone === newSector.zone &&
        s.section === newSector.section
      );

      if (exists) {
        alert('This sector is already added');
        return;
      }

      onSectorsChange([...sectors, newSector]);
      setCurrentSector({ region: '', side: '', zone: '', section: '' });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const removeSector = (index: number) => {
    onSectorsChange(sectors.filter((_, i) => i !== index));
  };

  const handleZoneChange = (zone: Zone) => {
    setCurrentSector(prev => ({
      ...prev,
      zone,
      // Clear section if zone doesn't require it
      section: (zone === 'transition' || zone === 'peripheral') ? prev.section : undefined
    }));
  };

  return (
    <div className="sector-selector">
      <div className="sector-form">
        <div className="form-row">
          <div className="form-field">
            <label>Region</label>
            <select
              value={currentSector.region}
              onChange={(e) => setCurrentSector(prev => ({ ...prev, region: e.target.value as Region }))}
            >
              <option value="">Select...</option>
              <option value="apex">Apex (A)</option>
              <option value="mid">Mid (M)</option>
              <option value="base">Base (B)</option>
            </select>
          </div>

          <div className="form-field">
            <label>Side</label>
            <select
              value={currentSector.side}
              onChange={(e) => setCurrentSector(prev => ({ ...prev, side: e.target.value as Side }))}
            >
              <option value="">Select...</option>
              <option value="left">Left (l)</option>
              <option value="right">Right (r)</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Zone</label>
            <select
              value={currentSector.zone}
              onChange={(e) => handleZoneChange(e.target.value as Zone)}
            >
              <option value="">Select...</option>
              <option value="transition">Transition (TZ)</option>
              <option value="peripheral">Peripheral (PZ)</option>
              <option value="central">Central (CZ)</option>
              <option value="anterior_fibromuscular_stroma">Anterior Fibromuscular Stroma (AS)</option>
            </select>
          </div>

          {(currentSector.zone === 'transition' || currentSector.zone === 'peripheral') && (
            <div className="form-field">
              <label>Section</label>
              <select
                value={currentSector.section || ''}
                onChange={(e) => setCurrentSector(prev => ({ ...prev, section: e.target.value as Section }))}
              >
                <option value="">Select...</option>
                <option value="anterior">Anterior (a)</option>
                <option value="posterior_medial">Posterior Medial (pm)</option>
                <option value="posterior_lateral">Posterior Lateral (pl)</option>
                <option value="posterior">Posterior (p)</option>
              </select>
            </div>
          )}
        </div>

        <button onClick={addSector} className="add-sector-button">
          Add Sector
        </button>
      </div>

      <div className="sectors-list">
        <h5>Selected Sectors ({sectors.length})</h5>
        {sectors.length === 0 ? (
          <p className="empty-sectors">No sectors added yet.</p>
        ) : (
          <div className="sectors-grid">
            {sectors.map((sector, index) => (
              <div key={index} className="sector-tag">
                <span>
                  {sector.region.charAt(0).toUpperCase()}-{sector.side.charAt(0).toUpperCase()}-{sector.zone.toUpperCase()}
                  {sector.section && `-${sector.section}`}
                </span>
                <button onClick={() => removeSector(index)} className="remove-sector-button">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="map-info">
        <h5>PI-RADS v2.1 Sector Map Reference</h5>
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-color pz"></span>
            <span>PZ - Peripheral Zone</span>
          </div>
          <div className="legend-item">
            <span className="legend-color cz"></span>
            <span>CZ - Central Zone</span>
          </div>
          <div className="legend-item">
            <span className="legend-color tz"></span>
            <span>TZ - Transition Zone</span>
          </div>
          <div className="legend-item">
            <span className="legend-color afs"></span>
            <span>AS - Anterior Fibromuscular Stroma</span>
          </div>
        </div>
        <p className="map-note">
          Use the form above to select sectors. Each sector is identified by Region (Apex/Mid/Base), 
          Side (Left/Right), Zone, and Section (for TZ and PZ only).
        </p>
      </div>
    </div>
  );
};

export default SectorSelector;

