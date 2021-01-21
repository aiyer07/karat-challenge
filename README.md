# karat-challenge
Simulates an AWS serverless cloud application to handle stripe events as well as implements a simple web dashboard with a graphql backend 
![](/karat-local-arch.png)
### Table of Contents
- [Prereqs](#prereqs)
- [Usage](#usage)
  - [Turn on Web-App](#turn-on-web-app)
  - [Turn on Serverless Event System](#turn-on-serverless-event-system)
  - [Viewing Hasura Console](#viewing-hasura-console)
  - [Connecting to Postgres](#connecting-directly-to-the-postgres-instance)
  - [Adding New Users](#adding-new-users)
  - [Switching Users](#switching-users)
- [Architecture](#architecture)
  - [Architecture Diagram](#architecture)
  - [Tech Stack](#tech-stack)

### Prereqs
1. install `docker` & `docker-compose`
2. install [`awscli`](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html)
``` bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```
if you already have the cli installed and pointing to an existing cloud, create a new profile with `region=us-east-1` the rest of the parameters are optional.

3. install `stripe-cli`
``` bash
brew install stripe/stripe-cli/stripe
```
Then login to the test account using the following command and following the instructions that follow
``` bash
stripe login
```

4. install `yarn`
``` bash
brew install yarn
```
5. Remaining library dependencies can be acquired by running  `yarn install`
6. Run `docker network create dock-net` to create an external docker network used for all the containers

### Usage
This project is setup as a mono-repo and includes all the components necessary to run a full-stack application. There are also several users pre-seeded in the database.

#### Turn on Web-App
1. Run `docker-compose up -d dashboard` to enable the frontend app, backend (hasura) and database (postgres). This step may take a while your first time running, ensure there aren't any other similarly named images containers or overlapping ports to avoid conflicts & wrong version types.
2. Run `yarn run migrations` to structure the database
3. Run `yarn run seeds` to preseed the database
4. Navigate to localhost:3000 to view the dashboard (default set to user_id `332787f1-1814-47e1-870e-2b9be86d1533` which contains over 1000 authorizationss & transactions records)
#### Turn on Serverless Event System
1.  Run `docker-compose up -d localstack`. Ensure that this step has completed by checking `localhost:4566/health` and verifying that all services are 'running'. (remove the `-d` if you'd like to see the lambdas & serverless enviornment logs, you will need to open new terminals for the remaining steps in this case)
2.  Run `yarn run stripe-sls-system`. This will deploy all serverless components and startup the stripe event forwarding on your machine as the last step. Ensure this step is completed before moving on to the next. Do not terminate this terminal
3. Copy the webhook signing secret from the terminal above.
4. Open a new terminal at the root of the directory and run `yarn run store-stripe-signing-secret <webhook-signing-secret>`, pasting the the secret copied in step 4 to `<webhook-signing-secret>`
5. Go to the stripe dashboard and add authorizations. Note that closing the stripe event terminal will terminate the connection and you will need to run steps 3 through 5 again


![](/karat_screenshot.png)

#### Adding New Users
To add a new user you must update the `users` and `cards` table in postgres.
1. Find and copy the desired cardholder_id on stripe `ich_xxx` 
2. Add a user row to the postgres table `users` using the card_holder_id from above (ignore user_id column)
3. Find and copy a stripe `card_id` from the above cardholder_id `ic_xxx` 
4. Add a card row to the postgres table `cards` using the `card_id` and `card_holder_id` above
#### Switching Users
By default the data being viewed is of userId `332787f1-1814-47e1-870e-2b9be86d1533` which has over 1000 transactions and authorizations. In order to view different user follow these steps
1. Navigate to `./ui/react-dashboard/src/index.tsx`
2. Update line 28 to be `'x-hasura-user-id': '<new_user_id>'`
3. Save file and refresh browser (hot reload is on and code is mounted in docker volume, but it won't trigger the apollo cache)
 
 The database is preseeded with 3 users to test with:
 ```
 - 332787f1-1814-47e1-870e-2b9be86d1533 (default)
 - c642670b-327c-4c2c-85cd-e01bcefa0331
 - 139b9f47-f9f6-4a58-92d0-9b1f571a4523
 ```
#### Viewing Hasura Console
You may wish to see some of the graphql relationships & sql functions used. This console can visualize this for you and runs by default when the container is on. It can also serve as an easy way of viewing and modifying the SQL database if you do not have a client of your own
1. Ensure hasura container is running or run `docker-compose up -d hasura`
2. Navigate to `localhost:3010`
#### Connecting directly to the postgres instance
Below are the connection details for connecting your SQL client to the running postgres instance:
```
Host: localhost
Port: 5500
User: postgres
Password: *Leave blank*
Database: postgres
```

### Architecture
The application is broken into 3 parts: 
1. A serverless cloud system responsible for reliably and scalibly handling stripe events. 
2. Hasura backend offering a permissioned graphql endpoint as the primary API 
3. A react frontend web application using apollo client for graphql queries & client side caching
#### Diagram

![](/karat-local-arch.png)
#### Tech Stack

* Tools
  - lerna & yarn workspaces
  - Docker
  - Serverless
  - Localstack
* Cloud
  - AWS Lambda - *FaaS*
  - AWS Api-Gateway - *Managed api gateway*
  - AWS Eventbridge - *Cloud event bus*
* Backend
  - Hasura - *BaaS application used to abstract SQL database into a GraphQL server*
  - Postgres - *SQL Database*
* Frontend
  - React/Create React App - *Frontend web framework*
  - Apollo Client 3 - *GraphQL client*
  - Material-UI - *components library*
