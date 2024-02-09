var express = require("express");
const {
  addProduct,
  fetchProducts,
  deleteProduct,
  updateProduct,
} = require("../src/repository/postgres/postgres");
var router = express.Router();

router.get("/", async function (req, res, next) {
  await fetchProducts()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.post("/", async function (req, res, next) {
  const { productName, productPrice, category, stock } = req.body;
  console.log(req.body);
  if (productName && productPrice && category && stock) {
    try {
      await addProduct(
        productName,
        productPrice,
        category,
        stock,
        (data) => {
          return res.status(200).json(data);
        },
        (err) => {
          return res.status(500).json(err);
        }
      );
    } catch (error) {
      console.error("Authentication failed:", error.message);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Missing Required Parameters" });
  }
});

router.post("/update/:id", async function (req, res, next) {
  const { productName, productPrice, category, stock } = req.body;
  const { id } = req.params;
  console.log(req.body);
  if (productName && productPrice && category && stock && id) {
    await updateProduct(id, productName, productPrice, category, stock)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return res.status(400).json({ error: "Missing Required Parameters" });
  }
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  if (id) {
    await deleteProduct(id)
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
module.exports = router;
