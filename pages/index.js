import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';


class IndexPage extends React.Component {

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
			<div>
				<h1>Hacker News Clone</h1>
				<div>
					{stories.map(story => (
						<h3 key={story.id}>{story.title}</h3>
					))}
				</div>
			</div>
		);
	}
}

// v3
// https://davidyeiser.com/tutorial/how-to-create-blog-airtable-api-next-js
// IndexPage.getInitialProps = async (context) => {
//   const res = await fetch('https://node-hnapi.herokuapp.com/news?page=1')
//   const stories = await res.json()
//   return { stories }
// }

// IndexPage.propTypes = {};

export default IndexPage;