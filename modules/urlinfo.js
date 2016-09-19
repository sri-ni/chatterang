import MetaInspector from 'node-metainspector';

export function getUrlInfo(url) {
  return new Promise(function(resolve, reject) {
    let client = new MetaInspector(url, {
      timeout: 5000
    });

    client.on('fetch', function(){
      client.url = client.url || url;
      resolve(client);
    });

    client.on('error', function(err){
      resolve(err);
    });

    client.fetch();
  });
}
