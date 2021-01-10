import { GraphQLClient, gql } from 'graphql-request'
import Stripe from 'stripe'
import {EventBridgeEvent} from 'aws-lambda'


const hasuraEndpoint = `http://hasura/v1/graphql`
const graphQLClient = new GraphQLClient(hasuraEndpoint, {
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
  },
})

const addStripeAuthorizationMutation = gql`
    mutation AddStripeAuthorization($authId: String!, $isApproved: Boolean!, $createdTs: Int!) {
      insert_authorizations_one(object: {id: $authId, isApproved: $isApproved, createdTs: $createdTs}) {
        id
      }
    }
  `

const authRequest = async (event) => {
  console.log("🚀 ~ file: authorizationHandler.ts ~ line 22 ~ authRequest ~ event", event)
}

const createAuth = async (event) => {
  console.log("🚀 ~ file: authorizationHandler.ts ~ line 26 ~ authCreated ~ event", event)
  const variables = {
    authId: event.id,
    isApproved: event.approved,
    createdTs: +event.created
  }
  return graphQLClient.request(addStripeAuthorizationMutation, variables)
}

const authUpdated = async (event) => {
  console.log("🚀 ~ file: authorizationHandler.ts ~ line 30 ~ authUpdated ~ event", event)
}

const handler = async (event: EventBridgeEvent<string, Stripe.Event>) => {
  let err = null
  
  try {
    console.log('*************** START ********************')
    const {object: authEvent}: any = event.detail.data
    switch (event['detail-type']) {
      case 'issuing_authorization.request':
        authRequest(authEvent)
        break;
      case 'issuing_authorization.created':
        await createAuth(authEvent)
        break;
      case 'issuing_authorization.updated':
        authUpdated(authEvent)
        break;
    }
    console.log('*******************************************')
  } catch (e) {
    err = e
    console.log('*************** ERROR ********************')
    console.log(e)
    console.log('******************************************')
  }
  const body = err ? JSON.stringify(err) : ""
  const statusCode = err ? 500 : 200
  return { statusCode, body,  }
};

export {handler}