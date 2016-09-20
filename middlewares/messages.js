import _ from 'lodash';

export function checkSplit(req, res, next) {
  const incomingMessage = req.body.message;
  if (!_.trim(incomingMessage)) {
    res.sendStatus(400);
  } else {
    req.splitupMessage = incomingMessage.split(' ');
    next();
  }
}
