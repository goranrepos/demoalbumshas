const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const paginatedResults = require('../../middleware/paginatedResults');

const mongoose = require('mongoose');
const {
  Types: { ObjectId },
} = mongoose;

//models
const Album = require('../../models/Album');
const Artist = require('../../models/Artist');

// @route    GET api/album
// @desc     Get all albums paginated
// @access   Public
router.get('/', paginatedResults(Album), async (req, res) => {
  try {
    //console.log('server:GET api/album');
    //const albums = await Album.find();
    //res.json(albums);
    res.json(res.paginatedResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/album/:album_id
// @desc     Get album by id
// @access   Public
router.get('/:album_id', async ({ params: { album_id } }, res) => {
  try {
    //console.log('server:GET api/album/:album_id');
    //check if the id is valid
    let isObjectIdValid = (id) =>
      ObjectId.isValid(id)
        ? String(new ObjectId(id) === id)
          ? true
          : false
        : false;

    //if the id is valid update album
    if (isObjectIdValid(album_id)) {
      const album = await Album.findOne({
        _id: album_id,
      }).populate('artist', ['name']);
      if (!album) return res.status(400).json({ msg: 'Album not found' });

      return res.json(album);
    } else {
      return res.status(400).json({ msg: 'Album Id not found' });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    POST api/album
// @desc     Create album
// @access   Public
router.post(
  '/',
  [
    [
      check('artist_name', 'Status is required').not().isEmpty(),
      check('album_title', 'Status is required').not().isEmpty(),
      check('year', 'Skills is required').not().isEmpty(),
      check('condition', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { album_title, year, condition, artist_name } = req.body;

    //find artist with a name
    const artist = await Artist.findOne({ name: artist_name });

    if (!artist) {
      return res.status(400).json({ msg: 'There is no artist with that name' });
    }

    //find album with a title
    const album = await Artist.findOne({ album_title });

    if (!album) {
      return res
        .status(400)
        .json({ msg: 'There is album with that name already' });
    }

    const albumFields = {
      album_title,
      year,
      condition,
      artist: artist._id,
    };

    try {
      await new Album(albumFields).save();
      res.json(albumFields);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/album
// @desc     Update album
// @access   Public
router.put(
  '/:album_id',
  [
    [
      check('artist_name', 'Status is required').not().isEmpty(),
      check('album_title', 'Status is required').not().isEmpty(),
      check('year', 'Skills is required').not().isEmpty(),
      check('condition', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { album_title, year, condition, artist_name } = req.body;

    //find artist with a name
    const artist = await Artist.findOne({ name: artist_name });

    if (!artist) {
      return res.status(400).json({ msg: 'There is no artist with that name' });
    }

    const albumFields = {
      album_title,
      year,
      condition,
      artist: artist._id,
    };

    //console.log('server:PUT api/album/:album_id');
    //console.log(req.params.album_id);
    try {
      //console.log(567);
      //check if the id is valid
      let isObjectIdValid = (id) =>
        ObjectId.isValid(id)
          ? String(new ObjectId(id) === id)
            ? true
            : false
          : false;
      //if the id is valid update album
      if (isObjectIdValid(req.params.album_id)) {
        let album = await Album.findByIdAndUpdate(
          { _id: req.params.album_id },
          { $set: albumFields },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
      }

      res.json(albumFields);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
