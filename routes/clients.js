module.exports = app => {
  const Clients = app.db.models.Clients;

  app.route('/clients')
    .all(app.auth.authenticate())
    .all((req, res, next) => {
      if (req.user.name !== 'admin') {
        res.sendStatus(401);
      } else {
        next();
      }
    })
    /**
     * @api {get} /clients List all the Clients
     * @apiPermission admin
     * @apiGroup Clients
     * @apiVersion 0.0.1
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Object[]} clients Client's list
     * @apiSuccess {Number} clients.id Client ID
     * @apiSuccess {String} clients.name Client Name
     * @apiSuccess {String} clients.secret Client Secret
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [{
     *      "id": 1,
     *      "name": "app one",
     *      "secret": "$2a$10$AQFRm0GLXqAX.JJEl.ArGVlic8D27.nJDEUblR2"
     *    }]
     * @apiErrorExample {json} Authorization error
     *    HTTP/1.1 401 Unauthorized
     */
    .get((req, res) => {
      Clients.findAll({})
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })
    .post((req, res) => {
      Clients.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

  app.route('/client')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Clients.findById(req.user.id, {
        attributes: ['id', 'name']
      })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })
    .delete((req, res) => {
      Clients.destroy({where: {id: req.user.id} })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });
}
