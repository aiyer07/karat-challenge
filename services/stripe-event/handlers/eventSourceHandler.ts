const handler = async (event) => {
  let err = null
  try {
    console.log('*************** START ********************')
    console.log('eventSourcer')
    console.log("🚀 ~ file: eventSourceHandler.ts ~ line 14 ~ handler ~ event.detail.data", event.detail.data)
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