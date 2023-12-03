import React, { useState, useEffect } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import {
  Button,
  List,
  Image,
  Checkbox,
  InputNumber,
  Divider,
  Select,
  Typography,
  Rate
} from 'antd';
import Layout from 'antd/es/layout/layout';

import { NavLink } from 'react-router-dom';

import cartAPI from 'api/cart';

const { Title, Text } = Typography;

const ShoppingCart = () => {

  const [totalPrice, setTotalPrice] = useState(0);

  const [userId, setUserId] = useState(2);

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState();

  // change quantity or check
  const [change, setChange] = useState(false);

  const getCartOfUserId = async (userId) => {
    const res = await cartAPI.getCartOfUserId(userId);
    setCart(res.Cart_products);
    if (cart != null) {
      handleTotalPrice();
    }
  }

  const getProducts = async () => {
    const res = await fetch("http://localhost:8080/api/product", {
      method: "GET",
    });
    const data = await res.json();
    setProducts(data);
  };

  const updateCartTotalPrice = async (total_price) => {
    await cartAPI.updateCartTotalPrice(userId, total_price)
  }

  const formatCurrency = (amount) => {
    const options = {
      style: "currency",
      currency: "VND"
    };

    return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
  }


  useEffect(() => {
    getProducts();
    getCartOfUserId(userId);
    console.log("cart: ", cart);
  }, []);

  useEffect(() => {
    updateCartTotalPrice(totalPrice);
  }, [change]);

  const handleQuantityChange = (id, quantity) => {
    const updatedCard = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: quantity,
        };
      }
      setChange(!change);
      return item;
    });

    setCart(updatedCard);
    console.log('cart', cart);
    if (cart != null) {
      handleTotalPrice();
    }
  };

  const handleCheckboxChange = (id) => {
    const updatedCard = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setChange(!change);
    setCart(updatedCard);
    if (cart != null) {
      handleTotalPrice();
    }
  };

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

  const { Option } = Select;

  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <Layout style={{ padding: '24px 50px' }}>
      <div>
        <Title level={4}>SHOPPING CART</Title>
        <div style={{ display: 'flex' }}>
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

                  <Checkbox
                    checked={item.checked}
                    defaultChecked={true}
                    onChange={() => handleCheckboxChange(item.id)}
                  >
                    Add to Cart
                  </Checkbox>
                  <Divider />
                  <InputNumber
                    min={1}
                    defaultValue={item.quantity}
                    onChange={(quantity) =>
                      handleQuantityChange(item.id, quantity)
                    }
                  />
                  <Select
                    style={{ width: 200 }}
                    placeholder="Select a voucher"
                    value={selectedValue}
                    onChange={handleChange}
                    disabled="true"
                  >
                    <Option value="option1">Voucher 1</Option>
                    <Option value="option2">Voucher 2</Option>
                    <Option value="option3">Voucher 3</Option>
                  </Select>
                </List.Item>
              )}
            />

            <div>
              <Divider />
              <h2>Total Price: ${totalPrice}</h2>
              <Button
                icon={<ShoppingCartOutlined />}
                type="primary"
                // style={{ background: '#1890ff' }}
                // onClick={updateCartTotalPrice(totalPrice)}
                className="bg-[#1890ff]"
              >
                <a href={'/checkout'}>Checkout</a>

              </Button>
            </div>

          </div>

          <div className="mr-xl flex-1"></div>
          <div style={{ flex: '1' }}>
            <Title level={4}>RELATED PRODUCTS</Title>
            <List
              itemLayout="vertical"
              dataSource={products}
              renderItem={(product) => (
                <NavLink to={`/product_detail?id=${product.id}`} key={product.id}>

                  <List.Item
                    key={product.id}
                    extra={
                      <Image width={100} src={product.Product_images[0].image} alt={product.product_name} />
                    }
                  >
                    <List.Item.Meta
                      title={product.product_name}
                      description={
                        <>
                          <Rate
                            disabled
                            defaultValue={Math.floor(Math.random() * (5 - 3 + 1)) + 3}
                            style={{ fontSize: window.screen.width > 576 ? 14 : 10 }}
                          />
                          <Text type="danger" strong>{formatCurrency(product.Product_variants[0].price)}</Text>
                        </>}
                    />

                  </List.Item>
                </NavLink>
              )}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShoppingCart;
