// Membuat error dengan status HTTP tertentu untuk diteruskan lewat next()
function errorHttp(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// Catch-all untuk endpoint yang tidak ditemukan
function notFoundHandler(req, res) {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint tidak ditemukan',
    data: null,
  });
}

// Error handler global (harus dipasang paling bawah)
function errorHandler(err, req, res, next) {
  // JSON pada request body tidak valid
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      status: 'error',
      message: 'Format JSON tidak valid',
      data: null,
    });
  }

  const status = err.status || 500;

  if (status === 500) {
    console.error(err.stack);
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      data: null,
    });
  }

  res.status(status).json({
    status: 'error',
    message: err.message,
    data: null,
  });
}

module.exports = { errorHttp, notFoundHandler, errorHandler };