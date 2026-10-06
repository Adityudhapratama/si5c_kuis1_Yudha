// Data podcast disimpan sementara di memory
let podcasts = [
  {
    id: 1,
    judul: 'Ngobrol Koding',
    host: 'Dimas Aditya',
    kategori: 'pendidikan',
    jumlahEpisode: 48,
    bahasa: 'Indonesia',
  },
  {
    id: 2,
    judul: 'Cerita Teknologi',
    host: 'Raka Pratama',
    kategori: 'teknologi',
    jumlahEpisode: 32,
    bahasa: 'Indonesia',
  },
  {
    id: 3,
    judul: 'Belajar Bareng',
    host: 'Sinta Maharani',
    kategori: 'pendidikan',
    jumlahEpisode: 25,
    bahasa: 'Indonesia',
  },
];
let nextId = 4;

// Menampilkan seluruh podcast, bisa difilter berdasarkan kategori
function getAll(kategori) {
  if (kategori) {
    return podcasts.filter(
      (p) => p.kategori.toLowerCase() === kategori.toLowerCase()
    );
  }
  return podcasts;
}

// Menampilkan satu podcast berdasarkan ID
function getById(id) {
  return podcasts.find((p) => p.id === id);
}

// Menambahkan podcast baru
function create(data) {
  const baru = { id: nextId++, ...data };
  podcasts.push(baru);
  return baru;
}

// Mengganti seluruh data podcast (PUT), id tetap dipertahankan
function update(id, data) {
  const index = podcasts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  podcasts[index] = { id, ...data };
  return podcasts[index];
}

// Menghapus podcast berdasarkan ID, mengembalikan data yang dihapus
function remove(id) {
  const index = podcasts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const [dihapus] = podcasts.splice(index, 1);
  return dihapus;
}

module.exports = { getAll, getById, create, update, remove };
