import { Avatar, Badge, Button, Dropdown, Input, Layout, Menu, Space, Typography } from "antd";
import { BellFilled, BellOutlined, MailOutlined, PoweroffOutlined, SolutionOutlined } from "@ant-design/icons";
import "./index.css";
import { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css"
import { AuthContext } from "../../../context/authContext";
const isAuth = true;

const HeaderSeller = () => {
  const onSearch = (value) => console.log(value);
  const navigate = useNavigate();

  const {currentUser, setCurrentUser} = useContext(AuthContext);
  console.log(currentUser);

  const handleLogout = async () => {
    setCurrentUser(null);
    navigate('/seller/login');
    
  }
  const items = [
    {
      label: <Link to="/seller/shop-profile">Shop profile</Link>,
      key: 'x1',
      icon: <SolutionOutlined style={{
        fontSize: "15px"
      }} />
    },
    {
      label: (
        <Button
          // onClick={onLogout}
          // size="large"
          onClick={handleLogout}
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
  


  return (
    <div className="header-seller">
      <div className="logo">
        <Typography.Title
          style={{
            color: "#40A9FF",
          }}
        >
          BK <span style={{ fontSize: "80%" }}>seller center</span>
        </Typography.Title>
      </div>

      <div className="header-seller-right">
        <div
          className="input-search"
          style={{
            width: "40%",
          }}
        >
          <Input.Search
            style={{
              width: "80%",
            }}
            placeholder="input search text"
            onSearch={onSearch}
            enterButton={true}
          ></Input.Search>
        </div>
        <Fragment>
          {/* <span className="title"> */}
          {/* {helpers.reduceProductName(user.name, 12)} */}
          <Dropdown
            menu={{
              items,
              style: { padding: "1rem 0rem", width: "200px" },
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
                T
              </Avatar>
              {currentUser?.user.username}
              {/* <DownOutlined /> */}
            </Space>
            {/* </a> */}
          </Dropdown>
          {/* </span> */}
        </Fragment>
        <div
          className="information"
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Space>
            <Badge count={2} dot>
              <MailOutlined
                style={{ fontSize: 24 }}
                // onClick={() => {
                //   setCommentsOpen(true);
                // }}
              />
            </Badge>
            <Badge count={2}>
              <BellOutlined
                style={{ fontSize: 24, marginLeft: "10px" }}
                // onClick={() => {
                //   setNotificationsOpen(true);
                // }}
              />
            </Badge>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default HeaderSeller;
