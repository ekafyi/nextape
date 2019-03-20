import React, { Component } from 'react';
import Layout from '../components/Layout';
import * as SpotifyWebApi from 'spotify-web-api-js';

function getRandomItemInArray(array = [], length = 0) {
  const randomNum = Math.floor(Math.random() * Math.floor(length))
  return array[randomNum];
}


class IndexPage extends Component {
  constructor() {
    super();
    this.state = {
      artist: {},
      artistTrack: {},
      relatedTracks: [],
      finishLoading: false
    }
  }

  componentDidMount() {
    let artistId;
    let artistQuery = 'pavement';

    // define current component, to make `setState` work
    // https://www.freecodecamp.org/forum/t/react-question-cannot-read-property-setstate-of-undefined/69620/3
    let currentComponent = this;

    // initialize spotify-web-api-js
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken('BQCvTyAcKBDDoT_aIVLDDR046o-6AERQeHpux1b2AAOstOGh0AItzmPrTcGhPI6i0PkBjqX96WkMjJTmqmIrxUso_ZP1Icbd3tolI_cYaDt88Jp0JMM_Pc8yzq774vm0SPeSj_yows5NOaVer3xp3wbMTFMHf39-');

    spotifyApi.searchArtists('"' + artistQuery + '"')
    // ===
    // QUERY ONE ↑
    // search artist by query
    // ============================
    .then(function(artistSearchRes) {
      console.log('1. Artist search', artistSearchRes);
      // get artist ID if there are results
      if (artistSearchRes.artists.items.length > 0) {
        // !TODO future improvement: Show dropdown of results for user to choose
        // Currently we choose the first result by default.
        artistId = artistSearchRes.artists.items[0].id;
        // setState v1 (`this` does not work, requires `currentComponent` above)
        currentComponent.setState({
          artist: {
            ...artistSearchRes.artists.items[0],
          }
        });

        return spotifyApi.getArtistTopTracks(artistId, 'ID');
      } else {
        // no result
        currentComponent.setState({
          finishLoading: true
        });
        return false;
      }
    })
    // ===
    // QUERY TWO ↑
    // get artist top track
    // ============================
    .then(function(artistTracksData) {
      console.log('2. Artist Tracks', artistTracksData);
      // get random top track    
      const tracksLength = artistTracksData.tracks.length
      const artistTrack = getRandomItemInArray(artistTracksData.tracks, tracksLength);
      // save to states
      currentComponent.setState({
        artistTrack: {
          artist: artistTrack.artists[0].name, // !TODO: refactor into array (ie. for song with multiple artists)
          title: artistTrack.name,
          spotifyUrl: artistTrack.external_urls.spotify
        }
      });

      return spotifyApi.getArtistRelatedArtists(artistId)
    })
    // ===
    // QUERY THREE ↑
    // get related artists
    // ============================
    .then(function(relatedArtistsData) {
      let relArtTracks = [];
      const howManyRelArt = 5;

      console.log('3. Related Artists', relatedArtistsData);
      // get random number (to randomize selected related artists)
      const relArtLength = relatedArtistsData.artists.length - howManyRelArt - 1;
      const randomNum = Math.floor(Math.random() * Math.floor(relArtLength))
      // create array containing related artists' IDs
      for (var i = randomNum; i < (randomNum + howManyRelArt); i++) {

        // ============================
        // QUERY FOUR ↓
        // get each related artist's tracks
        // ============================
        spotifyApi.searchTracks('artist:"' + relatedArtistsData.artists[i].name + '"')
        .then(function(trackResponse) {
          console.log('4. Related Artist Tracks ✔');
          // get one random track 
          const tracksLength = trackResponse.tracks.items.length
          let relArtTrack = getRandomItemInArray(trackResponse.tracks.items, tracksLength);
          // tidy up data
          relArtTrack = {
            id: relArtTrack.id,
            artist: relArtTrack.artists[0].name,
            title: relArtTrack.name,
            spotifyUrl: relArtTrack.external_urls.spotify
          }
          // push to relArtTracks array
          relArtTracks.push(relArtTrack);
          // only when it's the last child, save to state
          if (i === (randomNum + howManyRelArt)) {
            // save to state
            console.log('4b. Ready Related Tracks', relArtTracks);
            currentComponent.setState({
              relatedTracks: relArtTracks,
              finishLoading: true
            });
          }
        }, function(err) {
          console.log('4. Error getting Related Artist Tracks');
          console.error(err);
        });
      }
    })
    // ============================
    // print error
    // ============================
    .catch(error => console.log(error));
  }

  render() {
    const { 
      artist,
      artistTrack,
      relatedTracks,
      finishLoading
    } = this.state;

    return (
      <Layout>
        {finishLoading ? (
          relatedTracks.length ? (
            <React.Fragment>
              <h2>{artist.name}</h2>
              {artist.images ? (
                <img src={artist.images[1].url} />
              ) : (
                <div>no image</div>
              )}
              <hr/>
              <section>
                <h2>Mix</h2>
                <p>
                  Like <strong>{artist.name}</strong>?<br/>
                  You might enjoy these.
                </p>
                <ul>
                  {artistTrack && (
                    <li>
                      <a href={artistTrack.spotifyUrl}>
                        <strong>{artistTrack.artist}</strong>
                        &nbsp;&mdash;&nbsp;
                        <span>{artistTrack.title}</span>
                      </a>
                    </li>
                  )}
                  {relatedTracks.map(track => (
                    <li key={track.id}>
                      <a href={track.spotifyUrl}>
                        <strong>{track.artist}</strong>
                        &nbsp;&mdash;&nbsp;
                        <span>{track.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </React.Fragment>
          ) : (
            <div>result not found. try again?</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </Layout>
    );
  }
}

export default IndexPage;