# Backend Structure

Scalable backend structure for Fastify.js with TypeScript.

## Folder Structure

```
src/
├── config/           # Configuration files
│   └── env.ts       # Environment variables configuration
├── controllers/      # Request handlers (business logic)
│   ├── index.controller.ts
│   └── health.controller.ts
├── middlewares/      # Middleware functions
│   ├── errorHandler.middleware.ts
│   └── notFound.middleware.ts
├── plugins/          # Fastify plugins
│   └── cors.plugin.ts
├── routes/           # Route definitions
│   ├── index.ts
│   └── health.routes.ts
├── services/         # Business logic services (for future use)
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Utility functions
│   └── logger.ts
└── index.ts          # Application entry point
```

## Architecture Pattern

### Controllers
- Handle HTTP requests and responses
- Call services for business logic
- Return formatted API responses

### Routes
- Define API endpoints
- Register controllers
- Handle route-specific middleware

### Services
- Business logic layer
- Database operations (when MySQL is added)
- Data processing and validation

### Middlewares
- Error handling
- 404 handling
- Authentication (future)
- Validation (future)

### Plugins
- CORS configuration
- Database connections (future)
- Other Fastify plugins

## Adding New Features

1. **New Route:**
   - Create route file in `routes/`
   - Create controller in `controllers/`
   - Register in `routes/index.ts`

2. **New Service:**
   - Create service file in `services/`
   - Use in controllers

3. **New Middleware:**
   - Create middleware file in `middlewares/`
   - Register in `index.ts` or route files
