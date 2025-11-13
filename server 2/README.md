# ESG Assessment Platform - Backend API

Backend server for the ESG Assessment Platform built with Node.js, Express, and SQLite.

## Features

- User authentication (register/login)
- Assessment submission and storage
- Admin dashboard API endpoints
- Contact form handling
- Activity logging
- SQLite database

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `server` directory:

```env
PORT=5001
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

### 3. Start the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:5001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Assessments
- `POST /api/assessments/submit` - Submit assessment
- `GET /api/assessments/user/:userId` - Get user's assessments

### Admin (for admin panel)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/assessments` - Get all assessments
- `GET /api/admin/assessment-details/:id` - Get assessment details
- `GET /api/admin/activities` - Get all activities
- `GET /api/admin/user-activities/:userId` - Get user activities
- `GET /api/admin/contacts` - Get all contacts
- `PUT /api/admin/contacts/:id/status` - Update contact status

### Contact
- `POST /api/contact/submit` - Submit contact form

### Health Check
- `GET /api/health` - Check API status

## Database Schema

The database is automatically initialized on first run. It includes:

- **users** - User accounts
- **assessments** - Assessment results
- **activities** - User activity logs
- **contacts** - Contact form submissions

## Development

The database file (`database.sqlite`) will be created automatically in the `server` directory on first run.

## Notes

- Default admin credentials are handled in the frontend Admin component
- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt
- All timestamps are stored in UTC

