import https from 'https';
import fs from 'fs';

module.exports = app => {
  if (process.env.NODE_ENV !== 'test') {
    const credentials = {
      key: fs.readFileSync('chatterang.key', 'utf8'),
      cert: fs.readFileSync('chatterang.cert', 'utf8')
    };
    // app.db.sequelize.sync().done(() => {
      https.createServer(credentials, app)
        .listen(app.get('port'), () => {
          console.log(`chatterang service - port ${app.get('port')}`);
        });
    // });
  } else {
    // app.db.sequelize.sync().done(() => {
      app.listen(app.get('port'), () => {
        // nothing
      });
    // });
  }
};
