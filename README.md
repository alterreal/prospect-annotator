# PROSPECT Annotator

A web application for labeling MRI prostate radiology reports with structured, standardized information.

## Features

- **Report Loading**: Load and display .txt files containing radiology reports.
- **Structured Labeling**: Capture standardized clinical fields such as:
  - PSA levels (ng/mL) — Numeric
  - Prostate volume (cc) — Numeric
  - Extracapsular extension (EPE) — Yes/No/N/A
  - Seminal vesicle invasion (SVI) — Yes/No/N/A
  - Enlarged lymph nodes — Yes/No/N/A
  - Neurovascular Bundle Involvement — Yes/No/N/A
  - Bladder Neck Involvement — Yes/No/N/A
  - Rectal Wall Involvement — Yes/No/N/A
- **Lesion Management**: Add, select, and remove multiple lesions with:
  - PI-RADS score (1–5)
  - Maximum Diameter (mm)
  - Sector locations according to the PI-RADS v2.1 prostate sector map
- **Sector Labelling Modes**: Choose how to annotate lesion sectors:
  - **Image Mode (default)** — click directly on the PI-RADS map to toggle sectors.
  - **Dropdown Mode** — select Region, Side, Zone, and Section via form inputs.
- **JSON Export**: Save the completed label set in a JSON structure.

## Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Build

Generate a production build:
```bash
npm run build
```

## GitHub Pages

The app is also available [here](https://alterreal.github.io/prospect-annotator/)


## Usage

1. Click **Load Report** to choose a `.txt` radiology report (displayed on the left pane).
2. Review the report and fill in the clinical fields on the right pane.
3. Click **Add Lesion** to create a lesion entry, then select it to edit sector information.
4. Choose the **Labelling Mode**:
   - In **Image** mode, click sectors on the PI-RADS map. Selected areas are highlighted in red, and the legend below the map explains the abbreviations.
   - In **Dropdown** mode, use the Region, Side, Zone, and Section selectors and click **Add Sector**.
5. Review the **Selected Sectors** list. Remove any sectors if needed by clicking the × button.
6. When finished, click **Save Labels** to download the JSON file.

## JSON Output Format

The exported JSON follows this structure:

```json
{
  "psa": 6.5,
  "prostate_volume": 45.2,
  "epe": true,
  "svi": false,
  "enlarged_lymph_nodes": false,
  "neurovascular_bundle_involvement": null,
  "bladder_neck_involvement": null,
  "rectal_wall_involvement": null,
  "lesions": [
    {
      "id": 1,
      "pirads": 4,
      "maximum_diameter": 15.5,
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

