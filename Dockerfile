FROM node:13-alpine

ARG ENVIRONMENT

WORKDIR /app

COPY ./client/package.json ./client/package-lock.json ./client/
COPY ./server/package.json ./server/package-lock.json ./server/
COPY package.json package-lock.json ./

RUN npm install

COPY ./client /app/client
COPY ./server /app/server

RUN if [ "${ENVIRONMENT}" != "development" ] ; then \
        npm run build && \
        npm run prune-production l \
    fi

ENV NODE_ENV ${ENVIRONMENT}

CMD ["npm", "start"]

EXPOSE 3025
