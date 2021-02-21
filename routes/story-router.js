const express = require("express");

const router = express.Router();

const { story } = require("../models/index");

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

router.put("/:id", async (req, res) => {
  const updateStory = await story.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.render("data", { data: updateStory });
});

router.delete("/:id", async (req, res) => {
  console.log(`Im now deleting the ${req.params.id}`);
  const byeBye = await story.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send("<alert>Story is deleted.</alert>");
});

module.exports = router;
