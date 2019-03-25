const LaunchDarkly = require('ldclient-node')
const { LAUNCHDARKLY_APIKEY } = process.env
const ldclient = LaunchDarkly.init(LAUNCHDARKLY_APIKEY)

module.exports.handler = async (event) => {
  const key = event.queryStringParameters.key
  
  await ldclient.waitForInitialization()
  const showFeature = await ldclient.variation('test', { key }, false)

  return {
    statusCode: 200,
    body: JSON.stringify({
      showFeature
    })
  }
}
