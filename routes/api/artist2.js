const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//const paginatedResults = require('../../middleware/paginatedResults');

const mongoose = require('mongoose');
const {
  Types: { ObjectId },
} = mongoose;

//models
const Artist = require('../../models/Artist');

// @route    GET api/artist
// @desc     Get all artists paginated
// @access   Public
// router.get('/', paginatedResults(Artist), async (req, res) => {
//   try {
//     console.log('server:GET api/artist');
//     res.json(res.paginatedResults);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route    POST api/album
// @desc     Create album
// @access   Public
// router.post(
//   '/',
//   [[check('name', 'Status is required').not().isEmpty()]],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { name } = req.body;

//     const artistFields = {
//       name,
//     };

//     try {
//       await new Artist(artistFields).save();
//       res.json(artistFields);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );
