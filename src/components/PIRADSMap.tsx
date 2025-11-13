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
type SectorDefinition = Omit<MapSector, 'side'> & { visualSide: 'left' | 'right' };

const PIRADSMap: React.FC<PIRADSMapProps> = ({ selectedSectors, onSectorClick }) => {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<ValidRegion>('base');
  
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

  // Update image sizes when they load or when region changes
  useEffect(() => {
    const updateSizeForRegion = (region: ValidRegion) => {
      const ref = imageRefs[region];
      if (ref.current) {
        const width = ref.current.offsetWidth || ref.current.naturalWidth || 0;
        const height = ref.current.offsetHeight || ref.current.naturalHeight || 0;

        if (width > 0 && height > 0) {
          setImageSizes(prev => {
            const previousSize = prev[region];
            if (previousSize.width === width && previousSize.height === height) {
              return prev;
            }

            return {
              ...prev,
              [region]: { width, height }
            };
          });
        }
      }
    };

    const ref = imageRefs[activeRegion];
    let cleanupLoad: (() => void) | undefined;

    if (ref.current) {
      if (ref.current.complete) {
        updateSizeForRegion(activeRegion);
      } else {
        const handleLoad = () => {
          updateSizeForRegion(activeRegion);
          ref.current?.removeEventListener('load', handleLoad);
        };
        ref.current.addEventListener('load', handleLoad);
        cleanupLoad = () => {
          ref.current?.removeEventListener('load', handleLoad);
        };
      }
    }

    const timeoutId = window.setTimeout(() => {
      updateSizeForRegion(activeRegion);
    }, 50);

    const handleResize = () => {
      window.requestAnimationFrame(() => updateSizeForRegion(activeRegion));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      if (cleanupLoad) {
        cleanupLoad();
      }
    };
  }, [activeRegion]);

  // Define all sectors using percentage coordinates
  // These will need to be calibrated to match your actual images
  // Format: { region, side, zone, section?, x%, y%, width%, height% }
  const sectorDefinitions: SectorDefinition[] = [
    // BASE VIEW
    { id: 'base-afs-left', region: 'base', visualSide: 'left', zone: 'anterior_fibromuscular_stroma', x: 35, y: 4, width: 12, height: 8 },
    { id: 'base-afs-right', region: 'base', visualSide: 'right', zone: 'anterior_fibromuscular_stroma', x: 53, y: 4, width: 12, height: 8 },
    { id: 'base-left-tz-anterior', region: 'base', visualSide: 'left', zone: 'transition', section: 'anterior', x: 23, y: 24, width: 20, height: 20 },
    { id: 'base-left-tz-posterior', region: 'base', visualSide: 'left', zone: 'transition', section: 'posterior', x: 24, y: 50, width: 15, height: 8 },
    { id: 'base-left-pz-anterior', region: 'base', visualSide: 'left', zone: 'peripheral', section: 'anterior', x: 3, y: 42, width: 15, height: 6 },
    { id: 'base-left-pz-posterior-lateral', region: 'base', visualSide: 'left', zone: 'peripheral', section: 'posterior_lateral', x: 8, y: 62, width: 15, height: 15 },
    { id: 'base-left-pz-posterior-medial', region: 'base', visualSide: 'left', zone: 'peripheral', section: 'posterior_medial', x: 19, y: 86, width: 15, height: 10 },
    { id: 'base-left-cz', region: 'base', visualSide: 'left', zone: 'central', x: 27, y: 60, width: 15, height: 10 },
    { id: 'base-right-tz-anterior', region: 'base', visualSide: 'right', zone: 'transition', section: 'anterior', x: 57, y: 24, width: 20, height: 20 },
    { id: 'base-right-tz-posterior', region: 'base', visualSide: 'right', zone: 'transition', section: 'posterior', x: 61, y: 50, width: 15, height: 8 },
    { id: 'base-right-pz-anterior', region: 'base', visualSide: 'right', zone: 'peripheral', section: 'anterior', x: 82, y: 42, width: 15, height: 6 },
    { id: 'base-right-pz-posterior-lateral', region: 'base', visualSide: 'right', zone: 'peripheral', section: 'posterior_lateral', x: 77, y: 62, width: 15, height: 15 },
    { id: 'base-right-pz-posterior-medial', region: 'base', visualSide: 'right', zone: 'peripheral', section: 'posterior_medial', x: 66, y: 86, width: 15, height: 10 },
    { id: 'base-right-cz', region: 'base', visualSide: 'right', zone: 'central', x: 58, y: 60, width: 15, height: 10 },
    
    // MID VIEW
    { id: 'mid-afs-left', region: 'mid', visualSide: 'left', zone: 'anterior_fibromuscular_stroma', x: 36, y: 6, width: 12, height: 8 },
    { id: 'mid-afs-right', region: 'mid', visualSide: 'right', zone: 'anterior_fibromuscular_stroma', x: 52, y: 6, width: 12, height: 8 },
    { id: 'mid-left-tz-anterior', region: 'mid', visualSide: 'left', zone: 'transition', section: 'anterior', x: 24, y: 26, width: 20, height: 20 },
    { id: 'mid-left-tz-posterior', region: 'mid', visualSide: 'left', zone: 'transition', section: 'posterior', x: 26, y: 47, width: 14, height: 11 },
    { id: 'mid-left-pz-anterior', region: 'mid', visualSide: 'left', zone: 'peripheral', section: 'anterior', x: 7, y: 39, width: 12, height: 8 },
    { id: 'mid-left-pz-posterior-lateral', region: 'mid', visualSide: 'left', zone: 'peripheral', section: 'posterior_lateral', x: 11, y: 60, width: 12, height: 10 },
    { id: 'mid-left-pz-posterior-medial', region: 'mid', visualSide: 'left', zone: 'peripheral', section: 'posterior_medial', x: 33, y: 62, width: 15, height: 20 },
    { id: 'mid-right-tz-anterior', region: 'mid', visualSide: 'right', zone: 'transition', section: 'anterior', x: 56, y: 26, width: 20, height: 20 },
    { id: 'mid-right-tz-posterior', region: 'mid', visualSide: 'right', zone: 'transition', section: 'posterior', x: 60, y: 47, width: 14, height: 11 },
    { id: 'mid-right-pz-anterior', region: 'mid', visualSide: 'right', zone: 'peripheral', section: 'anterior', x: 81, y: 39, width: 12, height: 8 },
    { id: 'mid-right-pz-posterior-lateral', region: 'mid', visualSide: 'right', zone: 'peripheral', section: 'posterior_lateral', x: 77, y: 60, width: 12, height: 10 },
    { id: 'mid-right-pz-posterior-medial', region: 'mid', visualSide: 'right', zone: 'peripheral', section: 'posterior_medial', x: 52, y: 62, width: 15, height: 20 },
    
    // APEX VIEW
    { id: 'apex-afs-left', region: 'apex', visualSide: 'left', zone: 'anterior_fibromuscular_stroma', x: 35, y: 12, width: 14, height: 8 },
    { id: 'apex-afs-right', region: 'apex', visualSide: 'right', zone: 'anterior_fibromuscular_stroma', x: 51, y: 12, width: 14, height: 8 },
    { id: 'apex-left-tz-anterior', region: 'apex', visualSide: 'left', zone: 'transition', section: 'anterior', x: 34, y: 27, width: 12, height: 8 },
    { id: 'apex-left-tz-posterior', region: 'apex', visualSide: 'left', zone: 'transition', section: 'posterior', x: 32, y: 40, width: 13, height: 12 },
    { id: 'apex-left-pz-anterior', region: 'apex', visualSide: 'left', zone: 'peripheral', section: 'anterior', x: 15, y: 25, width: 15, height: 9 },
    { id: 'apex-left-pz-posterior-lateral', region: 'apex', visualSide: 'left', zone: 'peripheral', section: 'posterior_lateral', x: 11, y: 56, width: 12, height: 10 },
    { id: 'apex-left-pz-posterior-medial', region: 'apex', visualSide: 'left', zone: 'peripheral', section: 'posterior_medial', x: 30, y: 63, width: 18, height: 12 },
    { id: 'apex-right-tz-anterior', region: 'apex', visualSide: 'right', zone: 'transition', section: 'anterior', x: 54, y: 27, width: 12, height: 8 },
    { id: 'apex-right-tz-posterior', region: 'apex', visualSide: 'right', zone: 'transition', section: 'posterior', x: 55, y: 40, width: 13, height: 12 },
    { id: 'apex-right-pz-anterior', region: 'apex', visualSide: 'right', zone: 'peripheral', section: 'anterior', x: 70, y: 25, width: 15, height: 9 },
    { id: 'apex-right-pz-posterior-lateral', region: 'apex', visualSide: 'right', zone: 'peripheral', section: 'posterior_lateral', x: 77, y: 56, width: 12, height: 10 },
    { id: 'apex-right-pz-posterior-medial', region: 'apex', visualSide: 'right', zone: 'peripheral', section: 'posterior_medial', x: 52, y: 63, width: 18, height: 12 },
  ];

  const allSectors: MapSector[] = sectorDefinitions.map(({ visualSide, ...sector }) => ({
    ...sector,
    side: visualSide === 'left' ? 'right' : 'left',
  }));

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

  const handleImageLoad = (region: ValidRegion) => {
    const ref = imageRefs[region];
    if (ref.current) {
      const width = ref.current.offsetWidth || ref.current.naturalWidth || 0;
      const height = ref.current.offsetHeight || ref.current.naturalHeight || 0;
      
      if (width > 0 && height > 0) {
        setImageSizes(prev => ({
          ...prev,
          [region]: { width, height }
        }));
      }
    }
  };

  const renderMapWithOverlay = (region: ValidRegion) => {
    const sectors = getSectorsForRegion(region);
    const size = imageSizes[region];
    const imagePath = `${import.meta.env.BASE_URL}pirads-map-${region}.png`;

    return (
      <div key={region} className="map-view-container">
        <div className="map-image-wrapper">
          <img
            ref={imageRefs[region]}
            src={imagePath}
            alt={`PI-RADS ${region} view`}
            className="pirads-map-image"
            onLoad={() => handleImageLoad(region)}
          />
          {size.width > 0 && size.height > 0 && (
            <svg
              className="prostate-svg-overlay"
              width={size.width}
              height={size.height}
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              <text
                x={size.width * 0.05}
                y={size.height * 0.08}
                className="side-label"
                textAnchor="start"
                dominantBaseline="middle"
              >
                R
              </text>
              <text
                x={size.width * 0.95}
                y={size.height * 0.08}
                className="side-label"
                textAnchor="end"
                dominantBaseline="middle"
              >
                L
              </text>
              {sectors.map((sector) => {
                const isSelected = isSectorSelected(sector);
                const isHovered = hoveredSector === sector.id;
                
                const x = (sector.x / 100) * size.width;
                const y = (sector.y / 100) * size.height;
                const width = (sector.width / 100) * size.width;
                const height = (sector.height / 100) * size.height;
                
                return (
                  <rect
                    key={sector.id}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={isSelected ? '#e74c3c' : isHovered ? '#3498db' : 'transparent'}
                    stroke={isSelected ? '#e74c3c' : isHovered ? '#3498db' : 'transparent'}
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 0}
                    opacity={isSelected ? 0.4 : isHovered ? 0.3 : 0}
                    className="sector-path"
                    onClick={() => handleSectorClick(sector)}
                    onMouseEnter={() => setHoveredSector(sector.id)}
                    onMouseLeave={() => setHoveredSector(null)}
                    style={{ cursor: 'pointer' }}
                  />
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
      <div className="map-content">
        <div className="map-controls">
          <button
            className={activeRegion === 'base' ? 'active' : ''}
            onClick={() => setActiveRegion('base')}
          >
            Base
          </button>
          <button
            className={activeRegion === 'mid' ? 'active' : ''}
            onClick={() => setActiveRegion('mid')}
          >
            Mid
          </button>
          <button
            className={activeRegion === 'apex' ? 'active' : ''}
            onClick={() => setActiveRegion('apex')}
          >
            Apex
          </button>
        </div>
        {renderMapWithOverlay(activeRegion)}
        <div className="map-legend">
          <div className="legend-columns">
            <span>
              Zone:&nbsp;
              <strong>
                Transition (TZ), Peripheral (PZ), Central (CZ), Anterior Fibromuscular Stroma (AFS)
              </strong>
            </span>
            <span>
              Section:&nbsp;
              <strong>Anterior (a), Posterior Medial (pm), Posterior Lateral (pl), Posterior (p)</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PIRADSMap;

