import jwt from 'jwt-simple';

module.exports = app => {
  const cfg = app.libs.config;
  const Clients = app.db.models.Clients;

  app.post('/token', (req, res) => {
    if (req.body.name && req.body.secret) {
      const name = req.body.name;
      const secret = req.body.secret;
      Clients.findOne({where: {name: name} })
        .then(client => {
          if (Clients.isPassword(client.secret, secret)) {
            const payload = {id: client.id};
            res.json({
              token: jwt.encode(payload, cfg.jwtSecret)
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch(error => res.sendStatus(401));
    } else {
      res.sendStatus(401);
    }
  });
};
