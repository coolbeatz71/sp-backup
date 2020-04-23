import React from 'react';
import { Result } from 'antd';
import Layout from '../components/Layout';

const IndexPage = () => {
  return (
    <Layout title="Save Plus">
       <Result
          status="success"
          title="Welcome to Save Plus"
          subTitle="Welcome to Save Plus, please visit us again very soon. Our developers are busy adding new features."
        />
    </Layout>
  );
};

export default IndexPage;
