import Stripe from 'stripe'
import * as AWS  from 'aws-sdk'
      
const secretName = 'StripeWebhookSigningSecret'

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});
const client = new AWS.SecretsManager({
  endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
  region: 'us-east-1'
})

const handler = async (event) => {
  let err = null
  try 
  {
    console.log('*************** START ********************')
    console.log('ENV', process.env.LOCALSTACK_HOSTNAME)
    const signature = event.headers["Stripe-Signature"]
    console.log('signature', signature)
    const secret = (await (client.getSecretValue({ SecretId: secretName })).promise()).SecretString
    console.log('secret', secret)
    const eventReceived = stripe.webhooks.constructEvent(event.body, signature, secret)
    console.log(eventReceived)
    console.log('*******************************************')
  } 
  catch (e) 
  {
    err = e
    console.log('*************** ERROR ********************')
    console.log(e)
    console.log('******************************************')
  }
  const body = err ? JSON.stringify(err) : ""
  const statusCode = err ? 500 : 200
  return { statusCode, body }
};

export {handler}