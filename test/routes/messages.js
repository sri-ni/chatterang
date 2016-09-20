describe('Routes: Messages', () => {

  describe('POST /messages', () => {
    describe('status 200', () => {
      it('checks message for mentions', done => {
        request.post('/messages')
          .send({message: '@chris and @tony you around?'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.mentions).to.have.length(2);
            done(err);
          });
      });
      it('checks message for unique mentions', done => {
        request.post('/messages')
          .send({message: '@china @china @china @tokyo'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.mentions).to.have.length(2);
            done(err);
          });
      });
      it('checks message for mentions containing alphanumeric characters', done => {
        request.post('/messages')
          .send({message: '@chris, @sr1ni, @to098ny, @chris and @tony you around?'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.mentions).to.have.length(4);
            done(err);
          });
      });
      it('checks message for mentions containing non-english characters', done => {
        request.post('/messages')
          .send({message: '@china @तर @tokyo @jap#$# @Brücke @Brücke @Награды, @宁城古代的称呼, @صحراء'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.mentions).to.have.length(8);
            done(err);
          });
      });
      it('checks message for mentions containing non-english & unicode characters', done => {
        request.post('/messages')
          .send({message: '@तर @Brücke @Награды, @宁城古代的称呼, @صحراء @\u00F8'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.mentions).to.have.length(6);
            done(err);
          });
      });
      it('checks message for emoticons', done => {
        request.post('/messages')
          .send({message: 'Good morning! (megusta) (coffee) (omg)'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.emoticons).to.have.length(3);
            done(err);
          });
      });
      it('checks message for links', done => {
        request.post('/messages')
          .send({message: 'Olympics are starting soon; http://www.nbcolympics.com Live scores also on google.com'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.links).to.have.length(2);
            done(err);
          });
      });
      it('checks message for mentions & emoticons', done => {
        request.post('/messages')
          .send({message: '@bob @john (success) such a cool feature'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.mentions).to.have.length(2);
            expect(res.body.emoticons).to.have.length(1);
            done(err);
          });
      });
      it('checks message for mentions & links', done => {
        request.post('/messages')
          .send({message: '@bob @john such a cool feature; https://twitter.com/jdorfman/status/430511497475670016'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.mentions).to.have.length(2);
            expect(res.body.links).to.have.length(1);
            done(err);
          });
      });
      it('checks message for emoticons & links', done => {
        request.post('/messages')
          .send({message: '(howl) (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.emoticons).to.have.length(2);
            expect(res.body.links).to.have.length(1);
            done(err);
          });
      });
      it('checks message for mentions, emoticons & links', done => {
        request.post('/messages')
          .send({message: '@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.mentions).to.have.length(2);
            expect(res.body.emoticons).to.have.length(1);
            expect(res.body.links).to.have.length(1);
            done(err);
          });
      });
    });
    describe('status 400', () => {
      it('throws error when message is empty', done => {
        request.post('/messages')
          .send({message: '  '})
          .expect(400)
          .end((err, res) => done(err));
      });
    });
  });

});
