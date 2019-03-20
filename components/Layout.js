import Link from 'next/link';
import Head from 'next/head';


const Layout = ({ children }) => (
	<React.Fragment>
    <Head>
      <title>Nextape | quick mixtape using Spotify Web API</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header role="banner">
      <Link href="/">
        <a><h1 style={{ display: 'inline-block' }}>Nextape</h1></a>
      </Link>
    </header>
    <main role="main">
      {children}
    </main>

		<style jsx>{`
		`}</style>
		<style global jsx>
			{`
				body {
					background: white;
				}
			`}
		</style>
	</React.Fragment>
);

export default Layout;