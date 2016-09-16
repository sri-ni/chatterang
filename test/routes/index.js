describe('Routes: Index', () => {
  describe('GET /', () => {
    it('returns API Info', done => {
      request.get('/')
        .expect(200)
        .end((err, res) => {
          const expected = {
            name: 'savantory-books API',
            version: '0.0.1'
          };
          expect(res.body).to.eql(expected);
          done(err);
        });
    });
  });
});
