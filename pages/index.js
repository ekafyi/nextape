import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';


class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <h1>👋 Hello from Nextjs </h1>
        <Link href="/second">...next? (pun intended)</Link>
      </div>
    );
  }
}

// IndexPage.propTypes = {};

export default IndexPage;