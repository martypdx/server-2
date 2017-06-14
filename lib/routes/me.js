const plaidClient = require('../plaid');
const Router = require('express').Router;
const router = Router();
const User = require('../models/user');

router
  .get('/', (req, res, next) => {
    const id = req.user.id;
    User.findById(id)
      .then(user => {
        if (!user) return res.status(404).send(`${id} is not a user`);
        else res.send(user);
      })
      .catch(next);
  })

  // Get access token and create ITEM
  .post('/accounts', (request, response, next) => {
    let public_token = request.body.public_token;
    const plaidPromise = plaidClient.exchangePublicToken(public_token)
      .then(tokenResponse => {
        return Promise.all([
          tokenResponse,
          plaidClient.getAuth(tokenResponse.access_token)
        ]);
      });
    Promise.all([
      plaidPromise,
      User.findById(request.user.id)
    ])
      .then(([[token, auth], user]) => {
        user.plaid = {
          plaid_item_id: token.item_id,
          access_token: token.access_token,
          accounts: auth.accounts,
          transactions: []
        };
        return user.save();
      })
      .then(user => {
        console.log(user);
        response.send(user.plaid.accounts);
      })
      .catch(err => {
        console.log(err);
      });
  });

module.exports = router;