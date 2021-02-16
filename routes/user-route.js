const express = require('express');
// const UserService = require('../services/user-service')
const { user } = require('../models/index');

const router = express.Router();

router.get('/all/json', async (req, res) => {
  const people = await user.findAll();

  res.send(people);
});

router.get('/:id/json', async (req, res) => {
  const person = await user.findAll({
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
