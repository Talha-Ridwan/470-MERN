#!/bin/bash

echo "🔍 Checking if Node.js and npm are installed..."
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null
then
    echo "❌ Node.js and npm are required but not installed."
    echo "👉 Please install Node.js: https://nodejs.org/"
    exit 1
fi

echo "📦 Installing dependencies from package.json..."
npm install

echo "✅ All dependencies installed successfully!"
