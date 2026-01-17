#!/bin/bash
# Mac Setup Script for Game Project
# Run this in your terminal from the Game directory

echo "=== Game Project - Mac Setup ==="

# Check if python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "⚠️  python3 לא מותקן!"
    echo "התקנה דרך Homebrew:"
    echo "  1. /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    echo "  2. brew install python@3.11"
    exit 1
fi

echo "✓ python3 מותקן: $(python3 --version)"
echo "✓ npm מותקן: $(npm --version)"
echo "✓ node מותקן: $(node --version)"
echo ""

# Step 1: Install Python dependencies
echo "1️⃣  התקנת Python dependencies..."
python3 -m pip install -r requirements.txt --quiet
if [ $? -eq 0 ]; then
    echo "✓ Python dependencies מותקנות"
else
    echo "✗ שגיאה בהתקנת Python dependencies"
    exit 1
fi

# Step 2: Install Node dependencies
echo ""
echo "2️⃣  התקנת Node dependencies..."
npm install --silent
if [ $? -eq 0 ]; then
    echo "✓ Node dependencies מותקנות"
else
    echo "✗ שגיאה בהתקנת Node dependencies"
    exit 1
fi

# Step 3: Build frontend
echo ""
echo "3️⃣  בנייה של Frontend..."
npm run build --silent
if [ $? -eq 0 ]; then
    echo "✓ Frontend בנוי בהצלחה"
else
    echo "✗ שגיאה בבנייה של Frontend"
    exit 1
fi

echo ""
echo "=== ✅ Setup הושלם בהצלחה! ==="
echo ""
echo "כדי להפעיל את האתר, הרץ:"
echo "  python3 main.py"
echo ""
echo "או:"
echo "  npm run dev"
echo ""
echo "גש ל: http://localhost:5000"
