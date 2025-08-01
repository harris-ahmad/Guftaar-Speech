# Guftaar

![Guftaar Logo](https://img.shields.io/badge/Guftaar-Speech%20Therapy-blue)

Guftaar is a comprehensive speech therapy support web application designed to help people who stutter (PWS) improve their speech through various tools and professional guidance. The platform combines self-guided practice tools with professional coaching to provide a structured speech therapy solution.

## Features

### Multi-User System
- **Clients** - People seeking speech therapy support
- **Coaches** - Speech therapy professionals who provide guidance  
- **Admins** - System administrators who manage the platform

### Speech Practice Tools
- **Daily Activities & Exercises** - Breathing exercises, syllable counting, voice progression
- **Speech Techniques** - Practice specific sounds with audio examples
- **Quick Practice** - Reading exercises with highlighted text progression
- **Progress Tracking** - Monitor improvement over time with streak counters

### Professional Support
- **Coach Matching** - Connect with qualified speech therapists
- **One-on-One Meetings** - Schedule and conduct coaching sessions
- **Coach Feedback** - Receive personalized feedback and notes
- **Rating System** - Rate and review coaches

### Course Marketplace
Access specialized courses like:
- Overcoming Public Speaking Anxiety
- Stammer and Social Settings
- Find Your Voice
- Non-Verbal Communication
- Language and Literacy

## Architecture

This is a full-stack MERN application:
- **Frontend**: React.js with Bootstrap styling
- **Backend**: Express.js REST API
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.x recommended)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/harris-ahmad/Guftaar-Speech.git
cd Guftaar-Speech
```

### 2. Environment Setup

Create a `.env` file in the `server` directory:

```bash
cd server
touch .env
```

Add the following environment variables to `server/.env`:

```env
# MongoDB Connection String
URI=mongodb://localhost:27017/guftaar
# OR for MongoDB Atlas:
# URI=mongodb+srv://username:password@cluster.mongodb.net/guftaar

# JWT Secret (replace with a secure random string)
JWT_SECRET=harris123

# Server Port (optional, defaults to 3001)
PORT=3001

# Node Environment
NODE_ENV=development
```

### 3. Install Dependencies

From the root directory, run:

```bash
npm run install
```

This will install dependencies for both client and server automatically.

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb/brew/mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```
3. Use the local connection string in your `.env` file:
   ```
   URI=mongodb://localhost:27017/guftaar
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and update the `.env` file:
   ```
   URI=mongodb+srv://username:password@cluster.mongodb.net/guftaar
   ```

### 5. Start the Application

#### Development Mode

Start both client and server in development mode:

```bash
# Terminal 1 - Start the server
cd server
npm run dev

# Terminal 2 - Start the client
cd client
npm start
```

#### Production Mode

Build and start the application:

```bash
# Build the client
npm run build

# Start the server (serves both API and client)
npm start
```

### 6. Access the Application

- **Frontend**: http://localhost:3000 (development) or http://localhost:3001 (production)
- **Backend API**: http://localhost:3001

## Project Structure

```
guftaar/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── audios/        # Audio files for practice
│   │   ├── images/        # Image assets
│   │   └── fonts/         # Custom fonts
│   └── package.json
├── server/                # Express backend
│   ├── bin/
│   │   └── www           # Server entry point
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   │   ├── admin/        # Admin routes
│   │   ├── client/       # Client routes
│   │   └── coach/        # Coach routes
│   ├── app.js           # Express app configuration
│   └── package.json
└── package.json         # Root package.json with scripts
```

## Available Scripts

### Root Level Scripts
```bash
npm run install    # Install all dependencies
npm run build      # Build client for production
npm start          # Start production server
```

### Server Scripts
```bash
npm start          # Start server with node
npm run dev        # Start server with nodemon (auto-restart)
```

### Client Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## API Endpoints

### Client Routes (`/client`)
- `POST /client/register` - Register new client
- `POST /client/login` - Client login
- `GET /client/profile` - Get client profile
- `PUT /client/update` - Update client profile

### Coach Routes (`/coach`)
- `POST /coach/register` - Register new coach
- `POST /coach/login` - Coach login
- `GET /coach/profile` - Get coach profile
- `POST /coach/feedback` - Submit feedback

### Admin Routes (`/admin`)
- `POST /admin/login` - Admin login
- `GET /admin/users` - Get all users
- `POST /admin/add-coach` - Add new coach