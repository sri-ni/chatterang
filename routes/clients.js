module.exports = app => {
  const Clients = app.db.models.Clients;

  app.route('/clients')
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
