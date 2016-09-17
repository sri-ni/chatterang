describe('Routes: Token', () => {
  const Clients = app.db.models.Clients;
  describe('POST /token', () => {

    beforeEach(done => {
      Clients
        .destroy({where:{}})
        .then(() => Clients.create({
          name: 'app test 5',
          secret: 'password'
        }))
        .then(done());
    });

    describe('status 200', () => {
      it('returns authenticated client token', done => {
        request.post('/token')
          .send({
            name: 'app test 5',
            secret: 'password'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys('token');
            done(err);
          });
      });
    });
    describe('status 401', () => {
      it('throws error when secret is incorrect', done => {
        request.post("/token")
          .send({
            name: "app test 5",
            secret: "WRONG_PASSWORD"
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it('throws error when client name not exist', done => {
        request.post("/token")
          .send({
            name: "app not test",
            secret: "WRONG_PASSWORD"
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it('throws error when client name and secret are blank', done => {
        request.post("/token")
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});
