describe('Routes: Messages', () => {

  describe('POST /messages', () => {
    describe('status 200', () => {
      it('send a message with mentions', done => {
        request.post('/messages')
          .send({message: '@chris and @tony you around?'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.mentions).to.have.length(2);
            done(err);
          });
      });
      it('send a message with emoticons', done => {
        request.post('/messages')
          .send({message: 'Good morning! (megusta) (coffee) (omg)'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.emoticons).to.have.length(3);
            done(err);
          });
      });
      it('send a message with links', done => {
        request.post('/messages')
          .send({message: 'Olympics are starting soon; http://www.nbcolympics.com Live scores also on google.com'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.links).to.have.length(2);
            done(err);
          });
      });
      it('send a message with mentions & emoticons', done => {
        request.post('/messages')
          .send({message: '@bob @john (success) such a cool feature'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.mentions).to.have.length(2);
            expect(res.body.emoticons).to.have.length(1);
            done(err);
          });
      });
      it('send a message with mentions & links', done => {
        request.post('/messages')
          .send({message: '@bob @john such a cool feature; https://twitter.com/jdorfman/status/430511497475670016'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.mentions).to.have.length(2);
            expect(res.body.links).to.have.length(1);
            done(err);
          });
      });
      it('send a message with emoticons & links', done => {
        request.post('/messages')
          .send({message: '(howl) (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.emoticons).to.have.length(2);
            expect(res.body.links).to.have.length(1);
            done(err);
          });
      });
      it('send a message with mentions, emoticons & links', done => {
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
