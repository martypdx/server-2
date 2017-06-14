/*eslint-disable*/
require('dotenv').config();
const plaid = require('plaid');
const envvar = require('envvar');

const PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
const PLAID_SECRET = envvar.string('PLAID_SECRET');
const PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
const PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');

// Initalize Plaid's log-in and clients
const plaidClient = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);


// //TODO: Test this and make sure that all Promises are resolving
// router.post('/item', (request, response) => {
//   // Pull the Item - this includes information about available products,
//   // billed products, webhook information, and more.
//   return plaidClient.getItem(ACCESS_TOKEN)
//     .then(itemResponse => {
//       // Also pull information about the institution
//       console.log('Item: ', itemResponse.item);
//       return plaidClient.getInstitutionById(itemResponse.item.institution_id)
//         .then(instRes => {
//           response.json({
//             item: itemResponse.item,
//             institution: instRes.institution,
//           });
//         }).catch(error => {
//           console.log('Error: Could not retrieve item information ', JSON.stringify(error));
//           return response.json({
//             error: error
//           });
//         });
//     });
// });

// router.post('/transactions', (request, response) => {
//   // Pull transactions for the Item for the last 30 days
//   let startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
//   let endDate = moment().format('YYYY-MM-DD');
//   let ACCESS_TOKEN = req.body;
//   return plaidClient.getTransactions(ACCESS_TOKEN, startDate, endDate, {
//     count: 250,
//     offset: 0,
//   })
//     .then(transactionsResponse => {
//       console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
//       response.send(transactionsResponse);
//     })
//     .catch(error => {
//       console.log(JSON.stringify(error));
//       return response.json({
//         error: error
//       });
//     });
// });

module.exports = plaidClient;