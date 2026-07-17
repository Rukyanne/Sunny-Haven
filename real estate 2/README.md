# Real Estate Platform

This repository contains a production-ready backend for an existing frontend real estate website.

## Architecture

- `client/` - existing frontend HTML, CSS, JS, assets
- `server/` - Node.js + Express backend
- `server/models/` - Mongoose schemas
- `server/controllers/` - request handlers
- `server/routes/` - API routes
- `server/middleware/` - auth, errors, not-found
- `server/utils/` - upload, logger
- `server/database/` - MongoDB connection

## Getting Started

1. Copy `.env.example` to `.env`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5000`

## API Endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/refresh-token`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`
- `POST /api/v1/auth/verify-email`
- `POST /api/v1/auth/change-password`
- `GET /api/v1/users/me`
- `PUT /api/v1/users/me`
- `POST /api/v1/users/me/avatar`
- `POST /api/v1/properties`
- `GET /api/v1/properties/search`
- `GET /api/v1/properties/featured`
- `GET /api/v1/properties/latest`
- `GET /api/v1/properties/:id`
- `GET /api/v1/agents`
- `GET /api/v1/agents/:id`
- `POST /api/v1/contacts`
- `POST /api/v1/newsletter`
- `POST /api/v1/reviews`
- `POST /api/v1/appointments`
- `POST /api/v1/favorites/:propertyId`

## Notes

- Frontend files remain untouched under `client/`.
- File uploads are stored locally by default in `server/uploads/`.
- Cloudinary can be added later by replacing upload logic in `server/utils/uploads.js`.
