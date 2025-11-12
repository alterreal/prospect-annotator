# Prospect Annotator

A web application for labeling MRI prostate radiology reports with structured, standardized information.

## Features

- **Report Loading**: Load and display .txt files containing radiology reports
- **Structured Labeling**: Label reports with standardized fields including:
  - Extracapsular extension (EPE) - Yes/No
  - Seminal vesicle invasion (SVI) - Yes/No
  - Enlarged lymph nodes - Yes/No
  - Prostate volume (cc) - Numeric
  - PSA levels (ng/mL) - Numeric
  - Main findings - Text
- **Lesion Management**: Add and manage multiple lesions with:
  - PI-RADS score (1-5)
  - Lesion volume (cc)
  - Sector locations according to PI-RADS v2.1 prostate sector map
- **Sector Selection**: Select prostate sectors using PI-RADS v2.1 classification:
  - Region: Apex (A), Mid (M), Base (B)
  - Side: Left (l), Right (r)
  - Zone: Transition (TZ), Peripheral (PZ), Central (CZ), Anterior Fibromuscular Stroma (AS)
  - Section (for TZ and PZ only): anterior (a), posterior medial (pm), posterior lateral (pl), posterior (p)
- **JSON Export**: Save labels in JSON format matching the expected schema

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

## Usage

1. Click "Load Report" to load a .txt file containing a radiology report
2. The report content will be displayed on the left side
3. Fill in the labeling fields on the right side:
   - Use Yes/No buttons for binary fields
   - Enter numeric values for volume and PSA
   - Add text for main findings
4. To add lesions:
   - Click "Add Lesion"
   - Select the lesion to configure it
   - Enter PI-RADS score and volume
   - Add sectors using the sector selector form
5. Click "Save Labels" to export the labels as a JSON file

## JSON Output Format

The exported JSON follows this structure:

```json
{
  "epe": true,
  "svi": false,
  "enlarged_lymph_nodes": false,
  "prostate_volume": 45.2,
  "psa": 6.5,
  "main_findings": "Description of findings...",
  "lesions": [
    {
      "id": 1,
      "pirads": 4,
      "volume": 2.3,
      "sectors": [
        {
          "region": "base",
          "side": "left",
          "zone": "peripheral",
          "section": "posterior"
        }
      ]
    }
  ]
}
```

## Technologies

- React 18
- TypeScript
- Vite
- CSS3

## License

MIT

