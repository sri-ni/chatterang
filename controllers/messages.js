import _ from 'lodash';
import validator from 'validator';
import { getUrlInfo } from '../modules/urlinfo';
import { getMention } from '../modules/mention';
import { getEmoticon } from '../modules/emoticon';
import { getUrlTitle } from '../modules/urltitle';

export function messageParse(req, res) {
  const incomingMessage = req.body.message;
  let emoticon;
  let emoticons = [];
  let lenToken;
  let links = [];
  let linkPromises = [];
  let mention;
  let mentions = [];
  let parsedLinks = [];
  let resultObj;
  let splitupMessage;
  let title;

  if (!_.trim(incomingMessage)) {
    res.sendStatus(400);
  }

  splitupMessage = incomingMessage.split(' ');

  // TODO: handling repeated mentions, emoticons, links
  splitupMessage.forEach((token) => {
    if (mention=getMention(token)) {
      mentions.push(mention);
    }
    if (emoticon=getEmoticon(token)) {
      emoticons.push(emoticon);
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
        parsedLinks.push({
          'url': link.url,
          'title': getUrlTitle(link)
        });
      }
    });
    resultObj = _.assign(
      {},
      (mentions.length)? {'mentions': mentions} : {},
      (emoticons.length)? {'emoticons': emoticons} : {},
      (parsedLinks.length)? {'links': parsedLinks} : {}
    );
    res.status(200).json(resultObj);
  });
}
