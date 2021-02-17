const express = require('express');
// const UserService = require('../services/user-service')
const { user, story } = require('../models/index');

const router = express.Router();

router.get('/all/json', async (req, res) => {
  const people = await user.findAll();

  res.send(people);
});

router.get('/:id/json', async (req, res) => {
  const person = await user.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.send(person);
});

router.post('/', async (req, res) => {
  const newUser = await user.create(req.body);
  res.send(newUser);
});

router.post('/:id/story', async (req, res) => {
  const { id } = await user.findOne({
    where: {
      id: req.params.id,
    },
  });
  const newStory = await story.create({
    title: req.body.title,
    content: req.body.content,
    authorId: id,
    userId: id,
  });

  res.send(newStory);
});

router.put('/:id', async (req, res) => {
  const updateUser = await user.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.render('data', { data: updateUser });
});

router.delete('/:id', async (req, res) => {
  console.log(`Im now deleting the ${req.params.id}`);
  const byeBye = await user.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send('<alert>User is deleted.</alert>');
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
