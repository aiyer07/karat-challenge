import Stripe from 'stripe'
import * as AWS  from 'aws-sdk'
      
const secretName = 'StripeWebhookSigningSecret'

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});
const secretsManager = new AWS.SecretsManager({
  endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
  region: 'us-east-1'
})

const handler = async (event) => {
  let err = null
  try 
  {
    console.log('*************** START ********************')
    const signature = event.headers["Stripe-Signature"]
    const secret = (await (secretsManager.getSecretValue({ SecretId: secretName })).promise()).SecretString
    
    const eventReceived = stripe.webhooks.constructEvent(event.body, signature, secret)
    
    const eventBridge = new AWS.EventBridge({
      endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
      region: "us-east-1"
    });
    console.log('event.type', event.type)
    const ret = await eventBridge.putEvents({
      Entries: [
        {
          Source: 'stripe',
          DetailType: event.type,
          Detail: JSON.stringify(eventReceived),
        },
      ]
    }).promise();
    console.log(ret)
    console.log('*******************************************')
  } 
    console.log("🚀 ~ file: stripeEventHandler.ts ~ line 42 ~ handler ~ event", event)
    console.log("🚀 ~ file: stripeEventHandler.ts ~ line 42 ~ handler ~ event", event)
    console.log("🚀 ~ file: stripeEventHandler.ts ~ line 42 ~ handler ~ event.type", event.type)
    console.log("🚀 ~ file: stripeEventHandler.ts ~ line 42 ~ handler ~ event.type", event.type)
    console.log("🚀 ~ file: stripeEventHandler.ts ~ line 42 ~ handler ~ event.type", event.type)
    console.log("🚀 ~ file: stripeEventHandler.ts ~ line 42 ~ handler ~ event.type", event.type)
    console.log("🚀 ~ file: stripeEventHandler.ts ~ line 42 ~ handler ~ event.type", event.type)
    console.log("🚀 ~ file: stripeEventHandler.ts ~ line 42 ~ handler ~ event.type", event.type)
    console.log("🚀 ~ file: stripeEventHandler.ts ~ line 42 ~ handler ~ event.type", event.type)
    console.log("🚀 ~ file: stripeEventHandler.ts ~ line 42 ~ handler ~ event.type", event.type)
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