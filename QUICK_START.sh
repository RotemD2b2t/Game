#!/bin/bash
# 🎮 Game Project - Quick Start Commands

echo "════════════════════════════════════════════════════════════"
echo "          Game Project - Quick Start"
echo "════════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: Clone
echo -e "${BLUE}Step 1: Clone the repository${NC}"
echo "$ git clone https://github.com/RotemD2b2t/Game.git"
echo "$ cd Game"
echo ""

# Step 2: Install dependencies
echo -e "${BLUE}Step 2: Install Python dependencies${NC}"
echo "$ python3 -m pip install -r requirements.txt"
echo ""

echo -e "${BLUE}Step 3: Install Node dependencies${NC}"
echo "$ npm install"
echo ""

echo -e "${BLUE}Step 4: Build frontend${NC}"
echo "$ npm run build"
echo ""

# Step 3: Run server
echo -e "${BLUE}Step 5: Start the server${NC}"
echo ""
echo -e "${YELLOW}Option A (Recommended):${NC}"
echo "$ npm run dev"
echo ""
echo -e "${YELLOW}Option B:${NC}"
echo "$ python3 main.py"
echo ""

# Step 4: Open browser
echo -e "${GREEN}Step 6: Open your browser${NC}"
echo "→ http://localhost:5000"
echo ""

echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}Credentials:${NC}"
echo "Username: RotemD"
echo "Password: admin123"
echo "════════════════════════════════════════════════════════════"
echo ""

# Quick reference
echo -e "${BLUE}Quick Copy-Paste:${NC}"
echo ""
echo "git clone https://github.com/RotemD2b2t/Game.git && cd Game && python3 -m pip install -r requirements.txt && npm install && npm run build && python3 main.py"
echo ""
