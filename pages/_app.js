import React from 'react';
import 'antd/dist/antd.css';
import 'styles/global.scss';
import Layout from "../components/Layout";


export default function MyApp({ Component, pageProps }) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
};
