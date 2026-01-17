# הוראות להפעלה Locally

## דרישות מוקדמות
- Node.js 16+ 
- Python 3.8+
- Git

## שלבים להפעלה

### 0. בדיקה של Dependencies מותקנים

#### על Mac:
```bash
# בדוק Node.js
node --version

# בדוק Python3 (אתה כנראה צריך python3 לא python)
python3 --version

# בדוק npm
npm --version
```

אם `python3` לא מותקן, התקן דרך Homebrew:
```bash
# התקן Homebrew אם עדיין אין לך
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# התקן Python
brew install python@3.11

# וודא שפעל
python3 --version
```

### 1. Clone את הפרויקט

**אל תעתיק הערות (#) - הוספנו אותם רק להסבר**
```bash
git clone https://github.com/RotemD2b2t/Game.git
cd Game
```

### 2. התקן את Python Dependencies
```bash
# על Mac: use python3 ו-pip3
python3 -m pip install -r requirements.txt
```

או אם `pip3` תקין:
```bash
pip3 install -r requirements.txt
```

### 3. התקן את Node.js Dependencies
```bash
npm install
```

### 4. בנה את ה-Frontend (React/TypeScript)
```bash
npm run build
```

### 5. הפעל את שרת ה-Development

יש שתי אפשרויות:

#### אפשרות א: הפעלה ישירה
```bash
npm run dev
```

#### אפשרות ב: הפעלה דרך Python/Flask
```bash
python3 main.py
```

### 6. גש לאתר
פתח את הדפדפן שלך וגש ל:
```
http://localhost:5001
```

## פורטים
- **5000**: Flask Server (Python Backend + Server-Side Rendering)
- **5173**: Vite Dev Server (React Frontend - אם בנית עם npm run dev)

## עדכונים לאחרונה

### מאפיינים חדשים שהתווספו:

1. **AdSense Integration**
   - Automatic detection for dev/production environments
   - Global ad layout on all pages (desktop sidebars + mobile footer)
   - Premium users don't see ads

2. **Daily Free Game Limit**
   - localStorage-based tracking
   - 1 free game per day for non-premium users
   - Interstitial ad modal before 2nd game

3. **Admin Dashboard** (`/admin`)
   - Strict "RotemD" username security check
   - Search users by username
   - Toggle premium status
   - Reset passwords

4. **Ad Placeholder for Testing**
   - Admin users with premium see gray placeholders instead of real ads
   - Useful for testing ad layout without AdSense firing

## טוען הפרוק של תנאים

ורידים בעדכון האחרון:
- `/workspaces/Game/client/index.html` - AdSense meta tag added
- `/workspaces/Game/client/src/App.tsx` - Refactored to use AppLayout
- `/workspaces/Game/client/src/components/AppLayout.tsx` - Global ad layout wrapper
- `/workspaces/Game/client/src/components/AdInterstitial.tsx` - Ad modal component
- `/workspaces/Game/client/src/hooks/use-daily-game.ts` - Daily limit logic hook
- `/workspaces/Game/client/src/hooks/use-game-start-flow.ts` - Game start flow hook
- `/workspaces/Game/client/src/lib/adConfig.ts` - AdSense configuration
- `/workspaces/Game/main.py` - Added daily game API endpoints + datetime import
- `/workspaces/Game/static/choosegame.js` - Daily game limit + interstitial ad logic
- `/workspaces/Game/templates/src/choosegame.html` - Ad placeholder script added

## בעיות נפוצות

### "python: command not found"
**פתרון**: השתמש ב-`python3` במקום `python`

### "pip: command not found"
**פתרון**: השתמש ב-`pip3` או `python3 -m pip`

### "npm run dev לא עובד"
**פתרון**: נסה `npm run build` תחילה

### AdSense Ads לא מופיעות locally
זה נורמלי! AdSense דורש:
- HTTPS (לא http://localhost)
- Domain חוקי (לא localhost)
- AdSense Account מאושר

בפרודקשן (replit), בדוק את ה-AdSense console

### Database לא קיים
- הוא נוצר אוטומטית כשפותחים את main.py
- יוצר user "RotemD" עם סיסמה "admin123"
- קובץ שנשמר: `users.db`

### Port 5000 כבר בשימוש
```bash
# בדוק מה תופס את ה-port
lsof -i :5000

# הרוג את התהליך (החליף 12345 עם PID מה-lsof)
kill -9 12345

# או שנה את ה-port ב-main.py
# שנה את השורה: app.run(host='0.0.0.0', port=5000, debug=True)
# ל: app.run(host='0.0.0.0', port=5001, debug=True)
```

### טעינה מחדש של פרויקט (אם משהו שבור)

```bash
# מחק node_modules ו-reinstall
rm -rf node_modules
npm install
npm run build

# מחק Python cache
rm -rf __pycache__
python3 -m pip install -r requirements.txt --upgrade

# הפעל שוב
python3 main.py
```

## בדיקת התכונות

### בדיקת Admin Dashboard
1. התחבר כ-RotemD (סיסמה: admin123)
2. גש ל`http://localhost:5001/admin`
3. אמור לראות טבלה עם כל המשתמשים

### בדיקת Ad Placeholders (כשאתה admin עם premium)
1. בadmin dashboard - לחץ "Toggle Premium" עבור RotemD
2. התחבר מחדש
3. צפה בעמודים - אמור לראות מלבנים אפורים במקום המודעות

### בדיקת Daily Game Limit
1. התחבר כ-user לא-premium (או create משתמש חדש)
2. גש ל`http://localhost:5001` - לחץ "שחק עכשיו"
3. המשחק הראשון אמור לעלות ללא ads
4. חזור ללוח הבית (לחץ 🏠)
5. לחץ "שחק עכשיו" שוב - אמור לראות modal עם פרסומת + countdown

## צעדים הבאים

1. עדכן את slot IDs של AdSense ב-`client/src/lib/adConfig.ts`
   - החלף את ה-slot values עם ה-slot IDs שלך מ-Google AdSense
2. טסט על ה-published דומיינים:
   - Testing: cfea6322-5da0-4046-9bdf-84eb085104be-00-glbm0cltnd21.pike.replit.dev
   - Production: 2a94b1c6-6e1e-4a7b-a334-078b58df0c1e-00-3v2a3s4g0yco4.pike.replit.dev
3. בדוק AdSense dashboard לדוחות הכנסה
