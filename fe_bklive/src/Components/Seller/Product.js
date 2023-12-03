import { Card, Rate } from 'antd';
import { Typography } from 'antd';
const { Title, Text } = Typography;
const { Meta } = Card;

function Product({ img, star, title, inStock, price, currency }) {
  return (
    <Card
    //   hoverable
      style={{ width:"70%",height: "10%" }}
      cover={<img alt="example" src={img} loading="lazy" />}
      className="m-4"
    >
      <div className="m-5" align="center">
        <div>
          <Title level={3}>{title}</Title>
        </div>
        <div>
          <Rate disabled defaultValue={star} />
        </div>
        <div>
          <Text>{inStock} In Stock</Text>
        </div>
        <div>
          <Text strong>{price + ' ' + currency} </Text>
        </div>
      </div>
    </Card>
  );
}

export default Product;