import React, { Fragment, useEffect, useState } from 'react';
import { Col, Layout, Radio, Row, Space, Input, Breadcrumb } from 'antd';
import { ProductList, Slider } from '../../../Components';
import data from '../../../Components/Buyer/DumpData';
import banner from '../../../Resources/assets/img/banner.PNG';
import { NavLink } from 'react-router-dom';
import { Panigation, Product } from 'UI/elements';
const { Search } = Input;

export default function Category() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await fetch('http://localhost:8080/api/product', {
      method: 'GET',
    });
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const settings = {
    // className: 'center',
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 6,
    infinite: true,
    draggable: false,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesPerRow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesPerRow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesPerRow: 2,
        },
      },
    ],
  };
  return (
    <Fragment>
      <Slider
        settings={{
          ...settings,
          rows: 1,
          slidesToShow: 1,
          slidesPerRow: 1,
          responsive: [],
        }}
      >
        {[banner, banner, banner].map((item, index) => (
          <img
            src={item}
            key={index}
            style={{ height: '100px', backgroundColor: 'blue' }}
            alt="carousel"
          />
        ))}
      </Slider>

      <Layout className="px-xl py-xxl">
        <Row align="middle" justify={'space-between'}>
          <Col span={24}>
            <Breadcrumb
              separator=">"
              items={[
                {
                  title: 'Category',
                  href: '/product',
                },
                {
                  title: 'Catergogry 1',
                  href: '',
                },
              ]}
            />
          </Col>
          <Col>
            {window.screen.width > 430 ? <span>Sort by</span> : ''}

            <Radio.Group
              defaultValue="a"
              buttonStyle="solid"
              className="mx-md"
              size={window.screen.width > 430 ? 'large' : 'small'}
            >
              <Space>
                <Radio.Button value="a">Popular</Radio.Button>
                <Radio.Button value="b">Latest</Radio.Button>
                <Radio.Button value="c">Top Sales</Radio.Button>
              </Space>
            </Radio.Group>
          </Col>
          <Col>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size={window.screen.width > 430 ? 'large' : 'small'}
              onSearch={() => {}}
              style={{ width: window.screen.width > 430 ? '100%' : '150px' }}
            />
          </Col>
        </Row>

        <ProductList products={products} />

        <Panigation className="text-center" />
        <Slider
          settings={{
            ...settings,
            rows: 1,
            slidesToShow: 1,
            slidesPerRow: 6,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesPerRow: 3,
                },
              },
              {
                breakpoint: 576,
                settings: {
                  slidesPerRow: 2,
                },
              },
            ],
          }}
          textLevel={2}
          title={'TOP PRODUCTS'}
        >
          {products.map((product, index) => (
            <NavLink to={`/product_detail?id=${product.id}`} key={product.id}>
              <Product {...product} />
            </NavLink>
          ))}
        </Slider>
        <Slider
          settings={{
            ...settings,
            rows: 1,
            slidesToShow: 1,
            slidesPerRow: 6,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesPerRow: 3,
                },
              },
              {
                breakpoint: 576,
                settings: {
                  slidesPerRow: 2,
                },
              },
            ],
          }}
          textLevel={2}
          title={'DAILY DISCOVERY'}
        >
          {products.map((product, index) => (
            <NavLink to={`/product_detail?id=${product.id}`} key={product.id}>
              <Product {...product} />
            </NavLink>
          ))}
        </Slider>
      </Layout>
    </Fragment>
  );
}
