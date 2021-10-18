db.air_alliances.aggregate(
  [
    {
      $project: {
        name: true,
        airlines: true,
        _id: false,
      },
    },
    {
      $unwind: "$airlines",
    },
    {
      $lookup: {
        from: "air_routes",
        localField: "airlines",
        foreignField: "airline.name",
        as: "parceiras",
      },
    },
    {
      $unwind: "$parceiras",
    },
    {
      $match: {
        "parceiras.airplane": {
          $in: [
            "747",
            "380",
          ],
        },
      },
    },
    {
      $group: {
        _id: "$name",
        totalRotas: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalRotas: -1,
      },
    },
    {
      $limit: 1,
    },
  ],
);
