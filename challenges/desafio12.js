db.trips.aggregate(
  [
    {
      $project: {
        dia_da_semana: {
          $dayOfWeek: "$startTime",
        },
        startStationName: true,
        _id: false,
      },
    },
    {
      $match: {
        dia_da_semana: 5,
      },
    },
    {
      $group: {
        _id: "$startStationName",
        total: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $project: {
        nomeEstacao: "$_id",
        total: "$total",
        _id: false,
      },
    },
    {
      $limit: 1,
    },
  ],
);
