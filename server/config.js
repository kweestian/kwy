let config;

if (process.env.NODE_ENV === 'production') {
  config = {
    mongoURL: process.env.MONGO_URL_PROD,
    port: process.env.PORT || 3000,
    stripeSecretKey: process.env.STRIPE_PROD_SECRET_KEY,
    stripePubKey: process.env.STRIPE_PROD_PUBLIC_KEY,
  };
} else if (process.env.NODE_ENV === 'development') {
  config = {
    mongoURL: process.env.MONGO_URL_DEV,
    port: process.env.PORT || 3000,
    stripeSecretKey: process.env.STRIPE_TEST_SECRET_KEY,
    stripePubKey: process.env.STRIPE_TEST_PUBLIC_KEY,
  };
} else {
  config = {
    mongoURL: process.env.MONGO_URL_TEST,
    port: process.env.PORT || 3000,
    stripeSecretKey: process.env.STRIPE_TEST_SECRET_KEY,
    stripePubKey: process.env.STRIPE_TEST_PUBLIC_KEY,
  };
}


export default config;
