import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Form, Input, Radio, Select, Button, List, Image, Typography, Checkbox, Divider, InputNumber } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cartAPI from 'api/cart';
import orderAPI from 'api/order';
import notificationAPI from 'api/notification';

const { Title, Text } = Typography;

const { Option } = Select;

const Checkout = () => {
  const [userId, setUserId] = useState(2);
  const [cart, setCart] = useState();

  const [changePrice, setChangePrice] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [temporaryPrice, setTemporaryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //receiver infomation
  const [name, setName] = useState('Nguyễn Văn B');
  const [address, setAddress] = useState('Sài Gòn city');
  const [phone, setPhone] = useState('0337510002');
  const [email, setEmail] = useState('buy02@gmail.com');

  const [paymentMethod, setPaymentMethod] = useState('cash');


  const getCartOfUserId = async (userId) => {
    const res = await cartAPI.getCartOfUserId(userId);
    setCart(res.Cart_products);
    if (cart != null) {
      handleTotalPrice();
    }
  }

  const getTotalPrice = async (userId) => {
    const res = await cartAPI.getTotalPrice(userId);
    setTemporaryPrice(res.total_price);
    setTotalPrice(res.total_price);
  }

  const handleTotalPrice = () => {
    if (cart != null) {
      let totalPrice = 0;
      cart.forEach((item) => {
        if (item.checked) {
          totalPrice += item.Product_variant.price * item.quantity;
        }
      });
      setTotalPrice(totalPrice);
    }
  };

  const formatCurrency = (amount) => {
    const options = {
      style: "currency",
      currency: "VND"
    };

    return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
  }


  const createOrder = async () => {
    console.log("total: ", totalPrice);
    await orderAPI.createOrder('pending', paymentMethod, totalPrice, address, userId, name, email, phone, cart);
    toast('Order successfully', {
      position: 'top-right',
    });
    createNotification();
  }

  const createNotification = async () => {
    console.log("here");
    await notificationAPI.createNotification('Order successfully', 'Order successfully - status: pending', 'avatar', userId, 3);
  }

  useEffect(() => {
    getCartOfUserId(userId);
    getTotalPrice(userId);
  }, []);


  const handleSubmit = (values) => {
    // Handle logic when the user clicks on the "Checkout" button
    console.log(values);
  };

  return (
    <Layout style={{ padding: '24px 50px' }}>
      {console.log("cart: ", cart)}
      <Row gutter={16}>
        <Col span={8}>

          <div style={{ marginRight: '16px', flex: '3' }}>
            <List
              itemLayout="vertical"
              dataSource={cart}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  extra={<Image width={150} src={item.Product_variant.image} alt={item.Product_variant.Product.Product_images[0].image} />}
                >
                  <List.Item.Meta
                    title={item.Product_variant.Product.product_name + ' - ' + formatCurrency(item.Product_variant.price)}
                    description={
                      item.Product_variant.Variant_values.map((variant_value) => (
                        <>
                          <span key={variant_value.id}>
                            {'-'} {variant_value.Option_value.value} {' '}
                          </span>
                        </>
                      ))
                    }
                  />

                  <Divider />
                  <Text>Quantity: {item.quantity}</Text>
                </List.Item>
              )}
            />

          </div>

        </Col>

        <Col span={8}>
          <Card title="Delivery Information">

          </Card>
          <Form onFinish={handleSubmit} layout="vertical" style={{ marginTop: '24px' }}>
            <Form.Item label="Receiver" name="receiver" rules={[{ required: true }]}>
              <Input defaultValue={name} />
            </Form.Item>

            <Form.Item label="Shipping Address" name="address" rules={[{ required: true }]}>
              <Input defaultValue={address} />
            </Form.Item>

            <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
              <Input defaultValue={phone} />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input defaultValue={email} />
            </Form.Item>

          </Form>
        </Col>

        <Col span={8}>
          <Card title="Payment Information">
            <Radio.Group defaultValue={1}>
              <Radio value={1}>Pay on delivery</Radio>
              <Radio value={2}>Pay with PayPal</Radio>
            </Radio.Group>

            <Form style={{ marginTop: '24px' }}>
              <h2 style={{ marginBottom: '24px' }}>Temporary price: {formatCurrency(temporaryPrice)}</h2>
              <Form.Item label="Voucher">
                <Select placeholder="Select a voucher" disabled="true">
                  {/* Display voucher list */}
                  <Option value="voucher1">Voucher 1</Option>
                  <Option value="voucher2">Voucher 2</Option>
                  {/* ... */}
                </Select>
              </Form.Item>
            </Form>
            <h2 style={{ marginTop: '24px' }}>Change: {formatCurrency(changePrice)}</h2>
            <h2 style={{ marginTop: '24px' }}>Delivery cost: {formatCurrency(deliveryCost)}</h2>
            <h2 style={{ marginTop: '24px' }}>Total Price: {formatCurrency(temporaryPrice - changePrice + deliveryCost)}</h2>

            <Button type="primary" style={{ background: '#1890ff', marginTop: '24px' }} onClick={() => createOrder()}><a href={'/orders'}>Order</a></Button>
          </Card>
        </Col>
      </Row>

    </Layout>

  );
};

export default Checkout;
