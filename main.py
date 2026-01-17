from flask import Flask, render_template, request, jsonify, session, redirect, url_for, abort
from flask_mail import Mail, Message
import sqlite3
import os
import secrets
import uuid
from datetime import timedelta, datetime

# הגדרת האפליקציה
app = Flask(__name__, template_folder='templates/src/')
app.secret_key = 'super_secret_key_for_session_management'
app.permanent_session_lifetime = timedelta(days=36500)

# --- הגדרות אימייל (SMTP) ---
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'noreplyapp289@gmail.com'
app.config['MAIL_PASSWORD'] = 'ozhcibfpojlgnzvl'

mail = Mail(app)

DB_NAME = "users.db"
ADMIN_USER = "RotemD"

def init_db():
    """ יצירת טבלת המשתמשים ועדכון סכמה במידת הצורך """
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # יצירת הטבלה הבסיסית
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')

    # בדיקה והוספה של עמודת is_premium אם אינה קיימת
    try:
        cursor.execute("SELECT is_premium FROM users LIMIT 1")
    except sqlite3.OperationalError:
        cursor.execute("ALTER TABLE users ADD COLUMN is_premium INTEGER DEFAULT 0")
        print("Column 'is_premium' added to users table.")

    # יצירת טבלת מעקב משחקים יומיים
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS daily_game_plays (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            device_id TEXT,
            played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            had_ad INTEGER DEFAULT 1
        )
    ''')

    # הבטחת קיום המשתמש RotemD
    cursor.execute("SELECT id FROM users WHERE username = ?", (ADMIN_USER,))
    if not cursor.fetchone():
        # סיסמה דיפולטיבית - מומלץ לשנות מיד
        cursor.execute("INSERT INTO users (username, password, is_premium) VALUES (?, ?, 1)", (ADMIN_USER, 'admin123'))
        print(f"Admin user '{ADMIN_USER}' created.")
    else:
        # וידוא ש-RotemD הוא תמיד פרימיום
        cursor.execute("UPDATE users SET is_premium = 1 WHERE username = ?", (ADMIN_USER,))

    conn.commit()
    conn.close()

init_db()

# --- פונקציות עזר למסד נתונים ---
def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

# --- ניהול מצב משחק בזיכרון ---
active_game_states = {}
lobby_status = {}

@app.route('/')
def home():
    user = session.get('username')
    is_premium = False
    if user:
        conn = get_db_connection()
        db_user = conn.execute("SELECT is_premium FROM users WHERE username = ?", (user,)).fetchone()
        conn.close()
        if db_user and db_user['is_premium']:
            is_premium = True

    return render_template('choosegame.html', user=user, is_premium=is_premium)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')

        conn = get_db_connection()
        user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
        conn.close()

        if user and user['password'] == password:
            session['username'] = username
            session.permanent = True
            session['is_premium'] = bool(user['is_premium']) # שמירה בסשן לגישה מהירה
            return jsonify({'success': True})
        return jsonify({'success': False, 'message': 'שם משתמש או סיסמה שגויים'})
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')

        # חסימת ניסיון ליצור משתמש עם שם האדמין (למרות שה-DB יחסום בגלל UNIQUE, זה הגנה נוספת)
        if username.lower() == ADMIN_USER.lower() and username != ADMIN_USER:
             return jsonify({'success': False, 'message': 'שם משתמש זה שמור'})

        try:
            conn = get_db_connection()
            conn.execute("INSERT INTO users (username, password, is_premium) VALUES (?, ?, 0)", (username, password))
            conn.commit()
            conn.close()
            session['username'] = username
            session.permanent = True
            session['is_premium'] = False
            return jsonify({'success': True})
        except sqlite3.IntegrityError:
            return jsonify({'success': False, 'message': 'שם המשתמש כבר קיים'})
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)})
    return render_template('register.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('is_premium', None)
    return redirect(url_for('login'))

# --- מסלולי ADMIN (מאובטחים) ---

@app.route('/admin')
def admin_dashboard():
    # בדיקת אבטחה קשוחה
    current_user = session.get('username')
    if current_user != ADMIN_USER:
        abort(403) # Forbidden
    return render_template('admin.html', admin_user=current_user)

@app.route('/api/admin/users', methods=['GET'])
def admin_get_users():
    if session.get('username') != ADMIN_USER:
        return jsonify({'error': 'Unauthorized'}), 403

    search = request.args.get('search', '')
    conn = get_db_connection()
    if search:
        users = conn.execute("SELECT id, username, is_premium FROM users WHERE username LIKE ?", ('%' + search + '%',)).fetchall()
    else:
        users = conn.execute("SELECT id, username, is_premium FROM users").fetchall()
    conn.close()

    return jsonify([dict(u) for u in users])

@app.route('/api/admin/toggle_premium', methods=['POST'])
def admin_toggle_premium():
    if session.get('username') != ADMIN_USER:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.json
    user_id = data.get('user_id')
    new_status = data.get('status') # True/False (1/0)

    conn = get_db_connection()
    # הגנה: אי אפשר להסיר פרימיום מהאדמין עצמו
    target_user = conn.execute("SELECT username FROM users WHERE id = ?", (user_id,)).fetchone()
    if target_user and target_user['username'] == ADMIN_USER:
        conn.close()
        return jsonify({'success': False, 'message': 'Cannot modify Admin status'})

    conn.execute("UPDATE users SET is_premium = ? WHERE id = ?", (1 if new_status else 0, user_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/admin/reset_password', methods=['POST'])
def admin_reset_password():
    if session.get('username') != ADMIN_USER:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.json
    user_id = data.get('user_id')
    new_password = data.get('new_password')

    conn = get_db_connection()
    conn.execute("UPDATE users SET password = ? WHERE id = ?", (new_password, user_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# --- Daily Game Limit API Endpoints ---

@app.route('/api/daily-game/check', methods=['GET'])
def check_daily_game():
    """
    Check if user can play a free game today without watching an ad.
    Returns: { "canPlay": true/false, "requiresAd": true/false, "remaining": 0/1 }
    """
    if 'username' not in session:
        return jsonify({'error': 'Not logged in'}), 401
    
    user = session.get('username')
    
    conn = get_db_connection()
    db_user = conn.execute("SELECT is_premium FROM users WHERE username = ?", (user,)).fetchone()
    conn.close()
    
    if not db_user:
        return jsonify({'error': 'User not found'}), 404
    
    # Premium users can play unlimited games without ads
    if db_user['is_premium']:
        return jsonify({
            'canPlay': True,
            'requiresAd': False,
            'remaining': 999,
            'isPremium': True
        })
    
    # Non-premium users: logic is handled client-side via localStorage
    # This endpoint is mainly for verification
    return jsonify({
        'canPlay': True,
        'requiresAd': False,  # Client will manage this
        'remaining': 1,
        'isPremium': False,
        'message': 'Daily limit is tracked client-side via localStorage'
    })

@app.route('/api/daily-game/record', methods=['POST'])
def record_daily_game_legacy():
    """
    Record that user played a game today.
    Client calls this after watching ad or playing a free game.
    """
    if 'username' not in session:
        return jsonify({'error': 'Not logged in'}), 401
    
    # This is mostly for logging/analytics on the server side
    # The actual logic is client-side via localStorage
    
    user = session.get('username')
    # You could optionally log this to a games table if you want analytics
    
    return jsonify({'success': True, 'message': 'Game play recorded'})

# --- מסלולי משחק ---

@app.route('/imposter_game')
def imposter_game():
    user = session.get('username')
    is_premium = False
    if user:
        conn = get_db_connection()
        db_user = conn.execute("SELECT is_premium FROM users WHERE username = ?", (user,)).fetchone()
        conn.close()
        if db_user:
            is_premium = bool(db_user['is_premium'])

    return render_template('imposter_game.html', user=user, is_premium=is_premium)

@app.route('/app-game')
def app_game():
    if 'username' not in session:
        session['username'] = f"Guest_{secrets.token_hex(4)}"
        session.permanent = True
    return render_template('app_game.html', user=session.get('username'))

# --- לוגיקת משחק (API) ---

@app.route('/send_roles', methods=['POST'])
def send_roles():
    data = request.json
    players = data.get('players', [])
    game_type = data.get('gameType')

    try:
        with mail.connect() as conn:
            for p in players:
                if not p.get('email'):
                    continue

                content = p.get('wordData', '')
                role = p.get('role')
                name = p.get('name')

                role_header = ""
                if game_type not in ['wordNword', 'categoryNcategory']:
                    role_text = "אימפוסטר" if role == 'imposter' else "אזרח תמים"
                    role_header = f'<h2 style="color: #333;">התפקיד שלך: {role_text}</h2>'

                msg = Message(subject="Imposter Game - המידע שלך למשחק",
                              sender=app.config['MAIL_USERNAME'],
                              recipients=[p['email']])
                msg.html = f"""<div dir="rtl" style="text-align:center;"><h1>שלום {name}</h1>{role_header}<br><h3>{content}</h3></div>"""
                conn.send(msg)
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/api/send_game_data', methods=['POST'])
def send_game_data():
    if 'username' not in session:
        return jsonify({'success': False, 'message': 'לא מחובר'}), 401
    data = request.json
    players_data = data.get('playersData', [])
    host_user = session['username']
    if host_user not in lobby_status:
        lobby_status[host_user] = {}
    for player in players_data:
        target_user = player.get('username')
        content = player.get('content')
        msg_type = player.get('type', 'text')
        if msg_type == 'invite' and target_user in active_game_states:
             existing = active_game_states[target_user]
             if existing.get('sender') != host_user:
                  return jsonify({'success': False, 'message': f'{target_user} עסוק'})
        active_game_states[target_user] = {'content': content, 'type': msg_type, 'sender': host_user, 'id': secrets.token_hex(4)}
    return jsonify({'success': True})

@app.route('/api/get_my_data')
def get_my_data():
    if 'username' not in session:
        return jsonify({'error': 'Not logged in'}), 401
    user = session['username']
    data = active_game_states.get(user)
    return jsonify({'hasData': True, 'data': data}) if data else jsonify({'hasData': False})

@app.route('/api/update_player_status', methods=['POST'])
def update_player_status():
    if 'username' not in session: return jsonify({'success': False}), 401
    user = session['username']
    data = request.json
    status = data.get('status')
    host_name = data.get('host')
    if host_name:
        if host_name not in lobby_status: lobby_status[host_name] = {}
        if status == 'joined': lobby_status[host_name][user] = 'joined'
        elif status == 'left':
            lobby_status[host_name].pop(user, None)
            if user in active_game_states: del active_game_states[user]
    return jsonify({'success': True})

@app.route('/api/check_lobby', methods=['GET'])
def check_lobby():
    if 'username' not in session: return jsonify({'success': False}), 401
    host_user = session['username']
    return jsonify({'success': True, 'approved_players': list(lobby_status.get(host_user, {}).keys())})

@app.route('/api/clear_game_data', methods=['POST'])
def clear_game_data():
    if 'username' not in session: return jsonify({'success': False}), 401
    host_user = session['username']
    users_to_clear = [u for u, d in active_game_states.items() if d.get('sender') == host_user]
    for u in users_to_clear: active_game_states.pop(u, None)
    if host_user in lobby_status: lobby_status[host_user] = {}
    return jsonify({'success': True})

# --- API endpoints לניהול משחקים יומיים ---

def get_today_date():
    """קבל את תאריך היום בתנסק 'YYYY-MM-DD'"""
    return datetime.now().strftime('%Y-%m-%d')

def check_if_played_without_ad(username=None, device_id=None):
    """
    בדוק אם משתמש או מכשיר שיחקו כבר היום בלי פרסומת
    הגנה כפולה: אם אחד מהם שיחק בלי פרסומת - צריך פרסומת
    """
    today = get_today_date()
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # בדוק אם המשתמש שיחק בלי פרסומת היום
    user_played_free = False
    if username:
        cursor.execute(
            "SELECT COUNT(*) as count FROM daily_game_plays WHERE username = ? AND date(played_at) = ? AND had_ad = 0",
            (username, today)
        )
        user_played_free = cursor.fetchone()['count'] > 0
    
    # בדוק אם המכשיר שיחק בלי פרסומת היום
    device_played_free = False
    if device_id:
        cursor.execute(
            "SELECT COUNT(*) as count FROM daily_game_plays WHERE device_id = ? AND date(played_at) = ? AND had_ad = 0",
            (device_id, today)
        )
        device_played_free = cursor.fetchone()['count'] > 0
    
    conn.close()
    
    # אם אחד מהם שיחק בלי פרסומת - צריך פרסומת
    return user_played_free or device_played_free

@app.route('/api/check-game-ad', methods=['POST'])
def check_game_ad():
    """
    בדוק אם השחקן צריך להציג פרסומת לפני המשחק
    
    POST data:
    - device_id: UUID של המכשיר
    - username: שם המשתמש (optional - אם אורח, None)
    
    Response:
    - needs_ad: האם צריך להציג פרסומת
    - is_premium: האם המשתמש פרימיום (אז אף פעם אין פרסומת)
    """
    data = request.json
    device_id = data.get('device_id')
    username = session.get('username') if 'username' in session else None
    
    # אם פרימיום - אין פרסומת
    is_premium = False
    if username:
        conn = get_db_connection()
        user = conn.execute("SELECT is_premium FROM users WHERE username = ?", (username,)).fetchone()
        conn.close()
        is_premium = bool(user['is_premium']) if user else False
    
    if is_premium:
        return jsonify({'needs_ad': False, 'is_premium': True})
    
    # בדוק אם כבר שיחק היום בלי פרסומת
    needs_ad = check_if_played_without_ad(username, device_id)
    
    return jsonify({
        'needs_ad': needs_ad,
        'is_premium': False,
        'device_id': device_id,
        'username': username
    })

@app.route('/api/record-game-play', methods=['POST'])
def record_game_play():
    """
    רשום משחק שהתחיל עכשיו
    
    POST data:
    - device_id: UUID של המכשיר
    - had_ad: האם הוצגה פרסומת (0 = לא, 1 = כן)
    """
    data = request.json
    device_id = data.get('device_id')
    had_ad = data.get('had_ad', 1)  # דיפולט = היו פרסומות
    username = session.get('username') if 'username' in session else None
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO daily_game_plays (username, device_id, had_ad) VALUES (?, ?, ?)",
        (username, device_id, had_ad)
    )
    conn.commit()
    conn.close()
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)