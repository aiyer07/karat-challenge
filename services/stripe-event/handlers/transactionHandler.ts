import { GraphQLClient, gql } from 'graphql-request'
import Stripe from 'stripe'
import {EventBridgeEvent} from 'aws-lambda'
const hasuraEndpoint = `http://hasura/v1/graphql`
const graphQLClient = new GraphQLClient(hasuraEndpoint, {
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
  },
})

const addStripeTransactionMutation = gql`
    mutation AddStripeTransaction($txId: String!, $amount: Int!, $authId: String!, $cardId: String!, $cardHolderId: String!, $createdTs: Int!, $merchantName: String!, $merchantCategory: String!) {
      insert_transactions_one(object: {id: $txId, amount: $amount, authorizationId: $authId, cardId: $cardId, cardHolderId: $cardHolderId, merchant_name: $merchantName, merchant_category: $merchantCategory, createdTs:$createdTs}) {
        id
      }
    }
  `

const handler = async (event: EventBridgeEvent<string, Stripe.Event>) => {
  let err = null
  
  try {
    console.log('*************** START ********************')
    console.log(hasuraEndpoint)
    const {object: txEvent}: any = event.detail.data
    const {merchant_data: merchantData}: any = txEvent
    console.log('stripeTransaction')
    console.log("🚀 ~ file: transactionHandler.ts ~ line 10 ~ handler ~ event", txEvent)
    const variables = {
      txId: txEvent.id,
      amount: txEvent.amount,
      authId: txEvent.authorization,
      cardId: txEvent.card,
      cardHolderId: txEvent.cardholder,
      createdTs: txEvent.created,
      merchantName: merchantData.name,
      merchantCategory: merchantData.category
    }
    const data = await graphQLClient.request(addStripeTransactionMutation, variables)
    console.log("🚀 ~ file: transactionHandler.ts ~ line 28 ~ handler ~ data", data)
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