import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import StoryList from '../components/BasicTutStoryList';


class BasicTutorialPage extends React.Component {

  // v1 
  // https://medium.com/crowdbotics/how-to-build-a-hacker-news-app-with-react-and-next-js-5fe0c5a64c12
	static async getInitialProps() {
		let stories;
		try {
			const response = await fetch('https://node-hnapi.herokuapp.com/news?page=1');
			stories = await response.json();
		} catch (err) {
			console.log(err);
			stories = [];
		}
		return { stories };
	}

  // v2
  // https://dev.to/aurelkurtula/introduction-to-the-basics-of-nextjs---part-two-pad
  // static async getInitialProps() {
  //   const response = await fetch('https://node-hnapi.herokuapp.com/news?page=1')
  //   const stories = await response.json()
  //   return { stories }
  // }

	render() {
    const { stories } = this.props;
		return (
      <React.Fragment>
        <Head>
          <title>Hacker News Clone - Basic Tutorial</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
  			<div>
  				<h1>Hacker News Clone</h1>
  				<StoryList stories={stories} />
  			</div>
      </React.Fragment>
		);
	}
}

// v3
// https://davidyeiser.com/tutorial/how-to-create-blog-airtable-api-next-js
// BasicTutorialPage.getInitialProps = async (context) => {
//   const res = await fetch('https://node-hnapi.herokuapp.com/news?page=1')
//   const stories = await res.json()
//   return { stories }
// }

// BasicTutorialPage.propTypes = {};

export default BasicTutorialPage;