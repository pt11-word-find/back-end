const router = require("express").Router();
const Users = require("./wordlists-model");
const restricted= require("../auth/restricted-middleware")

router.get("/", (req, res) => {
  Users.getAll()
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

router.post("/", restricted, (req, res) => {
  const body = req.body;
  body.user_id = req.decodedJwt.id;
  console.log(req.decodedJwt)
  console.log(body);
  Users.add(body)
    .then(post => {
      if (body.wordlist && body.title) {
        res.status(201).json(post);
      } else {
        res.status(400).json({ errorMessage: "input a wordlist and title" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error bad request" });
    });
});

router.put("/:id", restricted, (req, res) => {});

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
  .then(deleted => {
    if(deleted){
      res.status(200).end()
    } else {
      res.status(404).json({ errorMessage: "user doesn't exist"})
    }
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "server error"})
  })
});

module.exports = router;
