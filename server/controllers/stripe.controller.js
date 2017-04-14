import config from '../config';
const Stripe = require('stripe')(config.stripeSecretKey);


export function addCharge(req, res) {
  Stripe.customers.create({
    source: req.body.chargeTokenId,
    email: req.body.email,
  }).then(
    (customer) => {
      Stripe.charges.create({
        amount: req.body.amount,
        currency: 'cad',
        description: 'Donation',
        customer: customer.id,
      }, (err) => {
        if (err) {
          res.status(err.statusCode).end();
        } else {
          res.status(200).end();
        }
      });
    },

    (err) => {
      res.status(err.code).end();
    }
  );
}

export function addMonthlyCharge(req, res) {

  var randomNumber = Math.floor((Math.random() * 1000000000) + 1);

  var identifier = req.body.lname ? req.body.lname + '-monthly-donation ' + randomNumber : req.body.email + '-monthly-donation-' + randomNumber;

  Stripe.plans.create({
    amount: req.body.amount,
    currency: 'cad',
    interval: 'month',
    name: identifier,
    id: identifier
  }).then((plan) => {
    return Stripe.customers.create({
      source: req.body.chargeTokenId,
      email: req.body.email,
    });
  }).then((customer) => {
    console.log(customer);
    Stripe.subscriptions.create({
      customer: customer.id,
      plan: identifier
    }, (err, succ) => {
      if (err) {
        console.log(err)
        res.status(err.statusCode).end()
      } else {
        res.status(200).end();
      }
    })
  }).catch((err) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  });
}
