import Container from 'Components/Common/Container';
import {
  Form,
  Typography,
  Input,
  Tag,
  Table,
  Select,
  Button,
  Space,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import orderAPI from 'api/order';
import { useEffect } from 'react';
import { useState } from 'react';

const { Title } = Typography;
const { Search } = Input;

const columns = [
  {
    title: 'Order ID',
    dataIndex: 'order_code',
    key: 'id',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.order_code.localeCompare(b.order_code),
    render: (text) => <p className="font-bold">{text}</p>,
  },
  {
    title: 'Products',
    dataIndex: 'products',
    key: 'products',
    render: (product) => (
      <ul>
        {product.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Total price',
    dataIndex: 'total_price',
    key: 'total',
    // defaultSortOrder: 'ascend',
    sorter: (a, b) => a.total_price - b.total_price,
    render: (text) => {
      const newText = text.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return newText;
    }
  },
  {
    title: 'Shipping address',
    dataIndex: 'shipping_address',
    key: 'address',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'order_status',
    render: (status, { id }, index) => {
      let color = null;
      switch (status) {
        case 'completed':
          color = 'green';
          break;
        case 'pending':
          color = 'geekblue';
          break;
        default:
          //Canceled
          color = 'red';
          break;
      }
      return (
        <Tag color={color} key={index}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },

  {
    title: 'Order date',
    key: 'order_date',
    dataIndex: 'order_date',
    sorter: (a, b) => {
      const dateA = Date.parse(a.order_date);
      const dateB = Date.parse(b.order_date);
      return dateA - dateB;
    },
    render: (text) => {
      const date = new Date(text).toLocaleString()

      return date;
    },
  },
  {
    title: '',
    render: (row) => {
      return (
        <a href={`/order_detail?id=${row.order_code}`}>View detail</a>
      );
    },
  },
];

export default function Orders() {
  const [orders, setOrders] = useState();
  const [userId, setUserId] = useState(2);
  const [status, setStatus] = useState('all');
  const [total, setTotal] = useState();
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageCancelled, setCurrentPageCancelled] = useState(1);
  const [noOfRecords, setNoOfRecords] = useState(4);
  const [searchText, setSearchText] = useState();

  const getTotal = async () => {
    const data = await orderAPI.getOrdersOfUser(userId, status, searchText);
    setTotal(data.total);
  }

  const getOrdersOfUser = async (page) => {
    const ords = await orderAPI.getOrdersOfUser(userId, status, searchText, page, noOfRecords);
    setOrders(ords.orders);
  }

  const handleChangeStatus = (value) => {
    setStatus(value);
  }

  useEffect(() => {
    getTotal();
  }, [status, searchText])

  useEffect(() => {
    getOrdersOfUser(currentPageAll);
  }, [currentPageAll, status, searchText]);

  useEffect(() => {
    getOrdersOfUser(currentPageCompleted);
  }, [currentPageCompleted, status, searchText]);

  useEffect(() => {
    getOrdersOfUser(currentPagePending);
  }, [currentPagePending, status, searchText]);

  useEffect(() => {
    getOrdersOfUser(currentPageCancelled);
  }, [currentPageCancelled, status, searchText]);

  return (
    <Container>
      <Title level={2} className="text-center">
        Order Management
      </Title>
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // disabled={componentDisabled}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Status">
            <Space>
              <Select
                defaultValue='all'
                style={{ width: 120 }}
                onChange={handleChangeStatus}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
              />
              <Search
                placeholder="Find Orders by order ID"
                style={{ minWidth: '300px' }}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Space>
          </Form.Item>
        </Form>
        {status == 'all' &&
          <Table
            columns={columns}
            dataSource={orders}
            pagination={{
              position: ['bottomRight'],
              pageSize: noOfRecords,
              total: total,
              current: currentPageAll,
              onChange: (currentPageAll) => {
                getOrdersOfUser(currentPageAll);
                setCurrentPageAll(currentPageAll);
              }
            }}
          />
        }
        {status == 'completed' &&
          <Table
            columns={columns}
            dataSource={orders}
            pagination={{
              position: ['bottomRight'],
              pageSize: noOfRecords,
              total: total,
              current: currentPageCompleted,
              onChange: (currentPageCompleted) => {
                getOrdersOfUser(currentPageCompleted);
                setCurrentPageCompleted(currentPageCompleted);
              }
            }}
          />
        }
        {status == 'pending' &&
          <Table
            columns={columns}
            dataSource={orders}
            pagination={{
              position: ['bottomRight'],
              pageSize: noOfRecords,
              total: total,
              current: currentPagePending,
              onChange: (currentPagePending) => {
                getOrdersOfUser(currentPagePending);
                setCurrentPagePending(currentPagePending);
              }
            }}
          />
        }
        {status == 'cancelled' &&
          <Table
            columns={columns}
            dataSource={orders}
            pagination={{
              position: ['bottomRight'],
              pageSize: noOfRecords,
              total: total,
              current: currentPageCancelled,
              onChange: (currentPageCancelled) => {
                getOrdersOfUser(currentPageCancelled);
                setCurrentPageCancelled(currentPageCancelled);
              }
            }}
          />
        }
      </div>
    </Container>
  );
}
