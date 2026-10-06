const { errorHttp } = require('./errorHandler');

// Melindungi endpoint yang mengubah data (POST, PUT, DELETE).
// Client wajib mengirim header: x-api-key
function cekApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  // Jika API_KEY belum diatur di .env, semua request ditolak
  // (supaya endpoint tidak terbuka tanpa sengaja).
  if (!process.env.API_KEY || apiKey !== process.env.API_KEY) {
    return next(errorHttp(401, 'API key tidak valid'));
  }

  next();
}

module.exports = cekApiKey;