const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcastController');
const cekApiKey = require('../middlewares/cekApiKey');

// Baca data: terbuka
router.get('/', podcastController.getAll);
router.get('/:id', podcastController.getById);

// Ubah data: wajib API key
router.post('/', cekApiKey, podcastController.create);
router.put('/:id', cekApiKey, podcastController.update);
router.delete('/:id', cekApiKey, podcastController.remove);

module.exports = router;