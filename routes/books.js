module.exports = app => {
  const Books = app.models.books;
  app.get('/books', (req, res) => {
    Books.findAll({}, (books) => {
      res.json({books: books});
    });
  });
};
