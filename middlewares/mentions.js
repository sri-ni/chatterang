import _ from 'lodash';
import { getMention } from '../modules/mention';

export function parseMentions(req, res, next) {
  let mention;
  req.mentions = [];

  req.splitupMessage.forEach((token) => {
    if (mention=getMention(token)) {
      req.mentions.push(mention);
    }
  });

  if (req.mentions.length) {
    req.mentions = _.uniq(req.mentions);
  }

  next();
}
