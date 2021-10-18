db.trips.aggregate(
  [
    {
      $project: {
        usertype: true,
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
        _id: "$usertype",
        duracaoMedia: {
          $avg: "$temp",
        },
      },
    },
    {
      $project: {
        tipo: "$_id",
        duracaoMedia: {
          $divide: [
            "$duracaoMedia",
            60 * 60 * 1000,
          ],
        },
      },
    },
    {
      $project: {
        tipo: true,
        duracaoMedia: {
          $round: ["$duracaoMedia", 2],
        },
        _id: false,
      },
    },
  ],
);
