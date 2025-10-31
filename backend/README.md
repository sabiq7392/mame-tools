# Mame Tools Backend

Backend API server built with Fastify.js and TypeScript.

## Features

- ⚡ Fastify.js - Fast and low overhead web framework
- 📘 TypeScript - Type-safe development
- 🌐 CORS enabled
- 🔥 Hot reload with tsx

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Run development server:

```bash
npm run dev
# or
yarn dev
```

3. Server will run on `http://localhost:3001`

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## API Endpoints

- `GET /` - API info
- `GET /health` - Health check

## Environment Variables

- `PORT` - Server port (default: 3001)
- `HOST` - Server host (default: 0.0.0.0)
