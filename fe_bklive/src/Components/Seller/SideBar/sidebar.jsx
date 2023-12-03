import { Menu } from "antd";
import {
  LineChartOutlined,
  NotificationOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SoundOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./index.css"


const SidebarSeller = () => {
  // const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  //     (icon, index) => {
  //       const key = String(index + 1);

  //       return {
  //         key: `sub${key}`,
  //         icon: React.createElement(icon),
  //         label: `subnav ${key}`,

  //         children: new Array(4).fill(null).map((_, j) => {
  //           const subKey = index * 4 + j + 1;
  //           return {
  //             key: subKey,
  //             label: `option${subKey}`,
  //           };
  //         }),
  //       };
  //     },
  //   );
  const navigate = useNavigate();
  const handleSideBarClick = (item) => {
    navigate(`/seller/${item.keyPath[1]}/${item.key}`);
  };

  return (
    <div className="sideMenu">
      <Menu
        className="sideMenuInline"
        mode="inline"
        //   defaultSelectedKeys={['1']}
        //   defaultOpenKeys={['order']}
        style={{
          width: 300,
          height: "100%"
        }}
        onClick={handleSideBarClick}
        items={[
          {
            label: "Order management",
            key: "order",
            icon: <ShoppingCartOutlined style={{fontSize: 20}} />,
            children: [
              {
                label: "All",
                key: "all",
              },
              {
                label: "Canceled",
                key: "cancel",
              },
            ],
          },
          {
            label: "Store management",
            key: "store",
            icon: <ShoppingOutlined style={{fontSize: 20}}/>,
            children: [
              {
                label: "All products",
                key: "all-products",
              },
              {
                label: "Create product",
                key: "create-product",
              },
            ],
          },
          {
            label: "Sales analysis",
            key: "sales-analysis",
            icon: <LineChartOutlined style={{fontSize: 20}}/>,
            children: [
              {
                label: "Sale analysis",
                key: "analysis",
              },
            ],
          },
          {
            label: "Livestream",
            key: "livestream",
            icon: <VideoCameraOutlined style={{fontSize: 20}}/>,
            children: [
              {
                label: "Create livesream",
                key: "create-livestream",
              },
              {
                label: "Livestream management",
                key: "livestream-list",
              },
            ],

          },
          {
            label: "Marketing channel",
            key: "marketing-channel",
            icon: <SoundOutlined style={{fontSize: 20}}/>,
            children: [
              {
                label: "All voucher",
                key: "all-voucher",
              },
              {
                label: "Create voucher",
                key: "create-voucher",
              },
            ],
          },

          {
            label: "Setting",
            key: "setting",
            icon: <SettingOutlined style={{fontSize: 20}}/>,
            children: [
              {
                label: "Account",
                key: "account",
              },
              {
                label: "Address",
                key: "address",
              },
              {
                label: "Update store information",
                key: "update-store-info",
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default SidebarSeller;
