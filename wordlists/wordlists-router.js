const router = require("express").Router();
const Users = require("./wordlists-model");

router.get("/", (req, res) => {
  Users.getAll(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error getting data" });
    });
});

router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(404).json({ errorMessage: "user not found" });
    });
});

router.post("/", (req, res) => {
  const body = req.body;
  Users.add(body)
    .then(body => {
      if (body.wordlist && body.title) {
        res.status(201).json(body);
      } else {
        res.status(400).json({ errorMessage: "input a wordlist and title" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error bad request" });
    });
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
