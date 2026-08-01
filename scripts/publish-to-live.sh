#!/bin/bash

echo "Removing dist folder..."
rm -rf dist

echo "Building project..."
npm run build

echo "Deploying to Firebase..."
firebase deploy --only hosting:les-ranalan

echo "Deployment complete!"