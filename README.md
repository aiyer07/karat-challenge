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
1.  Run `docker-compose up -d localstack`. Ensure that this step has completed by checking `localhost:4566/health` and verifying that all services are 'running'. (remove the `-d` if you'd like to see the lambdas & serverless enviornment logs, you will need to open new terminals for the remaining steps in this case)
2.  Run `yarn run stripe-sls-sytem`. This will deploy all serverless components and startup the stripe event forwarding on your machine as the last step. Ensure this step is completed before moving on to the next. Do not terminate this terminal
3. Copy the webhook signing secret from the terminal above.
4. Open a new terminal at the root of the directory and run `yarn run store-stripe-signing-secret <webhook-signing-secret>`, pasting the the secret copied in step 4 to `<webhook-signing-secret>`
5. Go to the stripe dashboard and add authorizations. Note that closing the stripe event terminal will terminate the connection and you will need to run steps 3 through 5 again

### Architecture
The application is broken into 3 parts: 
1. A serverless cloud system responsible for reliably and scalibly handling stripe events. 
2. A containerized backend offering the primary API to the webapp
3. The frontend web application
#### Diagram
![](/karat-local-arch.png)

#### Stripe Event Handling
The flow of the serverless event handler is as follows.
1. API Gateway gets forwarded events from stripe
2. A Lambda is passed the event where two steps occur
  - Fetch signing secret from AWS secrets manager
  - Verify 

When making the decision to go serverless and process data through an event bus I considered a few factors:
1. Stripe events happen often and at different levels of intensity throughout the day and even year. (Scalability)
2. Events potentially need to be reprocessed / can't be lost without serious customer end consequences. (Reliability)
3. There are many possible actions one could take in the future to react to a specific event. (Flexibility)

The serverless element partially came out of my own personal curiousity to try out the serverless framework (I know - not a good reason) but I think it answers consideration #1 above in a great way because it is more or less guaranteed to scale and efficiently reduce cost. I also think the FaaS piece in the code makes it exceptionally clean to test and develop.

Eventbridge is critical here to making #2 & #3 a possibility. In the past I've sort of developed my own wirings using message queues, event streams etc. but eventbridge (a pretty simple pub sub mechanism) makes event handling a whole lot simpler. It opens up the possibility, if desired, to add the events to a stream, function or message queue using rules. While there isn't really anything interesting happening in this example with eventbridge, by adding it, we've enabled  developers to scale the system easily by plugging in more functions, servers or services to deal with events however they'd please. 

Regarding improvements here, there are a few:
- Currently there's not really any error handling, errors are caught and logged but not sent off anywhere to be handled later. I think the initial lambda could pass errors onto eventbridge to be handled independently theoretically. 
- I think a stream or place to store raw events in between the eventbridge and the processing lambdas would've been great to really make #2 on my list work. The possibility only partially exist with eventbridge, but it isn't very robust (default 24 hr event retention). 
- Next improvement here would be looking at the actual processing lambdas. Currently they write to a postgres database using the Hasura service. It's a bit ugly and tedious to have to list out all of the data columns here. I think in an ideal world I would likely store the entire event object as raw data in some sort of document store (could be s3 or even Mongo)


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
