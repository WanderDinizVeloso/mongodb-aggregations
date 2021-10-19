db.trips.aggregate(
  [
    {
      $project: {
        startTime: true,
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
      $match: {
        startTime: {
          $gte: ISODate("2016-03-10T00:00:00Z"),
          $lte: ISODate("2016-03-10T23:59:59Z"),
        },
      },
    },
    {
      $group: {
        _id: null,
        duracaoMedia: {
          $avg: "$temp",
        },
      },
    },
    {
      $project: {
        duracaoMediaEmMinutos: {
          $divide: [
            "$duracaoMedia",
            60 * 1000,
          ],
        },
      },
    },
    {
      $project: {
        duracaoMediaEmMinutos: {
          $round: ["$duracaoMediaEmMinutos", 0],
        },
        _id: false,
      },
    },
  ],
);
