import { Layout } from 'antd';
import { BuyerHeader, BuyerFooter } from 'Components';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const { Header: HeaderAntd, Footer: FooterAntd, Content, Sider } = Layout;

function ClientLayout() {
  // let { pathname } = useLocation();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Layout className="min-h-screen">
      <HeaderAntd className="bg-white">
        <BuyerHeader />
      </HeaderAntd>

      <Content className="">
        <Outlet />
      </Content>

      <FooterAntd style={{ backgroundColor: '#D9D9D9' }}>
        <BuyerFooter />
      </FooterAntd>
    </Layout>
  );
}

export default ClientLayout;
