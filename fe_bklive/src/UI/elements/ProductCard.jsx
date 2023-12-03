import { Card, Rate } from 'antd';
import { Typography } from 'antd';
const { Title, Text } = Typography;
const { Meta } = Card;

// function Product({ image, star, title, inStock, price, currency }) {
//   return (
//     <Card
//       hoverable
//       // style={{ width: 240 }}
//       cover={<img alt="example" src={image} loading="lazy" />}
//       className="m-4"
//     >
//       <div align="center">
//         <div>
//           <Title level={window.screen.width > 576 ? 2 : 5}>{title}</Title>
//         </div>
//         <div>
//           <Rate
//             disabled
//             defaultValue={star}
//             style={{ fontSize: window.screen.width > 576 ? 20 : 14 }}
//           />
//         </div>
//         <div>
//           <Text>{60} In Stock</Text>
//           {/* <Text>{inStock} In Stock</Text> */}
//         </div>
//         <div>
//           <Text strong>200.000 VND </Text>
//           {/* <Text strong>{price + ' ' + currency} </Text> */}
//         </div>
//       </div>
//     </Card>
//   );
// }

const formatCurrency = (amount) => {
  const options = {
    style: "currency",
    currency: "VND"
  };

  return amount.toLocaleString("vi-VN", options).replace("₫", "đ");
}


function Product({ Product_images, star, product_name, inStock, Product_variants, currency }) {
  return (
    <Card
      hoverable
      // style={{ width: 240 }}
      cover={<img alt="example" src={Product_images[0].image} loading="lazy" />}
      className="m-4"
    >
      <div align="center">
        <div>
          <Title level={window.screen.width > 576 ? 5 : 5}>{product_name}</Title>
        </div>
        <div>
          <Rate
            disabled
            defaultValue={Math.floor(Math.random() * (5 - 3 + 1)) + 3}
            style={{ fontSize: window.screen.width > 576 ? 14 : 10 }}
          />
        </div>
        {/* <div>
          <Text>{Product_variants[0].quantity} products available</Text>
        </div> */}
        <div>
          <Text type="danger" strong>{formatCurrency(Product_variants[0].price)}</Text>
          {/* <Text strong>{price + ' ' + currency} </Text> */}
        </div>
      </div>
    </Card>
  );
}

export default Product;
