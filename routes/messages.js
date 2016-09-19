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
      let mention;
      let emoticon;
      let title;

      const incomingMessage = req.body.message;
      let splitupMessage = incomingMessage.split(' ');

      // TODO: handling repeated mentions, emoticons, links
      splitupMessage.forEach((token) => {
        if (_.startsWith(token, '@')) {
          mention = token.substring(1);
          // mention = mention.replace(/[^a-zA-Z0-9]*$/g, '');
          mention = mention.split(/[^A-Za-z0-9]/)[0];
          // if (!mention.search(/^[a-zA-Z0-9]+$/)) {
          if (mention.length) {
            mentions.push(mention);
          }
        }
        if (_.startsWith(token, '(') && _.endsWith(token, ')')) {
          emoticon = _.trim(token, '()');
          if (!emoticon.search(/^[a-zA-Z0-9]+$/) && emoticon.length <= 15) {
            emoticons.push(emoticon);
          }
        }
        if (validator.isURL(token)){
          links.push(token);
        }
      });

      links.forEach(function(link){
        linkPromises.push(getUrlInfo(link));
      });

      Promise.all(linkPromises).then(function(linkArr){
        linkArr.forEach(function(link) {
          if (link.errno || link.code) {
            console.log('returned promise error = ', link);
          } else {
            title = _.trim(link.title) ||
              _.trimStart(link.url, 'http://') ||
              _.trimStart(link.title, 'https://');
            title = _.trimEnd(title, '/');
            parsedLinks.push({
              'url': link.url,
              'title': title
            });
          }
        });
        res.status(200).json({
          'mentions': mentions,
          'emoticons': emoticons,
          'links': parsedLinks
        });
      })
      .catch(function(error) {
        console.log('Other errors = ', error);
        parsedLinks = [];
        links.forEach(function(url) {
          url = (!url.search(/^(http:\/\/)/) ||
            !url.search(/^(https:\/\/)/))? url: 'http://'+url;
          parsedLinks.push({
            'url': url,
            'title': _.trimStart(link.title, 'http://') || _.trimStart(link.title, 'https://')
          });
        });
        res.status(200).json({
          'mentions': mentions,
          'emoticons': emoticons,
          'links': parsedLinks
        });
      });

    });

};
