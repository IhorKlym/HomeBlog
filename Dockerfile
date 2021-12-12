FROM node:10.20.1-alpine as Builder

RUN apk add --update --no-cache \
      git \
      openssh \
      python2 \
      make \
      g++

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

ARG API_SERVER_URL
ARG LANDING_MODE_ENABLED
ARG GOOGLE_APP_ID
ARG GOOGLE_APP_KEY
ARG UNREAD_NOTIFICATIONS_FETCH_INTERVAL
ARG UNREAD_MESSAGES_FETCH_INTERVAL

ENV NODE_ENV=production

# App specific ENVs
ENV API_SERVER_URL=$API_SERVER_URL
ENV LANDING_MODE_ENABLED=$LANDING_MODE_ENABLED
ENV UNREAD_NOTIFICATIONS_FETCH_INTERVAL=$UNREAD_NOTIFICATIONS_FETCH_INTERVAL
ENV UNREAD_MESSAGES_FETCH_INTERVAL=$UNREAD_MESSAGES_FETCH_INTERVAL

# Third-party ENVs
ENV GOOGLE_APP_ID=$GOOGLE_APP_ID
ENV GOOGLE_APP_KEY=$GOOGLE_APP_KEY

COPY .babelrc .eslintignore .eslintrc .node-version webpack.config.js /app/
ADD config ./config
ADD src ./src

RUN ./node_modules/.bin/webpack --config webpack.config.js --display-error-details

ADD . .

FROM nginx:1.16.1 as Final

COPY --from=Builder /app/dist/ /app
COPY .htpasswd /etc/nginx/.htpasswd
COPY nginx.conf /etc/nginx/nginx.conf
