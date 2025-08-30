# Server Setup

Create a `.env` in `server/`:

```
MONGODB_URI=mongodb://localhost:27017/school_db
JWT_SECRET=supersecretjwt
PORT=5000
CORS_ORIGIN=http://localhost:5173
UPLOAD_DIR=uploads
SEED_ADMIN_USER=principal
SEED_ADMIN_PASS=password123
```

Then seed the admin and run dev:

```
npm run seed-admin
npm run dev
```

API:
- POST `/api/auth/login` { username, password } -> { token }
- POST `/api/results/upload` (Bearer token, form-data `file`: .xlsx)
- GET `/api/results/:rollNumber` -> result document


