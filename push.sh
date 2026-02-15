#!/bin/bash

# Check if a commit message was passed
if [ -z "$1" ]; then
  echo "Usage: ./push.sh 'Your commit message'"
  exit 1
fi

# Navigate to project folder (optional if already in it)
cd /data/data/com.termux/files/home/news-portal || exit

# Add all changes
git add .

# Commit with your message
git commit -m "$1"

# Push to GitHub (set upstream if not set)
git push --set-upstream origin main

echo "✅ All changes pushed to GitHub!"