const { model } = require('../models/Album');
const Artist = require('../models/Artist');

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    //console.log(req.query.query);

    //set the query
    let regex = null;
    if (req.query.query) {
      regex = new RegExp(escapeRegex(req.query.query), 'gi');
      //console.log(regex);
    }

    //set results object
    const results = {};

    //set start index
    const startIndex = (page - 1) * limit;

    //set results.previous
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    //set end index
    const endIndex = page * limit;

    //console.log(page, limit);
    try {
      //if there is a query
      if (regex) {
        //get count of results with query
        results.count = await model
          .aggregate([
            {
              $lookup: {
                from: Artist.collection.name,
                localField: 'artist',
                foreignField: '_id',
                as: 'artist',
              },
            },
            { $unwind: '$artist' },
            {
              $match: {
                $or: [
                  { 'artist.name': { $in: [regex] } },
                  { year: regex },
                  { albumn: regex },
                  { condition: regex },
                ],
              },
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                result: { $push: '$$ROOT' },
              },
            },
            { $project: { _id: 0, count: 1 } },
          ])
          .exec();

        //if there are results with the query
        if (results.count.length > 0) {
          //console.log('count', results.count);

          //set results next
          if (endIndex < results.count[0].count) {
            results.next = {
              page: page + 1,
              limit: limit,
            };
          }
        }

        //get results with the query
        results.results = await model
          .aggregate([
            {
              $lookup: {
                from: Artist.collection.name,
                localField: 'artist',
                foreignField: '_id',
                as: 'artist',
              },
            },
            { $unwind: '$artist' },
            //{ $match: { 'bar.name': { $in: ['AC/DC'] } } },
            //{ $match: { year: regex } },
            {
              $match: {
                $or: [
                  { 'artist.name': { $in: [regex] } },
                  { year: regex },
                  { albumn: regex },
                  { condition: regex },
                ],
              },
            },
          ])
          .skip(startIndex)
          .limit(limit)
          .exec();

        //if there is no query
      } else {
        //count all results
        //results.count = [];
        results.count = [{ count: await model.countDocuments().exec() }];
        //console.log('results.count', results.count);
        if (endIndex < results.count[0].count) {
          results.next = {
            page: page + 1,
            limit: limit,
          };
        }

        //get all results
        results.results = await model
          .find({})
          .populate('artist', ['name'])
          .limit(limit)
          .skip(startIndex)
          .populate('artist', ['name'])
          .exec();
      }

      //{
      //     $lookup: {
      //       from: 'artist',
      //       localField: 'artist',
      //       foreignField: '_id',
      //       as: 'bar',
      //     },
      //   },

      //.find({ albums: { $elemMatch: { album_title: 'AC/DC' } } }) // not working
      //.find({ album_title: { $regex: 'AC', $options: 'i' } }) //one field works
      // .find({ //works on one collection
      //   $or: [
      //     { album_title: regex },
      //     { condition: regex },
      //     { year: regex },
      //     { name: regex },
      //   ],
      // })
      // .aggregate([
      //   { $unwind: '$artist' },
      //   {
      //     $lookup: {
      //       from: 'artist',
      //       localField: 'artist',
      //       foreignField: '_id',
      //       as: 'bar',
      //     },
      //   },
      //   {
      //     $match: {
      //       'artist.name': 'AC/DC',
      //     },
      //   },
      // ])
      //.limit(limit)
      //.skip(startIndex)
      //.populate('artist', ['name'])
      //.exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
};
