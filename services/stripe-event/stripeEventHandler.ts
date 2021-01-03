import { Context, Handler, Callback } from 'aws-lambda';

/**
 * @description handle some payload
 * @param event event object
 * @param context context object
 */
const process: Handler = async (event: any, context: Context, callback: Callback) => {
  console.log('stripe.process', { event, context });
  console.log('whsec_36P6FeZMjtqppz7TQ4SwTOzLBpbW2ocb')
  try {
    const shot = {
      message: 'Boom! 💥',
      event,
    };
    callback(null, shot);
  } catch (exception) {
    callback(exception);
  }
};

export { process };