# ESG Assessment Platform

Full-stack ESG Assessment Platform with React frontend and Node.js backend.

## Project Structure

```
GHG/
├── src/              # React frontend
├── server/           # Node.js backend API
├── Public/           # Static assets
└── package.json      # Frontend dependencies
```

## Quick Start

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
# Edit .env and set your JWT_SECRET
```

4. Start backend server:
```bash
npm start
```

Backend runs on `http://localhost:5001`

### Frontend Setup

1. Install dependencies (from root):
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173` (or your Vite port)

## Running Both Servers

### Option 1: Separate Terminals
- Terminal 1: `cd server && npm start`
- Terminal 2: `npm run dev`

### Option 2: Use a process manager
Install `concurrently`:
```bash
npm install -g concurrently
```

Then run:
```bash
concurrently "cd server && npm start" "npm run dev"
```

## API Endpoints

See `server/README.md` for complete API documentation.

## Database

SQLite database is automatically created on first backend startup at `server/database.sqlite`.

## Environment Variables

Backend requires `.env` file in `server/` directory:
```
PORT=5001
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

## Admin Access

Admin panel is accessible at `/admin` route. Default credentials:
- Email: `aditimehra0298@gmail.com` or `admin@sustainablefuturespcs.org`
- Password: `admin123`

## Production Build

### Frontend:
```bash
npm run build
npm run preview
```

### Backend:
```bash
cd server
npm start
```

Make sure to set `NODE_ENV=production` in production.

