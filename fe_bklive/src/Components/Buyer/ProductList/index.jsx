import { Fragment } from 'react';
import { Product } from 'UI/elements';
import { Col, Row, Typography, Link, Empty } from 'antd';
import { NavLink } from 'react-router-dom';

const { Title } = Typography;

function ProductList({ products, title }) {
  return (
    <Fragment>
      {products ? (
        <Row>
          {products.map((product, index) => (
            <Col key={product.id} span={12} md={8} sm={12} lg={8} xl={4}>
              <NavLink to={`/product_detail?id=${product.id}`}>
                <Product key={product.id} {...product} />
              </NavLink>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty />
      )}
    </Fragment>
  );
}

export default ProductList;
