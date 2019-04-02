import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Author Pro',
          title: 'Author Pro',
          href: 'https://github.com/markmo',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/markmo',
          blankTarget: true,
        },
        {
          key: 'markmo',
          title: 'markmo',
          href: 'https://github.com/markmo',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
