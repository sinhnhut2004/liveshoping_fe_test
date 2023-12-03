import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table, Button, Row, Col, Typography, Layout, Image, Descriptions } from 'antd';
import orderAPI from 'api/order';

const OrderDetail = () => {
    const [order, setOrder] = useState(null);

    const getOrderByOrderCode = async (order_code) => {
        const order = await orderAPI.getOrderByOrderCode(order_code);
        setOrder(order);
    }

    const [searchParams] = useSearchParams();

    const formatCurrency = (amount) => {
        const options = {
          style: "currency",
          currency: "VND"
        };
    
        return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
      }

    useEffect(() => {
        const code = searchParams.get('id');
        getOrderByOrderCode(code);
    }, []);

    if (!order) {
        return <div>Loading...</div>;
    }

    const { Title, Text } = Typography;

    return (
        <Layout style={{ padding: '24px 50px' }}>
            <Title level={3} className="text-center">ORDER DETAIL {order.order_code}</Title>
            <Row>
                <Col span="8">
                    <Title level={4}>RECEIVER</Title>
                    <p><span style={{ fontWeight: 'bold' }}>Receiver: </span> {order.User.fullname}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Shipping address:</span> {order.shipping_address}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Email: </span> {order.User.email}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Phone number:</span> {order.User.phone_number}</p>
                </Col>

                <Col span="8">
                    <Title level={4}>PAYMENTS</Title>
                    <p><span style={{ fontWeight: 'bold' }}>Order Date:</span> {new Date(order.order_date).toLocaleString()}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Order Status:</span> {order.order_status}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Total Amount:</span> {order.total_price.toLocaleString("vi-VN", { style: "currency", currency: "VND", })}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Payment method:</span> {order.payment_method}</p>
                </Col>

                <Col span="8">
                    <Title level={4}>DELIVERY</Title>
                </Col>
            </Row>
            <Table
                columns={[
                    {
                        title: 'Product image',
                        dataIndex: 'Product_variant',
                        key: 'image',
                        render: Product_variant => (
                            <Image src={Product_variant.image} alt='xxx' width={80} height={80} />
                        ),
                    },
                    {
                        title: 'Product name',
                        dataIndex: 'Product_variant',
                        key: 'product_name',
                        render: Product_variant => Product_variant.Product.product_name,
                    },
                    {
                        title: 'Product detail',
                        dataIndex: 'Product_variant',
                        key: 'product_variant',
                        render: Product_variant => {
                          const productVariantDetails = [];
                          Product_variant.Variant_values.forEach(element => {
                            productVariantDetails.push(`${element.Option.name}: ${element.Option_value.value}`);
                          });
                      
                          return productVariantDetails.join(', ');
                        },
                    },
                    {
                        title: 'Quantity',
                        dataIndex: 'quantity',
                        render: quantity => quantity,
                    },
                    // {
                    //     title: 'Provided by',
                    //     dataIndex: 'Product_variant',
                    //     key: 'store',
                    //     render: Product_variant => Product_variant.Store ? (
                    //         <span>{Product_variant.Store.description}</span>
                    //     ) : null,
                    // },
                    {
                        title: 'Price',
                        dataIndex: 'Product_variant',
                        render: Product_variant => formatCurrency(Product_variant.price),
                    },
                    {
                        title: 'Subtotal',
                        dataIndex: 'Product_variant',
                        render: Product_variant => formatCurrency(Product_variant.price)
                    },
                ]}
                dataSource={order.Order_details}
            />
            <div>
                <Button onClick={() => {
                    // Redirect to order history page
                    window.location.href = '/orders';
                }}>
                    Back
                </Button>
            </div>
        </Layout>
    );
};

export default OrderDetail;