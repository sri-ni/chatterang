import _ from 'lodash';

export function getEmoticon(token) {
  let emoticon;
  if (_.startsWith(token, '(') && _.endsWith(token, ')')) {
    emoticon = _.trim(token, '()');
    if (!emoticon.search(/^[a-zA-Z0-9]+$/) && emoticon.length <= 15) {
      console.log(emoticon);
      return emoticon;
    }
    return false;
  }
  return false;
}
