const Promise = require('bluebird')
const axios = require('axios')
const LaunchDarkly = require('ldclient-node')

const { LAUNCHDARKLY_APIKEY, WORLD_API } = process.env
const ldclient = LaunchDarkly.init(LAUNCHDARKLY_APIKEY)

module.exports.world = async (event, context) => {
  await ldclient.waitForInitialization()

  const key = event.queryStringParameters.key

  const showFeature = await ldclient.variation('test', { key }, false)
  console.log(showFeature)

  return {
    statusCode: 200,
    body: JSON.stringify({
      showFeature
    })
  }
}

module.exports.hello = async (event, context) => {
  await ldclient.waitForInitialization()

  const key = event.queryStringParameters.key

  const user = {
    key,
    firstName: "Yan",
    lastName: "Cui",
    email: "theburningmonk@gmail.com"
  };

  const showFeature = await ldclient.variation('test', user, false)
  console.log(showFeature)

  const worldResp = await axios.get(`${WORLD_API}?key=${key}`)
  console.log(worldResp.data)

  await Promise.delay(15000)

  return {
    statusCode: 200,
    body: JSON.stringify({
      showFeature,
      alsoShowFeature: worldResp.data.showFeature
    })
  }
}