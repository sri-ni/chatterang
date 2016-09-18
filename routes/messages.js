import _ from 'lodash';
import MetaInspector from 'node-metainspector';

module.exports = app => {

  app.route('/messages')
    .post((req, res) => {
      let mentions = [];
      let emoticons = [];
      let lenToken;

      const incomingMessage = req.body.message;
      let splitupMessage = incomingMessage.split(' ');

      splitupMessage.forEach((token) => {
        if (_.startsWith(token, '@')) {
          mentions.push(token.substring(1));
        }
        if (_.startsWith(token, '(') && _.endsWith(token, ')')) {
          lenToken = token.length;
          emoticons.push(token.substring(1,lenToken-1));
        }
      });

      console.log('mentions = ', mentions);
      console.log('emoticons = ', emoticons);

      res.status(200).json({
        'mentions': mentions,
        'emoticons': emoticons
      });

      // TODO: find if token has some semblance of link

      //   if starts with http or https or ends with some dot notation,


      //     make request call, get title
      //     if no title just use the text itself as title
      //     make the link with http if not https explicitly
      // const url = req.body.url;
      // console.log('\nreq.body.url = ', url);
      //
      // let client = new MetaInspector(url, {
      //   timeout: 5000
      // });
      //
      // client.on('fetch', function(){
      //   console.log('Title: ' + client.title);
      //   let title = client.title || url;
      //   let resUrl = client.url || 'http://'+url;
      //   res.status(200).json({
      //     'title': title,
      //     'url': resUrl
      //   });
      // });
      //
      // client.on('error', function(err){
      //   console.log(err);
      //   res.status(500).json({msg: err.code});
      // });
      //
      // client.fetch();
    });

};
