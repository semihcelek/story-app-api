const express = require("express");
const { user, story } = require("../models/index");
const ensureLogin = require("../middleware/ensure-login");

const router = express.Router();
// router.get("/*/json", ensureLogin);
// require login for all /json endpoints

router.get("/all/json", async (req, res) => {
  const people = await user.findAll({
    attributes: ["firstName", "lastName", "email"],
  });

  res.send(people);
});

router.get("/:id/json", ensureLogin, async (req, res) => {
  try {
    const person = await user.findOne({
      include: story,
      attributes: { exclude: ["passwordHash"] }, // excluding passwordHash entity isn't necessary anymore.
      where: {
        id: req.params.id,
      },
    });
    console.log(person);
    person ? res.send(person) : res.status(404).end();
    // when there isn't any user to send, response with status 404.
  } catch (err) {
    console.log(err);
    //5xx server error status for internal error
  }
});

router.put("/:id", ensureLogin, async (req, res) => {
  const person = req.user;
  try {
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

router.delete("/:id", ensureLogin, async (req, res) => {
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

// 2-staged creating method, not needed
// router.post('/:id/story', async(req, res) => {
//   const currentUserId = req.params.id;
//   const newStory = await story.build(req.body)
//   newStory.authorId= await currentUserId;
//   newStory.userId= await currentUserId;
//   await newStory.save()
//   res.send(newStory);
//   })

// Creating new user is not consern of user-route anymore,
// it is moved to the register-route
// router.post("/", async (req, res, next) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;
//     const passwordHash = await bcrypt.hash(password, 12);
//     const newUser = await user.create({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       passwordHash: passwordHash,
//     });
//     res.send(newUser);
//   } catch (err) {
//     res.status(500).end();
//     console.error(err);
//   }
// })
