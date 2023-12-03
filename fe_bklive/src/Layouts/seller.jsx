import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HeaderSeller from "../Components/Seller/Header/header";
import SidebarSeller from "../Components/Seller/SideBar/sidebar";


const { Header: HeaderAntd, Content, Sider } = Layout;

const SellerLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    // <Layout className="min-h-screen">
    // <HeaderAntd className="bg-white">
    //     <AppHeader />
    // </HeaderAntd>

    // <Content className="">
    //     <Outlet />
    // </Content>

    // </Layout>
    <div className="seller-layout">
      <HeaderSeller />
      <div className="side-content">
        <SidebarSeller />
        <div
          className="site-layout-content"
          style={{
            padding: 24,
            margin: 0,
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
