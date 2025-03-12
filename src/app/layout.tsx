'use client';
import { ThemeProvider } from '~/Components/Context/themeProvider';
import { store } from './../Store/store';
import './../styles/globals.css';

import Layout from '~/Components/Layout/layout';
import { Provider } from 'react-redux';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <title>Art App</title>
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <Layout>
              {children}
            </Layout>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
