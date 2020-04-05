const router = require("express").Router();
const Wordlists = require("./wordlists-model");
const restricted= require("../auth/restricted-middleware");
const wordlistValidator = require("./wordlist-validator");

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

router.get("/mine", restricted, (req, res) => {
  const user_id = req.decodedJwt.id;
  console.log(user_id)
    Wordlists.getUserPuzzles(user_id)
      .then(post => {
          res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "error bad request" });
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
  body.wordlist = wordlistValidator(body.wordlist).split(",").map(item => item.trim()).filter(item => item.length > 0).join(",")
  body.user_id = req.decodedJwt.id;
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
