const express = require('express');

const router = express.Router();

const { story } = require('../models/index');

router.get('/all/json', async (req, res) => {
  const post = await story.findAll();

  res.send(post);
});

router.get('/:id/json', async (req, res) => {
  const post = await story.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.send(post);
});

router.put('/:id', async (req, res) => {
  const updateStory = await story.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.render('data', { data: updateStory });
});

router.delete('/:id', async (req, res) => {
  console.log(`Im now deleting the ${req.params.id}`);
  const byeBye = await story.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send('<alert>Story is deleted.</alert>');
});

module.exports = router;
