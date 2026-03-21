# Portfolio Website

Static personal portfolio built with plain HTML, CSS, and JavaScript.

## Project Files

- `index.html`
- `styles.css`
- `script.js`
- `WhatsApp Image 2025-09-26 at 20.19.42_4ba84ce9.jpg`

## Run Locally

Open `index.html` directly, or use a local server:

```powershell
python -m http.server 5500
```

Then open: `http://localhost:5500`

## Deploy Quickly

### Option 1: Netlify (drag and drop)
1. Go to Netlify.
2. Open **Sites** → **Add new site** → **Deploy manually**.
3. Drag this project folder.

### Option 2: Vercel
1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: **Other** (static).
4. Deploy.

### Option 3: GitHub Pages
1. Push this project to GitHub.
2. Repository **Settings** → **Pages**.
3. Source: **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save.

## Notes

- Keep all referenced files in the project root unless you also update paths in `index.html`.
- If you rename the profile image, update the `<img src="...">` path in `index.html`.
