const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Artist = mongoose.model('artist', ArtistSchema);
