FROM node:11-alpine

RUN apk update && apk add git

WORKDIR /application

ENV NODE_ENV=production \
    AUTH1_CACHE_MAX_AGE="300000" \
    AUTH1_CLIENT_ID="" \
    AUTH1_INTROSPECTION_URL="" \
    DB_AUTH_METHOD="SCRAM-SHA-256" \
    DB_COLLECTION_NAME="ptah" \
    DB_HOST="" \
    DB_NAME="ptah" \
    DB_PASS="" \
    DB_PORT=27017 \
    DB_USER="" \
    MAILCHIMP_METADATA_URL="https://login.mailchimp.com/oauth2/metadata" \
    MAILCHIMP_MAILLISTS_PATH="/3.0/lists" \
    NGINX_CONFIGS_DIR="/etc/nginx/landings/conf.d" \
    PUBLIC_HTML_DIR="/etc/nginx/landings/public/landings" \
    REDIS_HOST="" \
    REDIS_PORT="6379" \
    ROUTES_PREFIX="/api/v1" \
    SENTRY_DSN="" \
    SERVER_PORT=3000


COPY package.json /application

RUN npm install && npm prune --production

COPY . /application

RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]

