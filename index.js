const app = require('./app');
const models = require('./models');

models.sequelize.sync().then((err) => {
  // console.log(err);
  // forcing the sync drops existing tables !!
  app.listen(process.env.EXPRESS_PORT || 3000, () => {
    console.log('Server is listening...');
  });
});
