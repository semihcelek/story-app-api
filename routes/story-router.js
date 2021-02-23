const express = require("express");
const { story } = require("../models/index");
const { ensureLogin } = require("../middleware/ensure-login");

const router = express.Router();

router.get("/all/json", async (req, res) => {
  try {
    const post = await story.findAll();
    res.send(post);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id/json", async (req, res) => {
  try {
    const post = await story.findOne({
      where: {
        id: req.params.id,
      },
    });
    post ? res.send(post) : res.status(404).end();
  } catch (err) {
    console.error(err);
  }
});
router.post("/", ensureLogin, async (req, res, next) => {
  try {
    const person = req.user;

    if (person) {
      const newStory = await story.create({
        title: req.body.title,
        content: req.body.content,
        authorId: person.id,
        userId: person.id,
      });
      res.send(newStory);
    } else {
      res.send("not authorized");
      res.status(401).end();
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", ensureLogin, async (req, res) => {
  // for future, make sure that user can only modify their !own! posts
  // now user can modify any post as long as it is valid user
  const updateStory = await story.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.render("data", { data: updateStory });
});

router.delete("/:id", ensureLogin, async (req, res) => {
  console.log(`Im now deleting the ${req.params.id}`);
  const byeBye = await story.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send(byeBye);
});

module.exports = router;

// const person = await user.findOne({
//   where: {
//     id: req.params.id,
//   },
// });
// check for token
// const token = getTokenFrom(req);
// console.log(token);
// const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
// if (!token || !decodedToken.id) {
//   return res.status(401).json({ error: "token is missing, or invalid" });
// }
// const person = await user.findOne({
//   where: {
//     id: decodedToken.id,
//   },
// });i
