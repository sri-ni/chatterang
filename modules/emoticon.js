import _ from 'lodash';

export function getEmoticon(token) {
  let closeIndex,
    emoticon,
    emoticonArr = [],
    openIndex;

  if (_.startsWith(token, '(') && _.endsWith(token, ')')) {
    emoticon = _.trim(token, '()');
    emoticonArr = emoticon.split('');
    
    openIndex = _.findLastIndex(emoticonArr, o => o==='(');
    closeIndex = _.findIndex(emoticonArr, o => o===')');
    if (openIndex+1 < closeIndex) {
      emoticon = emoticonArr.slice(openIndex+1, closeIndex).join('');
    }

    if (!emoticon.search(/^[a-zA-Z0-9]+$/) && emoticon.length <= 15) {
      return emoticon;
    }
    return false;
  }
  return false;
}
