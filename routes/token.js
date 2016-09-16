import jwt from 'jwt-simple';

module.exports = app => {
  const cfg = app.libs.config;
  const Clients = app.db.models.Clients;

  /**
   * @api {post} /token Authentication Token
   * @apiGroup Credentials
   * @apiParam {String} name Client Name
   * @apiParam {String} secret Client Secret
   * @apiParamExample {json} Input
   *    {
   *      "name": "App One",
   *      "secret": "password"
   *    }
   * @apiSuccess {String} token Token of authenticated user
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {"token": "xyz.abc.123.hgf"}
   * @apiError 401 Unauthorized
   * @apiErrorExample {json} Authentication error
   *    HTTP/1.1 401 Unauthorized
   */
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
