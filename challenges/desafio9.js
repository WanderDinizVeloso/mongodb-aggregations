db.trips.aggregate(
  [
    {
      $project: {
        birthYear: true,
        _id: false,
      },
    },
    {
      $match: {
        birthYear: {
          $ne: "",
        },
      },
    },
    {
      $group: {
        _id: null,
        maiorAnoNascimento: {
          $max: {
            $toInt: "$birthYear",
          },
        },
        menorAnoNascimento: {
          $min: {
            $toInt: "$birthYear",
          },
        },
      },
    },
    {
      $project: {
        _id: false,
      },
    },
  ],
);
