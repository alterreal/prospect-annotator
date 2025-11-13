import React, { useState } from 'react';
import { Sector, Region, Side, Zone, Section } from '../types';
import PIRADSMap from './PIRADSMap';
import './SectorSelector.css';

interface SectorSelectorProps {
  sectors: Sector[];
  onSectorsChange: (sectors: Sector[]) => void;
}

const SectorSelector: React.FC<SectorSelectorProps> = ({ sectors, onSectorsChange }) => {
  const [mode, setMode] = useState<'image' | 'dropdown'>('image');
  const [currentSector, setCurrentSector] = useState<{
    region: Region;
    side: Side;
    zone: Zone;
    section: Section;
  }>({
    region: '',
    side: '',
    zone: '',
    section: '',
  });

  const handleSectorClick = (sector: Sector) => {
    // Check if sector already exists
    const exists = sectors.some(s =>
      s.region === sector.region &&
      s.side === sector.side &&
      s.zone === sector.zone &&
      s.section === sector.section
    );

    if (exists) {
      // If it exists, remove it (toggle behavior)
      onSectorsChange(sectors.filter(s =>
        !(s.region === sector.region &&
          s.side === sector.side &&
          s.zone === sector.zone &&
          s.section === sector.section)
      ));
    } else {
      // If it doesn't exist, add it
      onSectorsChange([...sectors, sector]);
    }
  };

  const removeSector = (index: number) => {
    onSectorsChange(sectors.filter((_, i) => i !== index));
  };

  const handleModeChange = (nextMode: 'image' | 'dropdown') => {
    setMode(nextMode);
  };

  const handleCurrentSectorChange = <K extends keyof typeof currentSector>(field: K, value: typeof currentSector[K]) => {
    setCurrentSector(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'zone' && value !== 'transition' && value !== 'peripheral' ? { section: '' as Section } : {}),
    }));
  };

  const handleAddSector = () => {
    const { region, side, zone, section } = currentSector;
    if (!region || !side || !zone) {
      alert('Please fill in Region, Side, and Zone.');
      return;
    }

    if ((zone === 'transition' || zone === 'peripheral') && !section) {
      alert('Section is required for Transition Zone and Peripheral Zone.');
      return;
    }

    const newSector: Sector = {
      region,
      side,
      zone,
      ...(section ? { section } : {}),
    };

    // prevent duplicates
    const exists = sectors.some(s =>
      s.region === newSector.region &&
      s.side === newSector.side &&
      s.zone === newSector.zone &&
      s.section === newSector.section
    );

    if (exists) {
      alert('This sector is already added.');
      return;
    }

    onSectorsChange([...sectors, newSector]);
    setCurrentSector({
      region: '',
      side: '',
      zone: '',
      section: '',
    });
  };

  const emptyMessage =
    mode === 'image'
      ? 'No sectors added yet. Click on sectors in the map above to select them.'
      : 'No sectors added yet. Use the dropdown form above to add them.';

  return (
    <div className="sector-selector">
      <div className="sector-mode-toggle">
        <span>Labelling Mode:</span>
        <div className="sector-mode-buttons">
          <button
            className={mode === 'image' ? 'active' : ''}
            onClick={() => handleModeChange('image')}
          >
            Image
          </button>
          <button
            className={mode === 'dropdown' ? 'active' : ''}
            onClick={() => handleModeChange('dropdown')}
          >
            Dropdown
          </button>
        </div>
      </div>

      {mode === 'image' && (
        <p className="map-instructions">
          Click directly on sectors in the map to select them. Selected sectors are highlighted in red.
        </p>
      )}

      {mode === 'image' ? (
        <PIRADSMap selectedSectors={sectors} onSectorClick={handleSectorClick} />
      ) : (
        <div className="sector-form">
          <div className="form-row">
            <div className="form-field">
              <label>Region</label>
              <select
                value={currentSector.region}
                onChange={(e) => handleCurrentSectorChange('region', e.target.value as Region)}
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
                onChange={(e) => handleCurrentSectorChange('side', e.target.value as Side)}
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
                onChange={(e) => handleCurrentSectorChange('zone', e.target.value as Zone)}
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
                  value={currentSector.section}
                  onChange={(e) => handleCurrentSectorChange('section', e.target.value as Section)}
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

          <button onClick={handleAddSector} className="add-sector-button">
            Add Sector
          </button>
        </div>
      )}

      <div className="sectors-list">
        <h5>Selected Sectors ({sectors.length})</h5>
        {sectors.length === 0 ? (
          <p className="empty-sectors">{emptyMessage}</p>
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
    </div>
  );
};

export default SectorSelector;

