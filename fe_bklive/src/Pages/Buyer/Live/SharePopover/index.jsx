import { Col, Row, Typography } from 'antd';
import gmail from 'Resources/assets/img/gmail.png';
import facebook from 'Resources/assets/img/facebook.png';
import { SmileOutlined, SmileFilled } from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;

export default function SharePopover() {
  return (
    <div className="p-xl max-w-[300px]" align="middle">
      <Row align="middle" gutter={16}>
        <Col span={12}>
          <a href="https://www.gmail.com" target="_blank"> <img src={gmail} width="50px" alt="gmail_logo" /></a>
        </Col>
        <Col span={12}>
          <a href="https://www.facebook.com" target="_blank"><img src={facebook} width="50px" alt="facebook_logo" /></a>
        </Col>
        <Paragraph
          underline
          copyable={{
            tooltips: ['click here to coppy'],
          }}>
          http://localhost:3000/live
        </Paragraph>
      </Row>
    </div>
  );
}
