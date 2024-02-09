var express = require("express");
var router = express.Router();

const {
  addTransaction,
  fetchTransactions,
} = require("../src/repository/postgres/postgres");

router.post("/", async function (req, res, next) {
  const { productNames, totalAmount, cash, change } = req.body;
  console.log(req.body);
  if (productNames && totalAmount && cash && change) {
    await addTransaction(productNames, totalAmount, cash, change)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return res.status(400).json({ error: "Missing Required Paramaters" });
  }
});

router.get("/", async function (req, res, next) {
  await fetchTransactions()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

module.exports = router;
