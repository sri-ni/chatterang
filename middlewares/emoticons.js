import _ from 'lodash';
import { getEmoticon } from '../modules/emoticon';

export function parseEmoticons(req, res, next) {
  let emoticon;
  req.emoticons = [];

  req.splitupMessage.forEach((token) => {
    if (emoticon=getEmoticon(token)) {
      req.emoticons.push(emoticon);
    }
  });

  next();
}
