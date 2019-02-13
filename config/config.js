'use strict';

const path = require('path');

const envUtils = require('../app/utils/env');
const getEnvVariable = envUtils.getEnvVariable;
const getEnvVariableArray = envUtils.getEnvVariableArray;

const publicHtmlDir = getEnvVariable('PUBLIC_HTML_DIR', 'public_html');
const nginxConfigsDir = getEnvVariable('NGINX_CONFIGS_DIR', 'sites_enabled');

const config = {
    serverPort: +getEnvVariable('SERVER_PORT', 3000),

    jwtKey: getEnvVariable('JWT_KEY', 'd7e5a85d-b351-4b2f-aa89-f628a00c14e1'),

    dbHost: getEnvVariable('DB_HOST', 'localhost'),
    dbPort: +getEnvVariable('DB_PORT', '27017'),
    dbName: getEnvVariable('DB_NAME', 'ptah'),
    dbUser: getEnvVariable('DB_USER', 'ptah'),
    dbPass: getEnvVariable('DB_PASS', 'ptah'),
    dbCollectionName: getEnvVariable('DB_COLLECTION_NAME', 'ptah'),
    dbAuthMethod: getEnvVariable('DB_AUTH_METHOD', 'SCRAM-SHA-256'),

    routesPrefix: getEnvVariable('ROUTES_PREFIX', '/api/v1'),

    authNamespace: '/auth',
    landingsNamespace: '/landings',

    publicHtmlDir: path.resolve(publicHtmlDir),
    nginxConfigsDir: path.resolve(nginxConfigsDir),
    nginxConfigTemplatePath: path.resolve('templates/nginx.conf.template'),

    sentryDsn: getEnvVariable('SENTRY_DSN', 'https://f1fe9d5210df4b82aabe49839b197763@sentry.tst.protocol.one/4'),

    publicHost:  getEnvVariable('PUBLIC_HOST', 'http://127.0.0.1:3000'),

    oauthClientId: getEnvVariable('OAUTH_CLIENT_ID', '5c6410bc68add44398670920'),
    oauthClientSecret: getEnvVariable('OAUTH_CLIENT_SECRET', 'tmSanMbHwj6NYfrtwO8MBscZf3ClfbLneIbaLkENDz9L6S4Vtk1jY6GVX6luVwhN'),
    oauthScope: getEnvVariableArray('OAUTH_CLIENT_SCOPE', 'openid,offline'),
    oauthAuthorizeUrl: getEnvVariable('OAUTH_AUTHORIZE_URL', 'http://192.168.99.100:4444/oauth2/auth'),
    oauthTokenUrl: getEnvVariable('OAUTH_TOKEN_URL', 'http://192.168.99.100:4444/oauth2/token'),
    oauthPostmessageHtmlTemplatePath: path.resolve('templates/oauth.postmessage.html.template'),
};

module.exports = config;
