# How to open Protein Burgers (if you see a blank page)

## Easiest way (Mac)

1. In Finder, go to:  
   `Documents → proteinburger → protein-burgers`
2. **Double-click** `start.command`
3. If macOS asks, click **Open**
4. In Terminal, wait for: `Local: http://127.0.0.1:5173/` (port may be 5174, 5175, 5176…)
5. **Copy that exact URL** into Chrome or Safari

## Terminal way

```bash
cd /Users/karthikbalaji/Documents/proteinburger/protein-burgers
npm install
npm run dev
```

Open the **Local** URL printed in the terminal.

## Do NOT do this

- Do not double-click `index.html` — it will stay blank
- Do not use a random port — use the port Vite prints
- Do not run `npm run dev` from the parent folder unless you use `npm run dev` from `/proteinburger` (wrapper script)

## Still blank?

1. Stop old servers (close other Terminal windows running Vite)
2. Run again:

```bash
cd /Users/karthikbalaji/Documents/proteinburger/protein-burgers
npm run dev
```

3. Try the new URL (e.g. `http://127.0.0.1:5176/`)
4. Hard refresh: **Cmd + Shift + R**

## Alternative: production preview

```bash
cd /Users/karthikbalaji/Documents/proteinburger/protein-burgers
npm run build
npm run preview
```

Open the URL shown (usually `http://127.0.0.1:4173/`).
