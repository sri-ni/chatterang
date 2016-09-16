module.exports = app => {
  /**
   * @api {get} / API Info
   * @apiGroup Info
   * @apiVersion 0.0.1
   * @apiSuccess {String} name API Name
   * @apiSuccess {String} version API Version
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *      "name": "savantory-books API",
   *      "version": "0.0.1"
   *    }
   */
  app.get('/', (req, res) => {
    res.json({
      name: 'savantory-books API',
      version: '0.0.1'
    });
  });
};
