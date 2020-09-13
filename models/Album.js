const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  album_title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'artist',
  },
});

module.exports = Album = mongoose.model('album', AlbumSchema);
