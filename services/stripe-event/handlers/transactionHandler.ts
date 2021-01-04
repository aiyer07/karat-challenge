const handler = async (event) => {
  let err = null
  try {
    console.log('*************** START ********************')
    console.log('stripeTransaction')
    console.log("🚀 ~ file: transactionHandler.ts ~ line 10 ~ handler ~ event", event)
    console.log('*******************************************')
  } catch (e) {
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