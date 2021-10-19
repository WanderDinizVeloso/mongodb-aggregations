db.trips.aggregate(
  [
    {
      $project: {
        bikeid: true,
        temp: {
          $subtract: [
            "$stopTime",
            "$startTime",
          ],
        },
        _id: false,
      },
    },
    {
      $group: {
        _id: "$bikeid",
        duracaoMedia: {
          $avg: "$temp",
        },
      },
    },
    {
      $sort: {
        duracaoMedia: -1,
      },
    },
    {
      $project: {
        bikeId: "$_id",
        duracaoMedia: {
          $ceil: {
            $divide: [
              "$duracaoMedia",
              60 * 1000,
            ],
          },
        },
        _id: false,
      },
    },
    {
      $limit: 5,
    },
  ],
);
