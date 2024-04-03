import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Analysis of Anaerobic Digestion Efficiency of Straw and Prototype System for Yield Prediction"
    />
  );
};

export default Footer;
