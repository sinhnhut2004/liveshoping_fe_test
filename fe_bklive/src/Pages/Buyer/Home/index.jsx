import { Card, Layout, Typography } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { LivestreamCard } from 'UI/elements';
import { Slider, ProductList } from 'Components';
import { NavLink } from 'react-router-dom';
import data from 'Components/Buyer/DumpData';
import banner from 'Pages/Buyer/Product/images/banner.PNG';
import { Product, Panigation } from 'UI/elements';
import { Title } from 'UI/typo';
import { getAll } from '../../../api/voucher';
import { getAllCategory } from '../../../api/category';

const { Text } = Typography;

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const getCategories = async () => {
    const res = await fetch('http://localhost:8080/api/category', {
      method: 'GET',
    });
    const data = await res.json();
    setCategories(data);
  };

  const getProducts = async () => {
    const res = await fetch('http://localhost:8080/api/product', {
      method: 'GET',
    });
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const { livestreams } = data;
  const settings = {
    // className: 'center',
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 1,
    speed: 500,
    rows: window.screen.width > 768 ? 2 : 1,
    slidesPerRow: 6,
    infinite: true,
    draggable: false,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesPerRow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesPerRow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesPerRow: 3,
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
            // style={{
            //   height: '100px',
            //   backgroundColor: 'blue',
            //   padding: '16px',
            // }}
            alt="carousel"
            // className="mx-lg"
          />
        ))}
      </Slider>
      <Layout className="px-xl py-xxl">
        <Slider
          settings={{ ...settings, rows: 1 }}
          textLevel={window.screen.width > 576 ? 4 : 5}
          title="CATEGORIES"
        >
          {categories.map((item, index) => (
            <NavLink
              to={`/category?sort=category&value=${item.category_name}`}
              key={index}
              className="px-5"
            >
              <Card
                cover={
                  <img
                    alt="example"
                    src={item.image}
                    loading="lazy"
                    // className="!rounded-lg"
                  />
                }
                bodyStyle={{ display: 'none' }}
              ></Card>
              <Title level={5} className="text-center">{item.category_name}</Title>
            </NavLink>
          ))}
        </Slider>

        {window.screen.width > 576 ? (
          <Slider
            settings={{ ...settings, slidesPerRow: 5 }}
            textLevel={window.screen.width > 576 ? 4 : 5}
            title="LIVESTREAMS"
          >
            {livestreams.map((item, index) => (
              <NavLink to={`/live`} key={index} className="px-5">
                <LivestreamCard {...item} />
              </NavLink>
            ))}
          </Slider>
        ) : (
          ''
        )}

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
          textLevel={window.screen.width > 576 ? 4 : 5}
          title={'TOP PRODUCTS'}
        >
          {products.map((product, index) => (
            <NavLink to={`/product_detail?id=${product.id}`} key={product.id}>
              <Product {...product} />
            </NavLink>
          ))}
        </Slider>
        {console.log('products', products)}
        <Title level={4}>DAILY DISCOVER</Title>
        <ProductList products={products} />
        <Panigation className="text-center" />
      </Layout>
    </Fragment>
  );
}
