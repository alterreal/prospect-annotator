# PROSPECT Annotator

A web application for labeling MRI prostate radiology reports with structured, standardized information.

## Features

- **Report Loading**: Load and display .txt files containing radiology reports.
- **Structured Labeling**: Capture standardized clinical fields such as:
  - PSA levels (ng/mL) — Numeric
  - Prostate volume (cc) — Numeric
  - Extracapsular extension (EPE) — Yes/No
  - Seminal vesicle invasion (SVI) — Yes/No
  - Enlarged lymph nodes — Yes/No
  - Main findings — Free text
- **Lesion Management**: Add, select, and remove multiple lesions with:
  - PI-RADS score (1–5)
  - Lesion volume (cc)
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

## Deployment

This app is configured for automatic deployment to GitHub Pages. After pushing to the `main` or `master` branch, GitHub Actions will automatically build and deploy the app.

### Setting up GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The app will be available at: `https://YOUR_USERNAME.github.io/prospect-annotator/`

The deployment workflow will run automatically on every push to the main branch.

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

