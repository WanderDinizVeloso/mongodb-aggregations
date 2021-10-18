db.movies.aggregate(
  [
    {
      $project: {
        "imdb.rating": true,
        cast: true,
        languages: true,
        _id: false,
      },
    },
    {
      $match: {
        languages: "English",
      },
    },
    {
      $unwind: "$cast",
    },
    {
      $group: {
        _id: "$cast",
        numeroFilmes: {
          $count: {},
        },
        mediaIMDB: {
          $avg: "$imdb.rating",
        },
      },
    },
    {
      $sort: {
        numeroFilmes: -1,
        _id: -1,
      },
    },
    {
      $project: {
        _id: true,
        numeroFilmes: true,
        mediaIMDB: {
          $round: ["$mediaIMDB", 1],
        },
      },
    },
  ],
);
