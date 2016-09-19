import _ from 'lodash';
import validator from 'validator';
import { getUrlInfo } from '../modules/urlinfo';

module.exports = app => {

  app.route('/messages')
    .post((req, res) => {
      let mentions = [];
      let emoticons = [];
      let links = [];
      let linkPromises = [];
      let parsedLinks = [];
      let lenToken;

      const incomingMessage = req.body.message;
      let splitupMessage = incomingMessage.split(' ');

      splitupMessage.forEach((token) => {
        if (_.startsWith(token, '@')) {
          mentions.push(token.substring(1));
        }
        if (_.startsWith(token, '(') && _.endsWith(token, ')')) {
          lenToken = token.length;
          emoticons.push(token.substring(1,lenToken-1));
        }
        if (validator.isURL(token)){
          links.push(token);
        }
      });

      console.log('mentions = ', mentions);
      console.log('emoticons = ', emoticons);
      console.log('links = ', links);

      links.forEach(function(link){
        linkPromises.push(getUrlInfo(link));
      });

      Promise.all(linkPromises).then(function(linkArr){
        linkArr.forEach(function(link) {
          if (link.errno || link.code) {
            console.log('returned promise error = ', link.host || link.hostname);
          } else {
            console.log('returned promise info = ',
              _.trim(link.title), link.url);
            parsedLinks.push({
              'title': _.trim(link.title) || link.url,
              'url': link.url
            });
          }
        });
        res.status(200).json({
          'mentions': mentions,
          'emoticons': emoticons,
          'links': parsedLinks
        });
      })
      // TODO: need to handle this gracefully
      .catch(function(error) {
        console.log('Other errors = ', error);
      });

    });

};
