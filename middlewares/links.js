import _ from 'lodash';
import validator from 'validator';
import { getUrlInfo } from '../modules/urlinfo';
import { getUrlTitle } from '../modules/urltitle';

export function parseLinks(req, res, next) {
  let links = [];
  let linkPromises = [];
  req.parsedLinks = [];

  req.splitupMessage.forEach((token) => {
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
        req.parsedLinks.push({
          'url': link.url,
          'title': getUrlTitle(link)
        });
      }
    });
    next();
  });
}
