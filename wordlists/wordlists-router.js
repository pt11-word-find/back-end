const router = require("express").Router();
const Wordlists = require("./wordlists-model");
const restricted= require("../auth/restricted-middleware")

router.get("/", (req, res) => {
  Wordlists.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error getting data" });
    });
});

router.get("/count", (req, res) => {
  Wordlists.getCount()
    .then(users => {
      res.status(200).json(users[0].CNT);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error getting data" });
    });
});

router.get("/:id", (req, res) => {
  Wordlists.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(404).json({ errorMessage: "user not found" });
    });
});

router.post("/", restricted, (req, res) => {
  const body = req.body;
  body.wordlist = body.wordlist.split(" ,").join(",").split(", ").join(",")
  body.user_id = req.decodedJwt.id;
  console.log(req.decodedJwt)
  console.log(body);
  if (body.wordlist && body.title) {
    Wordlists.add(body)
      .then(post => {
          res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "error bad request" });
      });
  }  else {
    res.status(400).json({ errorMessage: "input a wordlist and title" });
  }
});

router.put("/:id", restricted, (req, res) => {});

router.delete("/:id", (req, res) => {
  Wordlists.remove(req.params.id)
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
