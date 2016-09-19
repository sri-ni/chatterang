import _ from 'lodash';

export function getUrlTitle(link) {
  let title;
  title = _.trim(link.title) ||
    _.trimStart(link.url, 'http://') ||
    _.trimStart(link.url, 'https://');
  title = _.trimEnd(title, '/');
  return title;
}
