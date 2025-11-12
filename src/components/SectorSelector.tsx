import React from 'react';
import { Sector } from '../types';
import PIRADSMap from './PIRADSMap';
import './SectorSelector.css';

interface SectorSelectorProps {
  sectors: Sector[];
  onSectorsChange: (sectors: Sector[]) => void;
}

const SectorSelector: React.FC<SectorSelectorProps> = ({ sectors, onSectorsChange }) => {
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

  return (
    <div className="sector-selector">
      <PIRADSMap selectedSectors={sectors} onSectorClick={handleSectorClick} />

      <div className="sectors-list">
        <h5>Selected Sectors ({sectors.length})</h5>
        {sectors.length === 0 ? (
          <p className="empty-sectors">No sectors added yet. Click on sectors in the maps above to select them.</p>
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

