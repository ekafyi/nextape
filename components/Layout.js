import Link from 'next/link';
import Head from 'next/head';


const Layout = ({ children }) => (
	<div className="NxLayout">
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
    <footer role="contentinfo">
      Proof of concept app by Eka | <a href="https://github.com/ekaonthenet/nextape" rel="noopener external">source code on Github</a>
    </footer>

		<style jsx>{`
      .NxLayout {
        min-height: calc(100vh - 1rem);
        display: flex;
        flex-direction: column;
      }
      .NxLayout>main {
        flex-grow: 1;
      }
		`}</style>
		<style global jsx>
			{`
				body {
					background: white;
				}
			`}
		</style>
	</div>
);

export default Layout;