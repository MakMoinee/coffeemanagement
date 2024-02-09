var express = require("express");
var router = express.Router();
const {
  pool,
  addUser,
  loginUser,
} = require("../src/repository/postgres/postgres");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", function (req, res, next) {
  const { firstName, middleName, lastName, email, password } = req.body;
  console.log(req.body);
  if (firstName && lastName && email && password) {
    addUser(
      firstName,
      middleName,
      lastName,
      email,
      password,
      () => {
        return res.json({ success: "true" });
      },
      (err) => {
        return res.status(500).json({ error: err });
      }
    );
  } else {
    return res.status(400).json({ error: "Missing Required Paramaters" });
  }
});

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  console.log(req.body);
  if (email && password) {
    try {
      const data = await loginUser(email, password);
      delete data["password"];
      return res.status(200).json(data);
    } catch (error) {
      console.error("Authentication failed:", error.message);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Missing Required Parameters" });
  }
});

module.exports = router;
