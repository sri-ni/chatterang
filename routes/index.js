module.exports = app => {
  app.get('/', (req, res) => {
    res.json({status: 'savantory-books API'});
  });
};
