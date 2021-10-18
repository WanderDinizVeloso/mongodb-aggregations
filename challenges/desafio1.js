db.movies.aggregate(
  [
    {
      $match: {
        "imdb.rating": {
          $gte: 7.0,
        },
        genres: {
          $nin: [
            "Crime",
            "Horror",
          ],
        },
        rated: {
          $in: [
            "PG",
            "G",
          ],
        },
        languages: {
          $all: [
            "English",
            "Spanish",
          ],
        },
      },
    },
  ],
);
