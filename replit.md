# Imposter Game

## Overview

A multiplayer social deduction party game (similar to "Imposter" or "Werewolf" style games) built with Flask backend serving HTML templates. The game supports multiple game modes where players receive words, hints, or categories, and imposters receive different information to create deception gameplay. The application supports user authentication, email notifications via Gmail SMTP, and multiple game delivery methods (regular display, email, or in-app).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Flask (Python) serves as the primary backend
- **Entry Point**: The Node.js server (`server/index.ts`) spawns the Python Flask process, acting as a process wrapper
- **Template Engine**: Jinja2 templates located in `templates/src/`
- **Session Management**: Flask sessions with 100-year lifetime for persistent login
- **User Storage**: JSON file-based storage (`users.json`) for user credentials

### Frontend Architecture
- **Primary UI**: Server-rendered HTML templates with vanilla JavaScript
- **Styling**: Custom CSS files in `static/` directory with gradient backgrounds and glassmorphism effects
- **Game Modes**:
  - Word & Hint: Imposters get hints, others get the word
  - Word & Word: Imposters get different word from same category
  - Category & Words: Imposters get word list, others get category name
  - Category & Category: Imposters get completely different category

### Unused React Infrastructure
- A React/Vite setup exists in `client/` with shadcn/ui components but is not currently used
- The React app has routing configured via `wouter` and state management via `@tanstack/react-query`
- Database schema defined with Drizzle ORM for PostgreSQL (not actively used)

### Game Delivery Methods
1. **Regular**: Direct display on screen
2. **Gmail**: Send game cards via email using Flask-Mail with Gmail SMTP
3. **App**: In-app delivery for logged-in users (stored in `active_game_states` dictionary)

### Data Flow
- Game state managed in-memory via Python dictionaries
- Word/clue databases stored in JavaScript files (`static/wordNhint.js`, `static/categoryNcategory.js`)
- Categories include: daily objects, people, fictional characters, animals, food, places, brands, and game-specific roles

## External Dependencies

### Email Service
- **Provider**: Gmail SMTP
- **Configuration**: Port 587 with TLS
- **Library**: Flask-Mail

### Database (Configured but not actively used)
- **ORM**: Drizzle ORM
- **Target**: PostgreSQL (via `DATABASE_URL` environment variable)
- **Schema**: Basic users table with id, username, password

### Frontend Libraries (React setup - unused)
- Radix UI component primitives
- Tailwind CSS with custom theme
- shadcn/ui component library
- React Query for data fetching

### Build Tools
- Vite for React bundling
- esbuild for server bundling
- TypeScript for type checking