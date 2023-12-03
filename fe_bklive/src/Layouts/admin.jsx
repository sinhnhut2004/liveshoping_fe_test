import { Layout } from 'antd';
import AdminHeader from "Components/Admin/Header";
import AdminFooter from "Components/Admin/Footer";
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SideMenu from "Components/Admin/SideMenu";
import "./admin.css";

const { Header: HeaderAntd, Footer: FooterAntd, Content, Sider } = Layout;

function AdminLayout() {
  // let { pathname } = useLocation();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Layout className="min-h-screen">
      <HeaderAntd className="bg-white">
        <AdminHeader />
      </HeaderAntd>

      {/* <SideMenu></SideMenu> */}

      <Content className="">
        <Outlet />
      </Content>

      <FooterAntd style={{ backgroundColor: '#D9D9D9' }}>
        <AdminFooter />
      </FooterAntd>
    </Layout>
  );
}

export default AdminLayout;
