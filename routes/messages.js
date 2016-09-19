import _ from 'lodash';
import validator from 'validator';
import { getUrlInfo } from '../modules/urlinfo';
import { messageParse } from '../controllers/messages';

module.exports = app => {

  // OPTION 1
  // using controller and helper modules
  app.route('/messages')
    .post(messageParse);

  // OPTION 2
  // using multiple middlewares

};
