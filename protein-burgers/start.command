#!/bin/bash
cd "$(dirname "$0")"
echo ""
echo "=========================================="
echo "  Protein Burgers — starting dev server"
echo "=========================================="
echo ""
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies (first time only)..."
  npm install
fi
echo ""
echo "Your site will open at: http://127.0.0.1:5190/"
echo "(If that port is busy, close other Terminal windows running Vite first.)"
echo ""
npm run dev
