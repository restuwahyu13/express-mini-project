require('dotenv').config({ path: './.env' });
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const app = express();
const { DefaultRoutes } = require('./routes/defaults.route');
const { AutoExpired } = require('./helpers/autoExpire');

// hadnling protection from csrf or xss
app.use(helmet({

    contentSecurityPolicy: {

        directives: {

            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
        }
    },
    frameguard: { action: 'deny' },
    xssFilter: { setOnOldIE: true, reportUri: 'mode=block' },
    hidePoweredBy: { setTo: 'Go v1.13' },
    expectCt: { enforce: true, maxAge: 86400 },
    referrerPolicy: { policy: 'no-referrer' },
    noCache: true,
    noSniff: true,
    ieNoOpen: true,
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
    dnsPrefetchControl: { allow: false }

}));
// pasring data from body with www/urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// handling json data
app.use(bodyParser.json());
// logger
app.use(logger('dev'));
//init global promise
mongoose.Promise = global.Promise;
//init routes default
new DefaultRoutes(app).Routes();
//init auto expired
AutoExpired.autoExpired();

module.exports = app;