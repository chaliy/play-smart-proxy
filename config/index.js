module.exports = {
  target: process.env.PLAY_SMART_PROXY_TRAGET || 'http://localhost:10010',
  configs: {
    documentDb: {
      endpoint: process.env.PLAY_SMART_PROXY_CONFIG_ENDPOINT,
      primaryKey: process.env.PLAY_SMART_PROXY_CONFIG_PRIMARY_KEY,
      database: 'configs',
      collection: 'configs'
    }
  }
}
