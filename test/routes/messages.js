describe('Routes: Messages', () => {

  describe('POST /messages', () => {
    describe('status 200', () => {

      describe('Test --Mentions--', () => {
        it('checks for mentions', done => {
          request.post('/messages')
            .send({message: '@chris and @tony you around?'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.mentions).to.have.length(2);
              done(err);
            });
        });
        it('checks for unique mentions', done => {
          request.post('/messages')
            .send({message: '@china @china @china @tokyo'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.mentions).to.have.length(2);
              done(err);
            });
        });
        it('checks for mentions with alphanumeric characters', done => {
          request.post('/messages')
            .send({message: '@chris, @sr1ni, @to098ny, @chris and @tony you around?'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.mentions).to.have.length(4);
              done(err);
            });
        });
        it('checks for mentions with non-english characters', done => {
          request.post('/messages')
            .send({message: '@china @तर @tokyo @jap#$# @Brücke @Brücke @Награды, @宁城古代的称呼, @صحراء'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.mentions).to.have.length(8);
              done(err);
            });
        });
        it('checks for mentions with non-english & unicode characters', done => {
          request.post('/messages')
            .send({message: '@तर @Brücke @Награды, @宁城古代的称呼, @صحراء @\u00F8'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.mentions).to.have.length(6);
              done(err);
            });
        });
      });

      describe('Test --Emoticons--', () => {
        it('checks for emoticons', done => {
          request.post('/messages')
            .send({message: 'Good morning! (megusta) (coffee) (omg)'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.emoticons).to.have.length(3);
              done(err);
            });
        });
        it('checks for duplicate emoticons', done => {
          request.post('/messages')
            .send({message: '(megusta) (coffee) (omg) (megusta) (omg)'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.emoticons).to.have.length(5);
              done(err);
            });
        });
        it('checks for emoticons with alphanumeric characters', done => {
          request.post('/messages')
            .send({message: '(megu21sta) (coffee) (om22g) (megusta1)'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.emoticons).to.have.length(4);
              done(err);
            });
        });
        it('checks for emoticons & ignores spaces', done => {
          request.post('/messages')
            .send({message: '(megu21sta) (cof fee) (om2 2g) (megu  sta1)'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.emoticons).to.have.length(1);
              done(err);
            });
        });
        it('checks for emoticons & ignores non-english & unicode characters', done => {
          request.post('/messages')
            .send({message: '(megu21sta) (Награды) (sa\u00F8) (coffee)'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.emoticons).to.have.length(2);
              done(err);
            });
        });
        it('checks for emoticons in nested paranthesis for innermost match', done => {
          request.post('/messages')
            .send({message: '(sam) (sam) (sr78ini) (sr78ini90) (Награды) (sa\u00F8) (sa jobs) (sam) (((jobs1)) (sa(jobs)sa)) (sa((sa(ko3v)sa)) (sa((sa(eo!!(#3v)sa))'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.emoticons).to.have.length(8);
              done(err);
            });
        });
      });

      describe('Test --Links--', () => {
        it('checks for links', done => {
          request.post('/messages')
            .send({message: 'Olympics are starting soon; http://www.nbcolympics.com Live scores also on google.com'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.links).to.have.length(2);
              done(err);
            });
        });
      });

      describe('Test --All--', () => {
        it('checks for mentions & emoticons', done => {
          request.post('/messages')
            .send({message: '@bob @john (success) such a cool feature'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.mentions).to.have.length(2);
              expect(res.body.emoticons).to.have.length(1);
              done(err);
            });
        });
        it('checks for mentions & links', done => {
          request.post('/messages')
            .send({message: '@bob @john such a cool feature; https://twitter.com/jdorfman/status/430511497475670016'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.mentions).to.have.length(2);
              expect(res.body.links).to.have.length(1);
              done(err);
            });
        });
        it('checks for emoticons & links', done => {
          request.post('/messages')
            .send({message: '(howl) (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016'})
            .expect(200)
            .end((err, res) => {
              expect(res.body.emoticons).to.have.length(2);
              expect(res.body.links).to.have.length(1);
              done(err);
            });
        });
        it('checks for mentions, emoticons & links', done => {
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
    });

    describe('status 204', () => {
      it('checks for message with no parsable content', done => {
        request.post('/messages')
          .send({message: 'This is just plain content.'})
          .expect(204)
          .end((err, res) => done(err));
      });
    });

    describe('status 400', () => {
      it('throws error when messsage is empty', done => {
        request.post('/messages')
          .send({message: '  '})
          .expect(400)
          .end((err, res) => done(err));
      });
    });

  });

});
