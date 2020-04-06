const router = require("express").Router();
const Wordlists = require("./wordlists-model");
const restricted= require("../auth/restricted-middleware");
const wordlistValidator = require("./wordlist-validator");

const admin_ids = [13, 30];


router.get("/", (req, res) => {
  Wordlists.getAllApproved()
    .then(wordlists => {
      res.status(200).json(wordlists);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error getting data" });
    });
});

router.get("/all", (req, res) => {
  Wordlists.getAll()
    .then(wordlists => {
      res.status(200).json(wordlists);
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
    .then(wordlist => {
      if (wordlist) {
      res.status(200).json(wordlist);
      } else {
        res.status(404).json({message: "Wordlist not found"})
      }
    })
    .catch(err => {
      res.status(404).json({ errorMessage: "user not found" });
    });
});

router.post("/", restricted, (req, res) => {
  const body = req.body;
  delete body.approved;
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

router.put("/approve/:id", restricted, (req,res) => {
  const {id} = req.params;
  if (admin_ids.includes(req.decodedJwt.id)) {
    Wordlists.update(id, {approved: true})
    .then( wordlist => {
      res.status(200).json({message: `puzzle ${id} has been approved.`}) 
    })
    .catch(err => {
        res.status(500).json({message: 'Unable to update', error: err})
    })
  }
  else {
      res.status(401).json({message: "come on man"})
  }
})

router.put("/:id", restricted, (req, res) => {});

router.delete("/:id", restricted, (req, res) => {
  const user_id = req.decodedJwt.id;
  Wordlists.findById(req.params.id)
  .then(wordlist => {
      if (wordlist.user_id === user_id || admin_ids.includes(user_id)) {
      Wordlists.remove(req.params.id)
      .then(deleted => {
        if(deleted){
          res.status(200).json({message: "item deleted", id: Number(req.params.id)})
        } 
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "server error"})
      })
    }
    else {
      res.status(401).json({message: "cmon now"})
    }
  })
  .catch(err => {
    res.status(404).json({ errorMessage: "user not found" });
  });
  
});

module.exports = router;
