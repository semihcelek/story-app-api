const express = require("express");
const { user, story } = require("../models/index");
const ensureLogin = require("../middleware/ensure-login");

const router = express.Router();
router.get("/*/json", ensureLogin);
//

router.get("/all/json", async (req, res) => {
  const people = await user.findAll();

  res.send(people);
});

router.get("/:id/json", async (req, res) => {
  try {
    const person = await user.findOne({
      where: {
        id: req.params.id,
      },
    });
    person ? res.send(person) : res.status(404).end();
    // when there isn't any user to send, response with status 404.
  } catch (err) {
    console.error(err);
    res.status(500);
    //5xx server error status for internal error
  }
});

router.post("/", ensureLogin, async (req, res, next) => {
  try {
    const newUser = await user.create(req.body);
    res.send(newUser);
  } catch (err) {
    res.status(500).end();
    console.error(err);
  }
});

router.post("/:id/story", async (req, res) => {
  try {
    const person = await user.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (person) {
      const newStory = await story.create({
        title: req.body.title,
        content: req.body.content,
        authorId: person.id,
        userId: person.id,
      });
      res.send(newStory);
    } else {
      res.send("user is not found");
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const person = await user.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (person) {
      const updateUser = await user.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.render("data", { data: updateUser });
    } else {
      res.send("user is not found");
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const person = await user.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (person) {
      await user
        .destroy({
          where: {
            id: req.params.id,
          },
        })
        .then(res.send("account is succesfully deleted"));
    } else {
      res.send("user is not found");
      res.status(404).end();
    }
  } catch (err) {
    console.err(err);
  }
});

module.exports = router;

// router.post('/:id/story', async(req, res) => {
//   const currentUserId = req.params.id;
//   const newStory = await story.build(req.body)
//   newStory.authorId= await currentUserId;
//   newStory.userId= await currentUserId;
//   await newStory.save()
//   res.send(newStory);
//   })
