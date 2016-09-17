module.exports = app => {
  if (process.env.NODE_ENV !== 'test') {
    app.db.sequelize.sync().done(() => {
      app.listen(app.get('port'), () => {
        console.log(`savantory-books microservice - port ${app.get('port')}`);
      });
    });
  } else {
    app.db.sequelize.sync().done(() => {
      app.listen(app.get('port'), () => {
        // nothing
      });
    });
  }
};
