import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import logger from 'morgan';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { middleWare, middleWareConnections } from './middleware/sse';



// Initialize the Express App
const app = new Express();

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true }
}));

app.use(middleWare);

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
  app.use(logger('dev'));
}

// React And Redux Setup
import { configureStore } from '../shared/redux/store/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

// Import required modules
import getRoutes from '../shared/routes';
import { fetchComponentData } from './util/fetchData';
// import posts from './routes/post.routes';
import api from './routes/api.routes';
import auth from './routes/auth.routes';
import dummyData from './dummyData';
import serverConfig from './config';
import passport from './passport';

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.log(serverConfig.mongoURL);

    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }


  // feed some dummy data in DB.
  dummyData();
});



// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../static')));
app.use(passport.initialize());
app.use((req, res, next) => {
  // console.log('token');
  // console.log(req.session);
  next();
});
app.use('/api', api);
app.use('/auth', auth);

// Set up stream

app.get('/stream', (req, res) => {
  res.sseSetup();
  middleWareConnections.push(res);
});

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const cssPath = 'css/app.css';
  const cssVendorPath = 'vendor/css';
  const jsVendorPath = 'vendor/js';
  return `
    <!doctype html>
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:og="http://ogp.me/ns#"
      xmlns:fb="https://www.facebook.com/2008/fbml"
    >
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="og:type" content="website">
        <meta property="og:image" content="http://s32.postimg.org/lctx7fjz9/luke_poster_kwy.png">
        <meta property="og:description" content="A Cancer Foundation">
        <title>Kids Without Yachts</title>
        <link rel="stylesheet" href=${cssPath} />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
        <link rel="stylesheet" href=${cssVendorPath}/animate.css />
        <link rel="stylesheet" href=${cssVendorPath}/bootstrap.min.css />
        <link rel="stylesheet" href=${cssVendorPath}/team.css />
        <link rel="stylesheet" href=${cssVendorPath}/full-width-pics.css />
        <link rel="stylesheet" href=${cssVendorPath}/full-screen-image.css />
        <link rel="stylesheet" href="css/bootstrap_overrides.css" />
        <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Lato:400,300,700" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
        <link rel="shortcut icon" href="/img/favicon.ico" type="image/x-icon">
        <link rel="icon" href="/img/favicon.ico" type="image/x-icon">
        <!-- Facebook Pixel Code -->
        <script>
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '175684682930900'); // Insert your pixel ID here.
          fbq('track', 'PageView');
          </script>
          <noscript><img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=175684682930900&ev=PageView&noscript=1"/>
          </noscript>
        <!-- DO NOT MODIFY -->
        <!-- End Facebook Pixel Code -->
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-92238984-1', 'auto');
          ga('send', 'pageview');

        </script>
      </head>
      <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top" class="animated fadeIn">
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>

        <script src="/dist/bundle.js"></script>
        <script src="${jsVendorPath}/jquery.min.js"></script>
        <script src="${jsVendorPath}/jquery.easing.min.js"></script>
        <script src="${jsVendorPath}/bootstrap.min.js"></script>
        <script src="${jsVendorPath}/grayscale.js"></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {

  const initialState = {
    post: { posts: [], post: {} },
    auth: { isAuthenticated: false, isFetching: false }
  };

  const store = configureStore(initialState);

  match({ routes: getRoutes(store, req), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();

        res.status(200).end(renderFullPage(initialView, finalState));
      });
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
