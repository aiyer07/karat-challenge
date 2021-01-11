ARG NODE_ENV=development

FROM node:12.14.1-alpine as ENV
WORKDIR /usr/app
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
# update linux apk 
RUN apk update && apk upgrade
# update linux apk
RUN apk add --no-cache bash openssl ca-certificates
# download and make aws-env accessible for securely installing env variables
RUN wget https://github.com/Droplr/aws-env/raw/master/bin/aws-env-linux-amd64 -O /bin/aws-env && \
  chmod +x /bin/aws-env

FROM node:12.14.1-alpine  as BUILD-DEPENDENCIES
WORKDIR /usr/app
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
#Copy top level dependencies
COPY ./package.json /usr/app
#Copy service package.json
COPY ./ui/react-dashboard/package.json /usr/app/ui/react-dashboard/package.json
#Install and hoist all node_modules
RUN yarn install

FROM node:12.14.1-alpine  as BUILD-SERVICE
WORKDIR /usr/app
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
#Copy top level dependencies
COPY ./package.json /usr/app

#Copy node modules from dependencies stage
COPY --from=BUILD-DEPENDENCIES /usr/app/node_modules /usr/app/node_modules

#Copy service
COPY ./ui/react-dashboard /usr/app/ui/react-dashboard

#Install and hoist all node_modules
RUN yarn workspaces run build

FROM node:12.14.1-alpine  as RUN
WORKDIR /usr/app
EXPOSE 80
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
COPY ./lerna.json /usr/app
# install lerna
RUN npm i -g lerna
COPY --from=ENV /bin/aws-env /bin/aws-env
COPY --from=ENV /etc /etc
COPY --from=BUILD-SERVICE /usr/app /usr/app


CMD ["yarn", "run", "dashboard"]