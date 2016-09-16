module.exports = app => {
  const Books = app.db.models.Books;

  app.route('/books')
    .all(app.auth.authenticate())
    /**
     * @api {get} /books List all the books
     * @apiGroup Books
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Object[]} books Book's list
     * @apiSuccess {Number} books.id Book ID
     * @apiSuccess {String} books.title Book Title
     * @apiSuccess {Boolean} books.author Book Author
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [{
     *      "id": 1,
     *      "title": "Creativity, Inc.",
     *      "author": "Ed Catmull"
     *    }]
     * @apiError 412 Some required pre-condition failed
     * @apiErrorExample {json} Book error
     *    HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Books.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .post((req, res) => {
      Books.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

  app.route('/books/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Books.findOne({where: req.params})
        .then(result => {
          if (result) {
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .put((req, res) => {
      Books.update(req.body, {where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .delete((req, res) => {
      Books.destroy({where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        })
    });
};
