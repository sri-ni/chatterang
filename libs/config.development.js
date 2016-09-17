import logger from './logger';

module.exports = {
  database: "savantorybooks",
  username: "groot",
  password: "iamgroot",
  params: {
    dialect: "mysql",
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    }
  },
  jwtSecret: "sav@nt0ry-b0oOks-@#!",
  jwtSession: {session: false}
};
