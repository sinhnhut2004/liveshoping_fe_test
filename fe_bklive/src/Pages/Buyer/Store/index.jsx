import React, { Fragment, useState, useEffect } from 'react';
import { useQuery } from '../../../Hooks';
import {
  Col,
  Layout,
  Radio,
  Row,
  Space,
  Input,
  Breadcrumb,
  Typography,
  Card,
  Button
} from 'antd';
import { ProductList, Slider } from 'Components';
import data from 'Components/Buyer/DumpData';
import { Link, NavLink, redirect } from 'react-router-dom';
import { Panigation, Product } from 'UI/elements';
import { LivestreamCard } from 'UI/elements';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Search } = Input;

// function breadcrumbItem(item ) {
function itemRender(route, params, items, paths) {
  console.log('items', items);
  const last = items.indexOf(route) === items.length - 1;
  return last ? (
    <span>{route.title}</span>
  ) : (
    <Link to={paths.join('/')}>{route.title}</Link>
  );
}

const { Meta } = Card;

const Store = () => {
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const getCategories = async () => {
    const res = await fetch("http://localhost:8080/api/category", {
      method: "GET",
    });
    const data = await res.json();
    setCategories(data);
  };

  const getProducts = async () => {
    const res = await fetch("http://localhost:8080/api/product", {
      method: "GET",
    });
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const { livestreams } = data;
  const { sort, value } = useQuery();

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

  //handle click button

  const [followed, setFollowed] = useState(true);

  const handleFollowClick = () => {
    console.log('followed');
    setFollowed(true);
  }

  const handleUnfollowClick = () => {
    console.log('unfollowed');
    setFollowed(false);
  }

  const navigate = useNavigate();
  const handleMessageClick = () => {
    // console.log('chat');
    // return redirect('/chat');
    navigate('/chat');
  }

  return (
    <Fragment>
      <div style={{ position: 'relative' }}>
        <img
          alt="background"
          src="https://cdn.tgdd.vn/Files/2020/03/30/1245645/vector-landscape-wallpaper-by-wallsbyjfl-_2048x1152-800-resize.jpg" // Đường dẫn đến ảnh nền cửa hàng
          style={{ width: '100%', height: '200px' }}
        />
        <div
          style={{
            position: 'absolute',
            top: '80%',
            left: '10%',
            transform: 'translate(-50%, -50%)',
          }}>
          <Card
            style={{ width: 200 }}
            cover={
              <img
                alt="avatar"
                src="data:image/jpeg;base64,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"
              /> // Đường dẫn đến ảnh đại diện cửa hàng
            }>

            <Space wrap>
              <Meta title="PinkBlack Fashion" description="100.000 followers" />
            </Space>

            <Space wrap>
              {
                (followed) ? (
                  <Button type="primary" danger size="small" onClick={handleUnfollowClick}>
                    Unfollow
                  </Button>

                ) : (
                  <Button type="primary" size="small" onClick={handleFollowClick}>
                    Follow
                  </Button>
                )
              }

              <Button type="primary" size="small" onClick={handleMessageClick}>
                Message
              </Button>
            </Space>
          </Card>
        </div>
      </div>

      <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
        <p>Chúng tôi tự hào là địa chỉ mua sắm tuyệt vời cho những người yêu thích phong cách và sự cá nhân hóa.
        </p>
      </div>

      <div>
        <br></br>
        <br></br>
        <br></br>
      </div>



      <Layout className="px-xl py-xxl">

        <Slider
          settings={{
            ...settings,
            rows: 1,
            slidesToShow: 1,
            slidesPerRow: 6
          }}
          textLevel={4}
          title="LIVESTREAMS">
          {livestreams.map((item, index) => (
            <NavLink to={`/live`} key={index} className="px-5">
              <LivestreamCard {...item} />
            </NavLink>
          ))}
        </Slider>

        <Slider
          settings={{
            ...settings,
            rows: 1,
            slidesToShow: 1,
            slidesPerRow: 10,
            // responsive: [],
          }}
          textLevel={4}
          title="PRODUCT CATEGORIES">
          {categories.map((item, index) => (
            <NavLink
              to={`/category?sort=category&value=${item.title}`}
              key={index}
              className="px-5">
              <Card
                // style={{ width: 300 }}
                // key={index}
                cover={
                  <img
                    alt="example"
                    src={item.image}
                    loading="lazy"
                  // className="!rounded-lg"
                  />
                }
                bodyStyle={{ display: 'none' }}></Card>
              <Title level={5} className="text-center">
                {item.category_name}
              </Title>
            </NavLink>
          ))}
        </Slider>

        {!(sort && value) ? (
          <Fragment>
            <Title level={4}>TOP PRODUCTS</Title>
            <ProductList products={products} />

            <Panigation className="text-center" />
          </Fragment>
        ) : (
          <Slider
            settings={{
              ...settings,
              rows: 1,
              slidesToShow: 1,
              slidesPerRow: 6,
              responsive: [],
            }}
            textLevel={4}
            title={'TOP PRODUCTS'}>
            {products.map((product, index) => (
              <NavLink to={`/product_detail?id=${product.id}`} key={product.id}>
                <Product {...product} />
              </NavLink>
            ))}
          </Slider>
        )}

      </Layout>
    </Fragment >
  );
};

export default Store;
