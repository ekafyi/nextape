import React, { Component } from 'react';
import Layout from '../components/Layout';

import * as SpotifyWebApi from 'spotify-web-api-js';



class IndexPage extends Component {
  constructor() {
    super();
    this.state = {
      artist: {}
    }
  }

  componentDidMount() {
    // define current component, to make `setState` work
    // https://www.freecodecamp.org/forum/t/react-question-cannot-read-property-setstate-of-undefined/69620/3
    let currentComponent = this;

    // initialize spotify-web-api-js
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken('BQB-oy2zFHtafo09zB1XrtYyphrg5xxjyFhfAlTadX6BPW0KQGhUAMbOlq3dRe9GpcO8YBVTuvocXhrN_piMqe9QT-WEwZdxKtzdQTEZFwyrLwuGL_XVf7zgmrzSUwkc7MlldrvIzDS5hWdWQO4ieEORA45IsqtP');

    // QUERY ONE
    // get artist information
    spotifyApi.getArtist('43ZHCT0cAZBISjO8DG9PnE')

    // v1 (`this` does not work, requires workaround above)
    .then(function(artistData) {
      console.log('Artist information', artistData);
      currentComponent.setState({
        artist: {
          ...artistData,
          spotifyUrl: artistData.external_urls.spotify, // returns error if called normally
        }
      });
    }, function(err) {
      console.log('Error getting Artist information');
      console.error(err);
    });
    // v2 (`this` works in this function)
    // .then(data => this.setState({
    //   artist: {
    //     name: data.name
    //   }
    // }))

    // QUERY TWO
    // get artist top track
    spotifyApi.getArtistTopTracks('43ZHCT0cAZBISjO8DG9PnE', 'ID')
    .then(function(data) {
      console.log('Artist top tracks', data);
      
    }, function(err) {
      console.log('Error getting Artist top tracks');
      console.error(err);
    });


  }

  render() {
    const { artist } = this.state;

    return (
      <Layout>
        {artist && (
          <div>
            <h2>{artist.name}</h2>
            {artist.images && (
              <img src={artist.images[1].url} />
            )}
            <div>
              <a href={artist.spotifyUrl} rel="nofollow noopener external">
                Artist's Spotify
              </a>
            </div>
          </div>
        )}

        
      </Layout>
    );
  }
}

export default IndexPage;