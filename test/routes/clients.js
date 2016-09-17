import jwt from 'jwt-simple';

describe('Routes: Clients', () => {
  const Clients = app.db.models.Clients;
  const jwtSecret = app.libs.config.jwtSecret;
  let token;

  beforeEach(done => {
    Clients
      .destroy({where: {}})
      .then(() => Clients.create({
        name: 'admin',
        secret: 'password'
      }))
      .then(client => {
        token = jwt.encode({id: client.id}, jwtSecret);
        done();
      });
  });

  describe('GET /client', () => {
    describe('status 200', () => {
      it('returns an authenticated client', done => {
        request.get('/client')
          .set('Authorization', `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('admin');
            done(err);
          });
      });
    });
  });

  describe('DELETE /client', () => {
    describe('status 204', () => {
      it('deletes an authenticated client', done => {
        request.delete('/client')
          .set('Authorization', `JWT ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });

  describe('POST /clients', () => {
    describe('status 200', () => {
      it('(admin) creates a new client', done => {
        request.post('/clients')
          .set('Authorization', `JWT ${token}`)
          .send({
            name: 'app firmo',
            secret: 'password'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('app firmo');
            done(err);
          });
      });
    });
  });

  describe('GET /clients', () => {
    describe('status 200', () => {
      it('(admin) returns list of all clients', done => {
        request.get('/clients')
          .set('Authorization', `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(1);
            expect(res.body[0].name).to.eql('admin');
            expect(res.body[0]).to.include.keys('id');
            expect(res.body[0]).to.include.keys('name');
            expect(res.body[0]).to.include.keys('secret');
            done(err);
          });
      });
    });
  });

});
