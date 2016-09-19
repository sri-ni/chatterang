import _ from 'lodash';

export function getMention(token) {
  let mention;
  if (_.startsWith(token, '@')) {
    mention = token
      .substring(1)
      .split(/[^A-Za-z0-9]/)[0];
    if (mention.length) {
      return mention;
    }
    return false;
  }
  return false;
}
