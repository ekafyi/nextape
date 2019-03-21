// https://github.com/zeit/next.js/blob/canary/examples/with-universal-configuration-build-time/next.config.js
// https://github.com/zeit/next.js/tree/canary/examples/with-dotenv/next.config.js

require('dotenv').config()

module.exports = {
  serverRuntimeConfig: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
  }
}