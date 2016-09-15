module.exports = app => {
  app.db.sequelize.sync().done(() => {
    app.listen(app.get('port'), () => {
      console.log(`savantory-books microservice - port ${app.get('port')}`);
    });
  });
};
