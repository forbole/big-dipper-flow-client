import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import Layout from '../components/Layout'
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../themes/Theme';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { init } from "@socialgouv/matomo-next"
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
  cache: new InMemoryCache()
});

export default function BigDipper(props:any) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    init({ url: "https://analytics.forbole.com", siteId: 2 });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <DefaultSeo {...SEO}/>
      <ThemeProvider theme={Theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

BigDipper.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};