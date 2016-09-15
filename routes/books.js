module.exports = app => {
  const Books = app.db.models.Books;
  app.get('/books', (req, res) => {
    Books.findAll({}).then(books => {
      res.json({books: books});
    });
  });
};
