import _ from 'lodash';
import { getMentionPattern } from '../patterns/mentions';

export function getMention(token) {
  let mention;
  if (_.startsWith(token, '@')) {
    mention = token
      .substring(1)
      .split(getMentionPattern())[0];
    if (mention.length) {
      return mention;
    }
    return false;
  }
  return false;
}
