import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';


class SecondPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Second page</h1>
        <Link href="/">&larr; home</Link>
      </div>
    );
  }
}

// SecondPage.propTypes = {};

export default SecondPage;