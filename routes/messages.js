import _ from 'lodash';
import validator from 'validator';
import { messageParse } from '../controllers/messages';
import { checkSplit } from '../middlewares/messages';
import { parseMentions } from '../middlewares/mentions';
import { parseEmoticons } from '../middlewares/emoticons';
import { parseLinks } from '../middlewares/links';

module.exports = app => {

  // OPTION 1
  // using controller and helper modules
  // app.route('/messages')
  //   .post(messageParse);

  // OPTION 2
  // using multiple middlewares
  app.route('/messages')
    .post(
      checkSplit,
      parseMentions,
      parseEmoticons,
      parseLinks,
      (req, res) => {
        let resultObj = _.assign(
          {},
          (req.mentions.length)? {'mentions': req.mentions} : {},
          (req.emoticons.length)? {'emoticons': req.emoticons} : {},
          (req.parsedLinks.length)? {'links': req.parsedLinks} : {}
        );
        res.status(200).json(resultObj);
      }
    );

};
