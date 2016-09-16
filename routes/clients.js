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
     * @apiHeader {String} Authorization Token of authenticated admin client
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
    /**
     * @api {post} /clients Add a Client
     * @apiPermission admin
     * @apiGroup Clients
     * @apiVersion 0.0.1
     * @apiHeader {String} Authorization Token of authenticated admin client
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} name Client Name
     * @apiParam {String} secret Client Secret
     * @apiParamExample {json} Input
     *    {
     *      "name": "app one",
     *      "secret": "password"
     *    }
     * @apiSuccess {Number} id Client ID
     * @apiSuccess {String} name Client Name
     * @apiSuccess {String} secret Client Secret
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "name": "app one",
     *      "secret": "$2a$10$SK1B1"
     *    }
     * @apiErrorExample {json} Authorization error
     *    HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Register error
     *    HTTP/1.1 412 Precondition Failed
     */
    .post((req, res) => {
      Clients.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

  app.route('/client')
    .all(app.auth.authenticate())
    /**
     * @api {get} /client Return a client's data
     * @apiGroup Clients
     * @apiVersion 0.0.1
     * @apiHeader {String} Authorization Token of authenticated client
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id Client ID
     * @apiSuccess {String} name Client Name
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "name": "app one"
     *    }
     * @apiErrorExample {json} Authorization error
     *    HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Clients.findById(req.user.id, {
        attributes: ['id', 'name']
      })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })
    /**
     * @api {delete} /client Delete a client
     * @apiGroup Clients
     * @apiVersion 0.0.1
     * @apiHeader {String} Authorization Token of authenticated client
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Authorization error
     *    HTTP/1.1 401 Unauthorized
     * @apiErrorExample {json} Delete error
     *    HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      Clients.destroy({where: {id: req.user.id} })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });
}
