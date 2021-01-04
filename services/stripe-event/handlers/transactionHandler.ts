const handler = async () => {
  let err = null
  try 
  {
    console.log('*************** START ********************')
    console.log('stripeTransaction')
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