import React from 'react';
import Container from 'Components/Common/Container';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Typography,
} from 'antd';
import logo from 'Resources/assets/img/logo.svg';
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;

export default function AdminLogIn() {
  return (
    // <Container>
    <div className="h-screen overflow-hidden">
      <Row className="-mx-[8px] h-screen" align="middle">
        <Col span={12} className="h-screen relative">
          {/* <div> */}
          <img
            src={logo}
            alt=""
            className="absolute max-w-[500px] top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            width="100%"
          />
          {/* </div> */}
          <img
            src="https://picsum.photos/800/1500"
            alt="signin"
            width="100%"
            height="100%"
            className="object-cover"
          />
        </Col>
        <Col span={12}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            // labelAlign="left"
            className="m-auto">
            <Title level={3} className="text-center">
              Login
            </Title>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 0, span: 24 }}
              className="text-center">
              <Space direction="vertical">
                <Button type="primary" className="px-xl">
                  Log in
                </Button>
                <Link to="/signin">No account ? Create one</Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
    // </Container>
  );
}
