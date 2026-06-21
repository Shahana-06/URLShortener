const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const authRoutes      = require('./modules/auth/auth.routes');
const urlRoutes       = require('./modules/url/url.routes');
const analyticsRoutes = require('./modules/analytics/analytics.routes');
const errorHandler    = require('./middleware/errorHandler');
const AppError        = require('./utils/AppError');

const app = express();

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/auth',      authRoutes);
app.use('/',          urlRoutes);
app.use('/analytics', analyticsRoutes);

// 404
app.use((req, res, next) => {
  next(new AppError(`Route ${req.method} ${req.path} not found`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;