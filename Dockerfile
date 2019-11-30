FROM node:12-alpine

ARG ENVIRONMENT

RUN apk update && \
    apk add --no-cache --virtual .build-deps make gcc g++ clang python git

WORKDIR /app

RUN git clone https://github.com/emscripten-core/emsdk.git packages/compositions/emsdk && \
    cd packages/compositions/emsdk && \
    ./emsdk install latest && \
    ./emsdk activate latest && \
    sh ./emsdk_env.sh

COPY ./packages/compositions/package.json ./packages/compositions/
COPY ./packages/compositions/build.sh ./packages/compositions/
COPY ./packages/types/package.json ./packages/types/
COPY ./packages/client/package.json ./packages/client/
COPY ./packages/server/package.json ./packages/server/
COPY package.json package-lock.json lerna.json ./

RUN npm install && \
    npx lerna bootstrap

COPY ./packages /app/packages

RUN if [ "${ENVIRONMENT}" != "development" ] ; then \
        npx lerna run build && \
        npm run prune-production l \
    else \
        npx lerna run build:cpp --scope @compositeur/compositions ; \
    fi && \
    apk del .build-deps

ENV NODE_ENV ${ENVIRONMENT}

CMD ["npm", "run", "start:prod"]

EXPOSE 4000
