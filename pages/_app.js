import React from 'react';
import App from 'next/app';
import {create} from 'jss';
import rtl from 'jss-rtl';
import {jssPreset, ThemeProvider, StylesProvider} from '@material-ui/styles';
import {GlobalStyles} from './globalStyle.js';
import Head from 'next/head';
import withReduxStore from '../store/store';
import {Provider} from 'react-redux';

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

class MyApp extends App {
  static async getInitialProps({Component, ...ctx}) {
    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {pageProps}
  }

  componentDidMount() {
    let ua = window.navigator.userAgent;
    let old_ie = ua.indexOf('MSIE ');
    let new_ie = ua.indexOf('Trident/');
    if (old_ie > -1 || new_ie > -1) {
      document.body.setAttribute('class', 'ieClass')
    }
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const {Component, pageProps, reduxStore} = this.props;
    return <>
      <Head>
        <title>{'zoominfo'}</title>
      </Head>
      <Provider store={reduxStore}>
        <StylesProvider jss={jss}>
          {/*<ThemeProvider theme={''}>*/}
          <GlobalStyles/>
          <Component {...pageProps}/>
          {/*</ThemeProvider>*/}
        </StylesProvider>
      </Provider>
    </>;
  }
}

export default withReduxStore(MyApp);