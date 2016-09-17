import jwt from 'jwt-simple';

describe('Routes: Books', () => {
  const Clients = app.db.models.Clients;
  const Books = app.db.models.Books;
  const jwtSecret = app.libs.config.jwtSecret;
  let token;
  let fakeBook;

  beforeEach(done => {
    Clients
      .destroy({where: {}})
      .then(() => Clients.create({
        name: 'app test 2',
        secret: 'password'
      }))
      .then(client => {
        Books
          .destroy({where: {}})
          .then(() => Books.create({
            'title': 'Frozen',
            'author': 'Disney'
          }))
          .then(() => Books.create({
            'title': 'Tangled',
            'author': 'Disney'
          }))
          .then(book => {
            fakeBook = book;
            token = jwt.encode({id: client.id}, jwtSecret);
            done();
          });
      });
  });

  describe('GET /books', () => {
    describe('status 200', () => {
      it('returns a list of books', done => {
        request.get('/books')
          .set('Authorization', `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body[0].title).to.eql('Frozen');
            expect(res.body[1].title).to.eql('Tangled');
            done(err);
          });
      });
    });
  });

  describe('POST /books', () => {
    describe('status 200', () => {
      it('creates a new book', done => {
        request.post('/books')
          .set('Authorization', `JWT ${token}`)
          .send({title: 'Moana', author: 'Disney'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql('Moana');
            expect(res.body.author).to.eql('Disney');
            done(err);
          });
      });
    });
  });

  describe('GET /books/:id', () => {
    describe('status 200', () => {
      it('returns one book', done => {
        request.get(`/books/${fakeBook.id}`)
          .set('Authorization', `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql('Tangled');
            done(err);
          });
      });
    });
    describe('status 404', () => {
      it('throws error when book not exist', done => {
        request.get('/books/13130')
          .set('Authorization', `JWT ${token}`)
          .expect(404)
          .end((err, res) => done(err));
      });
    });
  });

  describe('PUT /books/:id', () => {
    describe('status 204', () => {
      it('updates a book', done => {
        request.put(`/books/${fakeBook.id}`)
          .set('Authorization', `JWT ${token}`)
          .send({
            title: 'Tangled 2',
            author: 'Disney Animation'
          })
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });

  describe('DELETE /books/:id', () => {
    describe('status 204', () => {
      it('removes a book', done => {
        request.delete(`/books/${fakeBook.id}`)
          .set('Authorization', `JWT ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
});
