import logo from '../../../Resources/assets/img/logo.svg';

import './index.css';

import React, { Fragment, useState } from 'react';
import {
  Menu,
  Input,
  Button,
  Avatar,
  Select,
  Badge,
  Dropdown,
  Space,
  Drawer,
} from 'antd';
import {
  ShoppingCartOutlined,
  SearchOutlined,
  BellOutlined,
  PoweroffOutlined,
  MenuFoldOutlined,
  SwapOutlined,
  HomeOutlined,
  ShoppingOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import vnflag from 'Resources/assets/img/vi.png';
import enflag from 'Resources/assets/img/en.png';

const { Search } = Input;
const { Option } = Select;

const AdminHeader = () => {
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const isAuth = true;
  const items = [
    {
      label: (
        <Button
          // onClick={onLogout}
          // size="large"

          className="px-0"
          type="text"
          danger={isAuth}
        >
          <PoweroffOutlined />
          Log out
        </Button>
      ),
      key: '4',
    },
  ];
  const itemsSideBar = [
    {
      label: 'Tien Thanh',
      key: 1,
      icon: (
        <Avatar
          // src={user.img ? user.img : constants.DEFAULT_USER_AVT}
          // gap={1}
          className="m-auto  w-28px h-28px"
        >
          T
        </Avatar>
      ),
      children: [...items],
    },
    {
      label: 'Notifications',
      key: 2,
      icon: <BellOutlined className="!text-[28px]" />,
    },
    {
      label: (
        <Select defaultValue="en" className="w-[100px]">
          <Option value="vi">
            <img
              src={vnflag}
              width="25px"
              height="25px"
              style={{ verticalAlign: 'sub' }}
              className="align-sub me-sm"
              alt="vn flag"
            />
            VI
          </Option>
          <Option value="en">
            <img
              src={enflag}
              width="25px"
              height="25px"
              style={{ verticalAlign: 'sub' }}
              className="align-sub me-sm"
              alt="en flag"
            />
            EN
          </Option>
        </Select>
      ),
      key: 3,
      icon: <SwapOutlined className="!text-[28px]" />,
      disabled: true,
    },
    {
      label: 'Cart',
      key: 4,
      icon: <ShoppingCartOutlined className="!text-[28px]" />,
    },
    { type: 'divider' },
    {
      label: (
        <div className="just-show-576px ">
          <Link to="/">Home</Link>
        </div>
      ),
      key: 5,
      icon: <HomeOutlined className="!text-[28px] just-show-576px" />,
    },
    {
      label: (
        <div className="just-show-576px ">
          <Link to="/product">Shop</Link>
        </div>
      ),
      key: 6,
      icon: <ShoppingOutlined className="!text-[28px] just-show-576px" />,
    },
    {
      label: (
        <div className="just-show-576px ">
          <Link to="/live">Live</Link>
        </div>
      ),
      key: 7,
      icon: (
        <FundProjectionScreenOutlined className="!text-[28px] just-show-576px" />
      ),
    },
  ];

  return (
    <Fragment>
      <div className="flex items-center justify-center">
        <div key="logo" className="mr-5">
          <Link to="/admin/dashboard">
            <img src={logo} alt="Company Logo" />
          </Link>
        </div>
        <div className="flex flex-3 link-list">
          <div className="mr-5">
            <Link to="/admin/dashboard">Dashboard</Link>
          </div>
          <div key="report" className="mr-5">
            <Link to="/admin/report">Report</Link>
          </div>
          <div key="buyer" className="mr-5">
            <Link to="/admin/buyer">Buyer</Link>
          </div>
          <div key="seller" className="mr-5">
            <Link to="/admin/seller">Seller</Link>
          </div>
          <div key="feedback" className="mr-5">
            <Link to="/admin/feedback">Feedback</Link>
          </div>

        </div>
        <div className="mr-5 flex-1 flex">
          <Search
            placeholder="Search"
            // style={{ minWidth: '300px' }}
            size="large"
            // className="mx-5"
            enterButton={<Button icon={<SearchOutlined />} type="primary" />}
          />
        </div>
        <div key="login" className="mr-5 username">
          {isAuth ? (
            <Fragment>
              {/* <span className="title"> */}
              {/* {helpers.reduceProductName(user.name, 12)} */}
              <Dropdown
                menu={{
                  items,
                  style: { padding: '1rem 0rem', width: '200px' },
                }}
              // autoFocus
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <Avatar
                    // src={user.img ? user.img : constants.DEFAULT_USER_AVT}
                    // gap={1}
                    className="m-auto  w-28px h-28px"
                  >
                    N
                  </Avatar>
                  Sinh Nhut
                  {/* <DownOutlined /> */}
                </Space>
                {/* </a> */}
              </Dropdown>
              {/* </span> */}
            </Fragment>
          ) : (
            'Login'
          )}
        </div>
        <div className="lg:hidden sm:block">
          <Button onClick={() => setOpenDrawer(true)}>
            <MenuFoldOutlined />
          </Button>
          <Drawer
            // title="Drawer with extra actions"
            placement={'right'}
            width="400"
            onClose={() => setOpenDrawer(false)}
            open={isOpenDrawer}

            bodyStyle={{ padding: '24px 0' }}
          >
            <Menu
              // onClick={onClick}
              // style={{ width: 256 }}
              className="w-full !border-e-0"
              // defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              mode="inline"
              items={itemsSideBar}
              muti
            />
          </Drawer>
        </div>
      </div>
    </Fragment>

  );
};

export default AdminHeader;
