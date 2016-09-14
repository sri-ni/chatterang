module.exports = app => {
  app.listen(app.get('port'), () => {
    console.log(`savantory-books microservice - port ${app.get('port')}`);
  });
};
