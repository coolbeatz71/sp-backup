import React from 'react';
import Layout from '../components/Layout';
import { Button } from 'antd';

const IndexPage = () => {
  return (
    <Layout title="Save Plus">
      <div className="index-container">
        <h1>Put a Smile on Someone Face  </h1>
        <Button className="btn-primary">
          GET STARTED
        </Button>
      </div>

      <style jsx>{`
        .index-container{
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: inherit;
          flex-direction: column;
          background: #F4FAFd;
        }
        h1{
          text-align: center;
          font-size: 30px;
          font-weight: 500;
          font-style: normal;
        }
      `}</style>
    </Layout>
  );
};

export default IndexPage;
