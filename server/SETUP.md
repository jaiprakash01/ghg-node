# Backend Setup Complete! 🎉

Your backend API server is ready to use. Here's what has been set up:

## ✅ What's Included

1. **Express Server** (`server.js`)
   - CORS enabled
   - JSON body parsing
   - Health check endpoint

2. **Database** (SQLite)
   - Auto-initialized on first run
   - Tables: users, assessments, activities, contacts

3. **API Routes**
   - `/api/auth` - User registration and login
   - `/api/assessments` - Assessment submission and retrieval
   - `/api/admin` - Admin dashboard endpoints
   - `/api/contact` - Contact form submission

4. **Security**
   - Password hashing with bcrypt
   - JWT token authentication
   - Input validation

## 🚀 Quick Start

1. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```

2. **The server will:**
   - Start on `http://localhost:5001`
   - Create database automatically
   - Be ready to accept API requests

## 📝 Next Steps

1. **Test the API:**
   ```bash
   curl http://localhost:5001/api/health
   ```
   Should return: `{"status":"ok","message":"ESG Assessment API is running"}`

2. **Start the frontend:**
   ```bash
   # In a new terminal, from project root
   npm run dev
   ```

3. **Connect frontend to backend:**
   - The Admin component already expects API at `http://localhost:5001`
   - Update other components to use the API endpoints as needed

## 🔧 API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Assessments  
- `POST /api/assessments/submit` - Submit assessment
- `GET /api/assessments/user/:userId` - Get user assessments

### Admin
- `GET /api/admin/users` - All users
- `GET /api/admin/assessments` - All assessments
- `GET /api/admin/assessment-details/:id` - Assessment details
- `GET /api/admin/activities` - All activities
- `GET /api/admin/user-activities/:userId` - User activities
- `GET /api/admin/contacts` - All contacts
- `PUT /api/admin/contacts/:id/status` - Update contact status

### Contact
- `POST /api/contact/submit` - Submit contact form

## 📊 Database

The SQLite database (`database.sqlite`) will be created automatically in the `server/` directory when you first start the server.

## 🔐 Admin Access

Admin credentials are handled in the frontend Admin component:
- Email: `aditimehra0298@gmail.com` or `admin@sustainablefuturespcs.org`
- Password: `admin123`

## ⚠️ Important Notes

1. **Change JWT_SECRET** in production (currently in `.env`)
2. **Database file** (`database.sqlite`) is created automatically
3. **CORS** is enabled for all origins (restrict in production)
4. **Port 5001** - Make sure it's not in use by another service

## 🐛 Troubleshooting

- **Port already in use:** Change PORT in `.env` file
- **Database errors:** Delete `database.sqlite` and restart server
- **Module not found:** Run `npm install` in `server/` directory

## 📚 Documentation

See `server/README.md` for detailed API documentation.

