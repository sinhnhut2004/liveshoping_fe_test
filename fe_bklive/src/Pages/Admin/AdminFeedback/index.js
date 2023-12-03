import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "Components/Admin/API";

function AdminFeedback() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Attached Images",
            dataIndex: "thumbnail",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "Date",
            dataIndex: "title",
          },
          {
            title: "Sender's Email",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          // {
          //   title: "Rating",
          //   dataIndex: "rating",
          //   render: (rating) => {
          //     return <Rate value={rating} allowHalf disabled />;
          //   },
          // },
          {
            title: "Type",
            dataIndex: "stock",
          },

          {
            title: "Content",
            dataIndex: "brand",
          },
          {
            title: "Status",
            dataIndex: "category",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default AdminFeedback;
