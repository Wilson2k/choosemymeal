import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getInitColorSchemeScript } from '@mui/joy/styles';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Choose My Meal</title>
        </Head>
        <body>
          {getInitColorSchemeScript()}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}