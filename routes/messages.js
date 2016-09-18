import MetaInspector from 'node-metainspector';

module.exports = app => {

  app.route('/messages')
    .post((req, res) => {
      const url = req.body.url;
      console.log('\nreq.body.url = ', url);

      let client = new MetaInspector(url, {
        timeout: 5000
      });

      client.on('fetch', function(){
        console.log('Title: ' + client.title);
        let title = client.title || url;
        let resUrl = client.url || 'http://'+url;
        res.status(200).json({
          'title': title,
          'url': resUrl
        });
      });

      client.on('error', function(err){
        console.log(err);
        res.status(500).json({msg: err.code});
      });

      client.fetch();
    });

};
