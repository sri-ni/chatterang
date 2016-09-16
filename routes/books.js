module.exports = app => {
  const Books = app.db.models.Books;

  app.route('/books')
    .all(app.auth.authenticate())
    /**
     * @api {get} /books List all the books
     * @apiGroup Books
     * @apiVersion 0.0.1
     * @apiHeader {String} Authorization Token of authenticated client
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
     * @apiErrorExample {json} Books error
     *    HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Books.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    /**
     * @api {post} /books Add a new book
     * @apiGroup Books
     * @apiVersion 0.0.1
     * @apiHeader {String} Authorization Token of authenticated client
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} title Book title
     * @apiParam {String} author Book title
     * @apiParamExample {json} Input
     *    {
     *      "title": "A Tale of Two Cities",
     *      "author": "Charles Dickens"
     *    }
     * @apiSuccess {Number} id Book ID
     * @apiSuccess {String} title Book Title
     * @apiSuccess {String} author Book Author
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 12,
     *      "title": "A Tale of Two Cities",
     *      "author": "Charles Dickens"
     *    }
     * @apiErrorExample {json} Books error
     *    HTTP/1.1 412 Precondition Failed
     */
    .post((req, res) => {
      Books.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

  app.route('/books/:id')
    .all(app.auth.authenticate())
    /**
     * @api {get} /books/:id Retrieve a book
     * @apiGroup Books
     * @apiVersion 0.0.1
     * @apiHeader {String} Authorization Token of authenticated client
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {id} id Book ID
     * @apiSuccess {Number} id Book ID
     * @apiSuccess {String} title Book Title
     * @apiSuccess {String} author Book Author
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 12,
     *      "title": "A Tale of Two Cities",
     *      "author": "Charles Dickens"
     *    }
     * @apiErrorExample {json} Task not found error
     *    HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 412 Precondition Failed
     */
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
    /**
     * @api {put} /books/:id Update a Book
     * @apiGroup Books
     * @apiVersion 0.0.1
     * @apiHeader {String} Authorization Token of authenticated client
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {id} id Book ID
     * @apiParam {String} title Book title
     * @apiParam {String} author Book title
     * @apiParamExample {json} Input
     *    {
     *      "title": "A Tale of Two Cities",
     *      "author": "Charles Dickens"
     *    }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Update error
     *    HTTP/1.1 412 Precondition Failed
     */
    .put((req, res) => {
      Books.update(req.body, {where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    /**
     * @api {delete} /books/:id Remove a Book
     * @apiGroup Books
     * @apiVersion 0.0.1
     * @apiHeader {String} Authorization Token of authenticated client
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {id} id Book ID
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Delete error
     *    HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      Books.destroy({where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        })
    });
};
