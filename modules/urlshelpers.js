export function mapReduceUniqueUrls(urls) {
  let links = [];
  let linksMap = [];
  let scheme;

  urls.forEach(function(link){
    scheme = null;
    if (link.indexOf('http://')!==-1) scheme = 'http://';
    if (link.indexOf('https://')!==-1) scheme = 'https://';
    if (!scheme) scheme = 'http://';
    link = link.replace(/(^http:\/\/|^https:\/\/)/,'');
    link = link.replace(/(^www.)/,'');
    if ((linksMap[link] && scheme==='https://')
      || (!linksMap[link])) {
      linksMap[link] = scheme;
    }
  });
  // linksMap: unique links map
  // example format below
  // [
  //   'twitter.com/ga': 'http://',
  //   'tw.cc': 'http://',
  //   'twitter.com/jdorfman/status/430511497475670016': 'https://',
  //   'bankofamerica.com': 'https://',
  //   'google.com': 'https://'
  // ]

  Object.keys(linksMap).forEach(function(key){
    links.push(linksMap[key]+key);
  });

  return links;
}
