const axios = require('axios')
const LaunchDarkly = require('ldclient-node')
const { LAUNCHDARKLY_APIKEY, WORLD_API } = process.env
const ldclient = LaunchDarkly.init(LAUNCHDARKLY_APIKEY)

module.exports.handler = async (event) => {
  const key = event.queryStringParameters.key

  await ldclient.waitForInitialization()

  const user = {
    key,
    firstName: "Yan",
    lastName: "Cui",
    email: "theburningmonk@gmail.com"
  }

  const showFeature = await ldclient.variation('test', user, false)
  const worldResp = await axios.get(`${WORLD_API}?key=${key}`)

  return {
    statusCode: 200,
    body: JSON.stringify({
      showFeature,
      alsoShowFeature: worldResp.data.showFeature
    })
  }
}