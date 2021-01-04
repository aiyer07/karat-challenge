import Stripe from 'stripe'
import * as AWS  from 'aws-sdk'
      

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});
const secretsManager: AWS.SecretsManager = new AWS.SecretsManager({
  endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
  region: process.env.AWS_DEFAULT_REGION
})
const eventBridge: AWS.EventBridge = new AWS.EventBridge({
  endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
  region: process.env.AWS_DEFAULT_REGION
});

const handler = async (event) => {
  let err = null
  try {
    const signature: string = event.headers["Stripe-Signature"]
    const secret: string = (await (secretsManager.getSecretValue({ SecretId: process.env.STRIPE_SIGNING_SECRET })).promise()).SecretString
    
    const eventReceived: Stripe.Event = stripe.webhooks.constructEvent(event.body, signature, secret)
    
    await eventBridge.putEvents({
      Entries: [
        {
          Source: 'stripe',
          DetailType: eventReceived.type,
          Detail: JSON.stringify(eventReceived),
        },
      ]
    }).promise();
  } catch (e) {
    err = e
    console.log('*************** ERROR ********************')
    console.log("🚀 ~ file: stripeEventHandler.ts ~ line 40 ~ handler ~ e", e)
    console.log('******************************************')
  }
  const body = err ? JSON.stringify(err) : ""
  const statusCode = err ? 500 : 200
  return { statusCode, body }
};

export { handler }