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

    
    // https://glitch.com/~spotify-client-credentials

    // init Spotify API wrapper
    var SpotifyWebApi = require('spotify-web-api-node');

    // The API object we'll use to interact with the API
    var spotifyApi = new SpotifyWebApi({
      clientId : config.serverRuntimeConfig.CLIENT_ID,
      clientSecret : config.serverRuntimeConfig.CLIENT_SECRET
    });

    // Using the Client Credentials auth flow, authenticate our app
    spotifyApi.clientCredentialsGrant()
      .then(function(data) {
        console.log('Access token retrieval successful', data.body)
        console.log('=====')
        console.log('=====')
        console.log('=====')
        console.log('=====')
        console.log('=====')
      
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);

      }, function(err) {
        console.log('Something went wrong when retrieving an access token', err.message);
      });







    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })