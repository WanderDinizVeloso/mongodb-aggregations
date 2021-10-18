db.movies.aggregate(
  [
    {
      $match: {
        countries: "USA",
        "tomatoes.viewer.rating": {
          $gte: 3,
        },
        cast: {
          $in: [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ],
        },
      },
    },
    {
      $project: {
        title: true,
        "tomatoes.viewer.rating": true,
        num_favs: {
          $size: {
            $setIntersection: [
              "$cast",
              [
                "Sandra Bullock",
                "Tom Hanks",
                "Julia Roberts",
                "Kevin Spacey",
                "George Clooney",
              ],
            ],
          },
        },
        _id: false,
      },
    },
    {
      $sort: {
        num_favs: -1,
        "tomatoes.viewer.rating": -1,
        title: -1,
      },
    },
    {
      $project: {
        title: true,
      },
    },
    {
      $skip: 24,
    },
    {
      $limit: 1,
    },
  ],
);
