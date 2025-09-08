#!/bin/bash

# Read JSON input from stdin
input=$(cat)

# Extract model display name using grep and sed (works without jq)
MODEL_DISPLAY=$(echo "$input" | grep -o '"display_name":"[^"]*"' | sed 's/"display_name":"\([^"]*\)"/\1/')
if [ -z "$MODEL_DISPLAY" ]; then
    MODEL_DISPLAY="Claude"
fi

# Extract current directory using grep and sed
CURRENT_DIR=$(echo "$input" | grep -o '"current_dir":"[^"]*"' | sed 's/"current_dir":"\([^"]*\)"/\1/')
if [ -z "$CURRENT_DIR" ]; then
    CURRENT_DIR=$(pwd)
fi

# Get directory name from path
DIR_NAME=$(basename "$CURRENT_DIR")

# Get git branch if in a git repo
GIT_BRANCH=""
if git rev-parse --git-dir > /dev/null 2>&1; then
    GIT_BRANCH=$(git branch --show-current 2>/dev/null)
    if [ -z "$GIT_BRANCH" ]; then
        # Handle detached HEAD state
        GIT_BRANCH=$(git rev-parse --short HEAD 2>/dev/null)
    fi
fi

# Build status line with actual model name
STATUS="[$MODEL_DISPLAY] | 📁 $DIR_NAME"
if [ -n "$GIT_BRANCH" ]; then
    STATUS="$STATUS | 🌿 $GIT_BRANCH"
fi

echo "$STATUS"