# karat-challenge
Simulates an AWS cloud application to handle stripe events as well as implements the spec outlined in [this notion doc](https://www.notion.so/Karat-Coding-Challenge-Card-Dashboard-0206a928d562482aa5a2e1796a39c726#aa203a9a2de34fc09c9d027a2824282a). 

### Table of Contents
- [Usage](#usage)
  - [Turn on Web-App](#turn-on-web-app)
  - [Turn on Serverless Event System](#turn-on-serverless-event-system)
- [Architecture](#architecture)
  - [Architecture Diagram](#architecture)
  - Stripe Event Handling
  - Application Backend
  - Frontend Web App
- [Tech Stack](#tech-stack)
  - Tools
  - Cloud
  - Backend
  - Frontend

### Prereqs
1. install `docker` & `docker-compose`
2. install [`awscli`](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html)
``` bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

### Usage
This project is setup as a mono-repo and includes all the components necessary to run a full-stack application. 

Start by running `yarn install`
##### Turn on Web-App
1. Run `docker-compose up -d app` to enable the frotnend app, backend (hasura) and database (postgres).
2. Navigate to localhost:3000 
3. Login using credentials arjuna.r.iyer@gmail.com, `password` or create a new account (there will not be data in this account without following the event handler setup below)

##### Turn on Serverless Event System
1.  Run `docker-compose up -d localstack`. Ensure that this step has completed by checking `localhost:4566/health` and verifying that all services are 'running'. 
2.  Run `yarn run stripe-events`. Ensure this step is completed before moving on to the next.
3. Run `bash setup-sls-event-handler.sh` (make sure you are in a bash terminal and use the dot syntax as written in the command above)`
4. Copy the webhook signing secret
5. Open a new terminal at the root of the directory and run `bash store-signing-secret.sh <webhook-signing-secret>`
6. Go to the stripe dashboard and add authorizations. Note that closing the stripe event terminal will terminate the connection and you will need to run steps 3 through 5 again

### Architecture
The application is broken into 3 parts: 
1. A serverless cloud system responsible for reliably and scalibly handling stripe events. 
2. A containerized backend offering the primary API to the webapp
3. The frontend web application
#### Diagram
![](/karat-local-arch.png)

#### Stripe Event Handling
#### Application Backend 
#### Frontend Next App

### Tech Stack
The project is a fullstack javascript app with a SQL d
* Tools
  - Docker
  - Serverless
* Cloud
  - localstack & serverless framework
  - AWS Lambda -
  - AWS Api-Gateway - *Managed api gateway*
  - AWS Eventbridge - *Cloud event bus*
* Backend
  - Hasura - *BaaS application used to abstract SQL database into a GraphQL server*
  - Postgres - *SQL Database*
* Frontend
  - React/Next.js - *Frontend web framework*
  - Apollo Client 3 - *GraphQL client*
  - Emotion - *styled components library*
