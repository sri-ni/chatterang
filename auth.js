import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

module.exports = app => {
  const Clients = app.db.models.Clients;
  const cfg = app.libs.config;
  const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  };
  const strategy = new Strategy(params, (payload, done) => {
    Clients.findById(payload.id)
      .then(client => {
        if (client) {
          return done(null, {
            id: client.id,
            name: client.name
          })
        }
        return done(null, false);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', cfg.jwtSession);
    }
  }
}
