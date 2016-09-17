import bodyParser from 'body-parser';
import compression from "compression";
import cors from 'cors';
import express from 'express';
import logger from './logger';
import morgan from 'morgan';

module.exports = app => {
  app.set('port', 3000);
  app.set('json spaces', 2);
  app.use(morgan('common', {
    stream: {
      write: (message) => {
        logger.info(message);
      }
    }
  }));
  app.use(cors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    if (req && req.body && req.body.id) {
      delete req.body.id;
    }
    next();
  });
  app.use(express.static('public'));
};
