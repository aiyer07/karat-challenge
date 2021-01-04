ARG NODE_ENV=development

FROM hasura/graphql-engine:v1.3.3
WORKDIR /usr/src/app
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
COPY . .
EXPOSE 80

RUN wget https://github.com/Droplr/aws-env/raw/master/bin/aws-env-linux-amd64 -O /bin/aws-env && \
  chmod +x /bin/aws-env

ENTRYPOINT ["/bin/sh", "-c", "/usr/src/app/entrypoint.sh"]
