# Nepali Urban Dictionary

A modern web application for exploring Nepali slang and urban words. Built with React + Vite on the frontend and Express + SQLite on the backend.

## Features

- **Google-like Homepage** - Beautiful landing page with animated floating Nepali words
- **Dynamic Search** - Search through 100+ Nepali slang words in real-time
- **Submit Words** - Users can submit new words (pending admin approval)
- **Browse Dictionary** - View all approved words with meanings and examples
- **Green Theme** - Consistent branding throughout the application
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

### Frontend
- React 18
- React Router v6
- Vite (build tool)
- Axios (HTTP client)
- CSS3 with animations

### Backend
- Node.js + Express
- SQLite database
- Sequelize ORM
- RESTful API

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install
   cd ..
   ```

2. **Seed the database** (run once)
   ```bash
   node backend/scripts/seed.js
   ```

### Development

**Option 1: Run both servers with ONE command (recommended)**

```bash
npm run dev
```

This starts both backend (port 3000) and frontend (port 5173) together!
Then open: **http://localhost:5173**

**Option 2: Run servers separately**

In terminal 1 (Backend):
```bash
npm start
# Backend runs on http://localhost:3000
```

In terminal 2 (Frontend):
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

### Building for Production

```bash
npm run build
```

This creates optimized production files in `frontend/dist/`

## Project Structure

```
nepali-dictionary/
├── backend/
│   ├── app.js              # Express server
│   ├── controllers/        # Route controllers
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts (seed.js)
│   ├── data/               # data.json (100 words)
│   └── database.sqlite     # SQLite database
├── frontend/
│   ├── src/
│   │   ├── components/     # React components (Header, Footer)
│   │   ├── pages/          # Page components (Home, Browse, Submit)
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── vite.config.js      # Vite configuration
│   └── package.json
├── package.json
└── README.md
```

## API Endpoints

- `GET /api/words` - Get all approved words
- `GET /api/words/:id` - Get a specific word
- `POST /api/words` - Submit a new word (status: pending)
- `PUT /api/words/:id` - Update a word
- `DELETE /api/words/:id` - Delete a word

## Features in Detail

### Homepage
- Animated floating Nepali words in the background
- Large search bar for quick word lookup
- Quick links to browse and submit

### Browse Page
- Grid layout of word cards
- Real-time search filtering
- Shows word name, meaning, example, and date added

### Submit Word Page
- Form with validation
- Submissions marked as "pending" for admin review
- Success/error messages
- Auto-redirect after submission

### Admin Approval System
- Words submitted by users have status: "pending"
- Only "approved" words appear in public listings
- Admins can update word status via API

## Database Schema

```sql
Words Table:
- wordID (INTEGER, PRIMARY KEY, AUTO INCREMENT)
- wordName (STRING, NOT NULL)
- wordMeaning (TEXT, NOT NULL)
- wordSentence (TEXT, NOT NULL)
- status (STRING, DEFAULT: "approved")
- dateCreated (DATE, DEFAULT: NOW)
```

## License

MIT

## Author

Pranish Khanal
