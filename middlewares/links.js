import _ from 'lodash';
import { getUrlInfo } from '../modules/urlinfo';
import { getUrlTitle } from '../modules/urltitle';
import { mapReduceUniqueUrls } from '../modules/urlshelpers';

export function parseLinks(req, res, next) {
  let links = [];
  let linkPromises = [];
  let urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let urlRegex = new RegExp(urlExpression);

  req.parsedLinks = [];

  req.splitupMessage.forEach((token) => {
    if (token.match(urlRegex)){
      token = token.replace(/[\W]+$/,''); // remove trailing special characters
      links.push(token);
    }
  });

  if (links.length) {
    links = _.uniq(links); // first pass on uniqueness
    links = mapReduceUniqueUrls(links); // second custom pass on uniqueness

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
  else {
    next();
  }
}
