const podcastModel = require('../models/podcastModel');
const { errorHttp } = require('../middlewares/errorHandler');

// Memeriksa apakah nilai kosong (undefined, null, atau string kosong)
const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '');

// Validasi body untuk POST dan PUT.
// Mengembalikan pesan error jika tidak valid, atau null jika valid.
function validasiPodcast({ judul, host, kategori, jumlahEpisode }) {
  if (isEmpty(judul) || isEmpty(host) || isEmpty(kategori)) {
    return 'Field judul, host, dan kategori wajib diisi';
  }

  if (
    jumlahEpisode !== undefined &&
    (typeof jumlahEpisode !== 'number' || jumlahEpisode < 0)
  ) {
    return 'jumlahEpisode harus berupa angka yang valid';
  }

  return null;
}

// Menyusun data podcast dari body (field opsional hanya ikut jika dikirim)
function susunDataPodcast({ judul, host, kategori, jumlahEpisode, bahasa }) {
  const data = {
    judul: judul.trim(),
    host: host.trim(),
    kategori: kategori.trim(),
  };

  if (jumlahEpisode !== undefined) data.jumlahEpisode = jumlahEpisode;
  if (bahasa !== undefined) data.bahasa = bahasa;

  return data;
}

// GET /podcasts
// Menampilkan seluruh data podcast, bisa difilter dengan ?kategori=
exports.getAll = (req, res) => {
  const { kategori } = req.query;
  res.status(200).json(podcastModel.getAll(kategori));
};

// GET /podcasts/:id
// Menampilkan satu podcast berdasarkan ID
exports.getById = (req, res, next) => {
  const id = Number(req.params.id);
  const podcast = podcastModel.getById(id);

  if (!podcast) return next(errorHttp(404, 'Data podcast tidak ditemukan'));

  res.status(200).json(podcast);
};

// POST /podcasts
// Menambahkan data podcast baru
exports.create = (req, res, next) => {
  const body = req.body || {};

  const pesanError = validasiPodcast(body);
  if (pesanError) return next(errorHttp(400, pesanError));

  const podcastBaru = podcastModel.create(susunDataPodcast(body));

  res.status(201).json({
    status: 'success',
    message: 'Podcast berhasil ditambahkan',
    data: podcastBaru,
  });
};

// PUT /podcasts/:id
// Mengubah seluruh data podcast
exports.update = (req, res, next) => {
  const id = Number(req.params.id);
  const body = req.body || {};

  if (!podcastModel.getById(id)) {
    return next(errorHttp(404, 'Data podcast tidak ditemukan'));
  }

  const pesanError = validasiPodcast(body);
  if (pesanError) return next(errorHttp(400, pesanError));

  const podcastDiubah = podcastModel.update(id, susunDataPodcast(body));

  res.status(200).json({
    status: 'success',
    message: 'Podcast berhasil diperbarui',
    data: podcastDiubah,
  });
};

// DELETE /podcasts/:id
// Menghapus data podcast berdasarkan ID
exports.remove = (req, res, next) => {
  const id = Number(req.params.id);
  const podcastDihapus = podcastModel.remove(id);

  if (!podcastDihapus) {
    return next(errorHttp(404, 'Data podcast tidak ditemukan'));
  }

  res.status(200).json({
    status: 'success',
    message: 'Podcast berhasil dihapus',
    data: podcastDihapus,
  });
};