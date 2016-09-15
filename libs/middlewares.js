import bodyParser from 'body-parser';

module.exports = app => {
  app.set('port', 3000);
  app.set('json spaces', 2);
  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    if (req && req.body && req.body.id) {
      delete req.body.id;
    }
    next();
  });
};
