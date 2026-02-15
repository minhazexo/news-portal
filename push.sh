#!/bin/bash

# Usage: ./push.sh "Your commit message"

# Exit if no commit message
if [ -z "$1" ]; then
  echo "Usage: ./push.sh 'Your commit message'"
  exit 1
fi

# Navigate to project folder
cd /data/data/com.termux/files/home/news-portal || exit

# Add all changes
git add .

# Commit changes
git commit -m "$1"

# Check if remote is set
if ! git remote | grep -q origin; then
    git remote add origin https://github.com/minhazexo/news-portal.git
fi

# Push and set upstream if needed
git push --set-upstream origin main

echo "✅ All changes pushed to GitHub!"