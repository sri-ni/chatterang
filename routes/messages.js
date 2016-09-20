import _ from 'lodash';
import validator from 'validator';
import { messageParse } from '../controllers/messages';
import { checkSplit } from '../middlewares/messages';
import { parseMentions } from '../middlewares/mentions';
import { parseEmoticons } from '../middlewares/emoticons';
import { parseLinks } from '../middlewares/links';

module.exports = app => {

  // OPTION 1
  // using multiple middlewares
  app.route('/messages')
    /**
     * @api {post} /messages Parse Message
     * @apiGroup Messages
     * @apiVersion 0.0.1
     * @apiParam {String} message Message Content
     * @apiParamExample {json} Input
     *    {
     *      "message": "@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016"
     *    }
     * @apiSuccess {String[]} mentions Mentions list
     * @apiSuccess {String[]} emoticons Emoticons list
     * @apiSuccess {Object[]} links Links object list
     * @apiSuccess {String} links.url URL of link
     * @apiSuccess {String} links.title Title of link
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "mentions": [
     *        "bob",
     *        "john"
     *      ],
     *      "emoticons": [
     *        "success"
     *      ],
     *      "links": [
     *        {
     *          "url": "https://twitter.com/jdorfman/status/430511497475670016",
     *          "title": "Justin Dorfman on Twitter: &quot;nice @littlebigdetail from @HipChat (shows hex colors when pasted in chat). http://t.co/7cI6Gjy5pq&quot;"
     *        }
     *      ]
     *    }
     * @apiErrorExample {json} Messages error
     *    HTTP/1.1 400 Bad Request
     */
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
        if (_.isEmpty(resultObj)) {
          res.sendStatus(204);
        } else {
          res.status(200).json(resultObj);
        }
      }
    );

    // OPTION 2
    // using controller and helper modules
    // app.route('/messages')
    //   .post(messageParse);

};
