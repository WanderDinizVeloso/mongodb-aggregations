db.trips.aggregate(
  [
    {
      $project: {
        dia_da_semana: {
          $dayOfWeek: "$startTime",
        },
        _id: false,
      },
    },
    {
      $group: {
        _id: "$dia_da_semana",
        total: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        diaDaSemana: "$_id",
        total: "$total",
        _id: false,
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $limit: 1,
    },
  ],
);
