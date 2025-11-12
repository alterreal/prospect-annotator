import React, { useState, useRef, useEffect } from 'react';
import { Sector, Region, Side, Zone, Section } from '../types';
import './PIRADSMap.css';

interface PIRADSMapProps {
  selectedSectors: Sector[];
  onSectorClick: (sector: Sector) => void;
}

interface MapSector {
  id: string;
  region: Region;
  side: Side;
  zone: Zone;
  section?: Section;
  // Percentage-based coordinates (0-100)
  x: number;
  y: number;
  width: number;
  height: number;
}

type ValidRegion = 'base' | 'mid' | 'apex';

const PIRADSMap: React.FC<PIRADSMapProps> = ({ selectedSectors, onSectorClick }) => {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [showAllOverlays, setShowAllOverlays] = useState(false); // Debug/calibration mode
  
  const [imageSizes, setImageSizes] = useState<Record<ValidRegion, { width: number; height: number }>>({
    base: { width: 0, height: 0 },
    mid: { width: 0, height: 0 },
    apex: { width: 0, height: 0 }
  });
  
  const imageRefs: Record<ValidRegion, React.RefObject<HTMLImageElement>> = {
    base: useRef<HTMLImageElement>(null),
    mid: useRef<HTMLImageElement>(null),
    apex: useRef<HTMLImageElement>(null)
  };

  // Update image sizes when they load
  useEffect(() => {
    const updateSizes = () => {
      const sizes: Record<ValidRegion, { width: number; height: number }> = {
        base: { width: 0, height: 0 },
        mid: { width: 0, height: 0 },
        apex: { width: 0, height: 0 }
      };
      
      (Object.keys(imageRefs) as ValidRegion[]).forEach((region) => {
        const ref = imageRefs[region];
        if (ref.current) {
          sizes[region] = {
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight
          };
        }
      });
      
      setImageSizes(sizes);
    };

    (Object.values(imageRefs) as React.RefObject<HTMLImageElement>[]).forEach(ref => {
      if (ref.current) {
        ref.current.addEventListener('load', updateSizes);
      }
    });
    
    updateSizes();
    
    return () => {
      (Object.values(imageRefs) as React.RefObject<HTMLImageElement>[]).forEach(ref => {
        if (ref.current) {
          ref.current.removeEventListener('load', updateSizes);
        }
      });
    };
  }, []);

  // Define all sectors using percentage coordinates
  // These will need to be calibrated to match your actual images
  // Format: { region, side, zone, section?, x%, y%, width%, height% }
  const allSectors: MapSector[] = [
    // BASE VIEW
    { id: 'base-afs-left', region: 'base', side: 'left', zone: 'anterior_fibromuscular_stroma', x: 35, y: 4, width: 12, height: 8 },
    { id: 'base-afs-right', region: 'base', side: 'right', zone: 'anterior_fibromuscular_stroma', x: 53, y: 4, width: 12, height: 8 },
    { id: 'base-left-tz-anterior', region: 'base', side: 'left', zone: 'transition', section: 'anterior', x: 23, y: 24, width: 20, height: 20 },
    { id: 'base-left-tz-posterior', region: 'base', side: 'left', zone: 'transition', section: 'posterior', x: 24, y: 50, width: 15, height: 8 },
    { id: 'base-left-pz-anterior', region: 'base', side: 'left', zone: 'peripheral', section: 'anterior', x: 3, y: 42, width: 15, height: 6 },
    { id: 'base-left-pz-posterior-lateral', region: 'base', side: 'left', zone: 'peripheral', section: 'posterior_lateral', x: 8, y: 62, width: 15, height: 15 },
    { id: 'base-left-pz-posterior-medial', region: 'base', side: 'left', zone: 'peripheral', section: 'posterior_medial', x: 19, y: 86, width: 15, height: 10 },
    { id: 'base-left-cz', region: 'base', side: 'left', zone: 'central', x: 27, y: 60, width: 15, height: 10 },
    { id: 'base-right-tz-anterior', region: 'base', side: 'right', zone: 'transition', section: 'anterior', x: 57, y: 24, width: 20, height: 20 },
    { id: 'base-right-tz-posterior', region: 'base', side: 'right', zone: 'transition', section: 'posterior', x: 61, y: 50, width: 15, height: 8 },
    { id: 'base-right-pz-anterior', region: 'base', side: 'right', zone: 'peripheral', section: 'anterior', x: 82, y: 42, width: 15, height: 6 },
    { id: 'base-right-pz-posterior-lateral', region: 'base', side: 'right', zone: 'peripheral', section: 'posterior_lateral', x: 77, y: 62, width: 15, height: 15 },
    { id: 'base-right-pz-posterior-medial', region: 'base', side: 'right', zone: 'peripheral', section: 'posterior_medial', x: 66, y: 86, width: 15, height: 10 },
    { id: 'base-right-cz', region: 'base', side: 'right', zone: 'central', x: 58, y: 60, width: 15, height: 10 },
    
    // MID VIEW
    { id: 'mid-afs-left', region: 'mid', side: 'left', zone: 'anterior_fibromuscular_stroma', x: 36, y: 6, width: 12, height: 8 },
    { id: 'mid-afs-right', region: 'mid', side: 'right', zone: 'anterior_fibromuscular_stroma', x: 52, y: 6, width: 12, height: 8 },
    { id: 'mid-left-tz-anterior', region: 'mid', side: 'left', zone: 'transition', section: 'anterior', x: 24, y: 26, width: 20, height: 20 },
    { id: 'mid-left-tz-posterior', region: 'mid', side: 'left', zone: 'transition', section: 'posterior', x: 26, y: 47, width: 14, height: 11 },
    { id: 'mid-left-pz-anterior', region: 'mid', side: 'left', zone: 'peripheral', section: 'anterior', x: 7, y: 39, width: 12, height: 8 },
    { id: 'mid-left-pz-posterior-lateral', region: 'mid', side: 'left', zone: 'peripheral', section: 'posterior_lateral', x: 11, y: 60, width: 12, height: 10 },
    { id: 'mid-left-pz-posterior-medial', region: 'mid', side: 'left', zone: 'peripheral', section: 'posterior_medial', x: 33, y: 62, width: 15, height: 20 },
    { id: 'mid-right-tz-anterior', region: 'mid', side: 'right', zone: 'transition', section: 'anterior', x: 56, y: 26, width: 20, height: 20 },
    { id: 'mid-right-tz-posterior', region: 'mid', side: 'right', zone: 'transition', section: 'posterior', x: 60, y: 47, width: 14, height: 11 },
    { id: 'mid-right-pz-anterior', region: 'mid', side: 'right', zone: 'peripheral', section: 'anterior', x: 81, y: 39, width: 12, height: 8 },
    { id: 'mid-right-pz-posterior-lateral', region: 'mid', side: 'right', zone: 'peripheral', section: 'posterior_lateral', x: 77, y: 60, width: 12, height: 10 },
    { id: 'mid-right-pz-posterior-medial', region: 'mid', side: 'right', zone: 'peripheral', section: 'posterior_medial', x: 52, y: 62, width: 15, height: 20 },
    
    // APEX VIEW
    { id: 'apex-afs-left', region: 'apex', side: 'left', zone: 'anterior_fibromuscular_stroma', x: 35, y: 12, width: 14, height: 8 },
    { id: 'apex-afs-right', region: 'apex', side: 'right', zone: 'anterior_fibromuscular_stroma', x: 51, y: 12, width: 14, height: 8 },
    { id: 'apex-left-tz-anterior', region: 'apex', side: 'left', zone: 'transition', section: 'anterior', x: 34, y: 27, width: 12, height: 8 },
    { id: 'apex-left-tz-posterior', region: 'apex', side: 'left', zone: 'transition', section: 'posterior', x: 32, y: 40, width: 13, height: 12 },
    { id: 'apex-left-pz-anterior', region: 'apex', side: 'left', zone: 'peripheral', section: 'anterior', x: 15, y: 25, width: 15, height: 9 },
    { id: 'apex-left-pz-posterior-lateral', region: 'apex', side: 'left', zone: 'peripheral', section: 'posterior_lateral', x: 11, y: 56, width: 12, height: 10 },
    { id: 'apex-left-pz-posterior-medial', region: 'apex', side: 'left', zone: 'peripheral', section: 'posterior_medial', x: 30, y: 63, width: 18, height: 12 },
    { id: 'apex-right-tz-anterior', region: 'apex', side: 'right', zone: 'transition', section: 'anterior', x: 54, y: 27, width: 12, height: 8 },
    { id: 'apex-right-tz-posterior', region: 'apex', side: 'right', zone: 'transition', section: 'posterior', x: 55, y: 40, width: 13, height: 12 },
    { id: 'apex-right-pz-anterior', region: 'apex', side: 'right', zone: 'peripheral', section: 'anterior', x: 70, y: 25, width: 15, height: 9 },
    { id: 'apex-right-pz-posterior-lateral', region: 'apex', side: 'right', zone: 'peripheral', section: 'posterior_lateral', x: 77, y: 56, width: 12, height: 10 },
    { id: 'apex-right-pz-posterior-medial', region: 'apex', side: 'right', zone: 'peripheral', section: 'posterior_medial', x: 52, y: 63, width: 18, height: 12 },
  ];

  const getSectorsForRegion = (region: Region): MapSector[] => {
    return allSectors.filter(s => s.region === region);
  };

  const isSectorSelected = (sector: MapSector): boolean => {
    return selectedSectors.some(s =>
      s.region === sector.region &&
      s.side === sector.side &&
      s.zone === sector.zone &&
      s.section === sector.section
    );
  };

  const handleSectorClick = (sector: MapSector) => {
    const newSector: Sector = {
      region: sector.region,
      side: sector.side,
      zone: sector.zone,
      ...(sector.section && { section: sector.section })
    };
    onSectorClick(newSector);
  };

  const renderMapWithOverlay = (region: ValidRegion) => {
    const sectors = getSectorsForRegion(region);
    const size = imageSizes[region];
    const imagePath = `/pirads-map-${region}.png`;

    return (
      <div key={region} className="map-view-container">
        <h4 className="map-view-title">
          {region.charAt(0).toUpperCase() + region.slice(1)} View
        </h4>
        <div className="map-image-wrapper">
          <img
            ref={imageRefs[region]}
            src={imagePath}
            alt={`PI-RADS ${region} view`}
            className="pirads-map-image"
          />
          {size.width > 0 && size.height > 0 && (
            <svg
              className="prostate-svg-overlay"
              width={size.width}
              height={size.height}
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {sectors.map((sector) => {
                const isSelected = isSectorSelected(sector);
                const isHovered = hoveredSector === sector.id;
                
                const x = (sector.x / 100) * size.width;
                const y = (sector.y / 100) * size.height;
                const width = (sector.width / 100) * size.width;
                const height = (sector.height / 100) * size.height;
                
                // Get zone color for overlay
                const getZoneColor = (zone: Zone) => {
                  switch (zone) {
                    case 'peripheral': return '#ffb3ba';
                    case 'central': return '#90ee90';
                    case 'transition': return '#ffd700';
                    case 'anterior_fibromuscular_stroma': return '#87ceeb';
                    default: return '#cccccc';
                  }
                };
                
                return (
                  <g key={sector.id}>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={isSelected ? '#e74c3c' : isHovered ? '#3498db' : showAllOverlays ? getZoneColor(sector.zone) : 'transparent'}
                      stroke={isSelected ? '#e74c3c' : isHovered ? '#3498db' : showAllOverlays ? '#333' : 'transparent'}
                      strokeWidth={isSelected ? 3 : isHovered ? 2 : showAllOverlays ? 1 : 0}
                      opacity={isSelected ? 0.4 : isHovered ? 0.3 : showAllOverlays ? 0.2 : 0}
                      className="sector-path"
                      onClick={() => handleSectorClick(sector)}
                      onMouseEnter={() => setHoveredSector(sector.id)}
                      onMouseLeave={() => setHoveredSector(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    {showAllOverlays && (
                      <text
                        x={x + width / 2}
                        y={y + height / 2}
                        fontSize="8"
                        fill="#333"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        pointerEvents="none"
                        style={{ fontWeight: 'bold' }}
                      >
                        {sector.id.split('-').slice(-2).join('-')}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="pirads-map">
      <div className="map-controls-bar">
        <button
          className={`calibration-button ${showAllOverlays ? 'active' : ''}`}
          onClick={() => setShowAllOverlays(!showAllOverlays)}
          title="Show all sector overlays for calibration"
        >
          {showAllOverlays ? 'Hide' : 'Show'} All Sectors
        </button>
        {showAllOverlays && (
          <span className="calibration-note">
            Calibration mode: All sector boundaries are visible. Adjust coordinates in code to align with your images.
          </span>
        )}
      </div>
      <div className="maps-grid">
        {renderMapWithOverlay('base')}
        {renderMapWithOverlay('mid')}
        {renderMapWithOverlay('apex')}
      </div>

      <div className="map-legend">
        <h5>Zone Legend</h5>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ffb3ba' }}></span>
            <span>PZ - Peripheral Zone</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#90ee90' }}></span>
            <span>CZ - Central Zone</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ffd700' }}></span>
            <span>TZ - Transition Zone</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#87ceeb' }}></span>
            <span>AS - Anterior Fibromuscular Stroma</span>
          </div>
        </div>
      </div>

      <p className="map-instructions">
        Click directly on sectors in the images above to select them. Selected sectors are highlighted in red.
      </p>
    </div>
  );
};

export default PIRADSMap;

