const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const paginatedResults = require('../../middleware/paginatedResults');

const mongoose = require('mongoose');
const {
  Types: { ObjectId },
} = mongoose;

//models
const Artist = require('../../models/Artist');

// @route    GET api/artist
// @desc     Get all artists paginated
// @access   Public
router.get('/', paginatedResults(Artist), async (req, res) => {
  try {
    //console.log('server:GET api/artist');
    res.json(res.paginatedResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/artist
// @desc     Create artist
// @access   Public
router.post(
  '/',
  [[check('name', 'Status is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;

    const artistFields = {
      name,
    };

    try {
      await new Artist(artistFields).save();
      res.json(artistFields);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/artist
// @desc     Update artist
// @access   Public
router.put(
  '/:artist_id',
  [[check('name', 'Status is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;

    const artistFields = {
      name,
    };

    //console.log('server:PUT api/artist/:artist_id');
    //console.log(req.params.artist_id);
    try {
      //console.log(567);
      //check if the id is valid
      let isObjectIdValid = (id) =>
        ObjectId.isValid(id)
          ? String(new ObjectId(id) === id)
            ? true
            : false
          : false;
      //if the id is valid update artist
      if (isObjectIdValid(req.params.artist_id)) {
        let artist = await Artist.findByIdAndUpdate(
          { _id: req.params.artist_id },
          { $set: artistFields },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
      }

      res.json(artistFields);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/artist/:artist_id
// @desc     Get artist by id
// @access   Public
router.get('/:artist_id', async ({ params: { artist_id } }, res) => {
  try {
    //console.log('server:GET api/artist/:artist_id');
    //check if the id is valid
    let isObjectIdValid = (id) =>
      ObjectId.isValid(id)
        ? String(new ObjectId(id) === id)
          ? true
          : false
        : false;

    //if the id is valid update artist
    if (isObjectIdValid(artist_id)) {
      const artist = await Artist.findOne({
        _id: artist_id,
      });
      if (!artist) return res.status(400).json({ msg: 'Artist not found' });

      return res.json(artist);
    } else {
      return res.status(400).json({ msg: 'Artist Id not found' });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
