require('dotenv').config();

const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const podcastRoutes = require('./routes/podcastRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware global ----------
app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// ---------- Route dasar ----------
app.get('/', (req, res) => {
  res.json({
    nama: 'Adit Yudha Pratama',
    npm: '2428240163',
    topik: 37,
    resource: '/podcasts',
    endpoints: {
      getAll: 'GET /podcasts',
      getById: 'GET /podcasts/:id',
      create: 'POST /podcasts',
      update: 'PUT /podcasts/:id',
      delete: 'DELETE /podcasts/:id',
      filter: 'GET /podcasts?kategori=pendidikan',
    },
  });
});

// ---------- Route per modul ----------
app.use('/podcasts', podcastRoutes);

// ---------- Handler 404 dan error handler (paling bawah) ----------
app.use(notFoundHandler);
app.use(errorHandler);

// Menjalankan server hanya saat bukan production
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;