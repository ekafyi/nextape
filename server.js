const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const config = require('./next.config.js')

app
  .prepare()
  .then(() => {
    const server = express()

    
    // ============================
    // Get Spotify access token
    // https://glitch.com/~spotify-client-credentials
    // ============================

    var SpotifyWebApi = require('spotify-web-api-node');

    // The API object we'll use to interact with the API
    var spotifyApi = new SpotifyWebApi({
      clientId : config.serverRuntimeConfig.CLIENT_ID,
      clientSecret : config.serverRuntimeConfig.CLIENT_SECRET
    });

    // Using the Client Credentials auth flow, authenticate our app
    spotifyApi.clientCredentialsGrant()
      .then(function(data) {
        console.log('Token retrieval successful', data.body)
        const accessToken = data.body['access_token']

        // Save the access token so that it's used in future calls
        // (not used)
        spotifyApi.setAccessToken(accessToken);

        // send access token to server
        // !TODO make better Promise chaining
        server.get('*', (req, res) => {
          res.locals.accessToken = accessToken
          return handle(req, res)
        })
      }, function(err) {
        console.log('Something went wrong when retrieving an access token', err.message);
        // !TODO
        // render specific view if access token retrieval fails (ie. ask user to reload)
      });

    // ============================

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000 (Express server)')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })