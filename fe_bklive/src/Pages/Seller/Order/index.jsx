import { Input, Table, Tag } from "antd";
import { useEffect, useState } from "react";

const OrderManagement = () => {

  const [searchedText, setSearchedText] = useState("");
  const [data , setData] = useState(null);

  const getData = async () => {
    const res = await fetch("http://localhost:8080/api/order",{
      method: "GET"
    });
    const data = await res.json();
    setData(data);
  };
  
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  const orderList = data?.map((data) => {
    return {
      key: data.id,
      id: data.id,
      orderId: `#${data.order_date}${data.id}`,
      totalPrice: `${data.total_price} VND`,
      shippingAddress: data.shipping_address,
      status: data.order_status,
      creationTime: data.order_date,
    }
  })
  // const data = [
  //   {
      // key: "1",
      // id: 1,
      // orderId: 65,
      // totalPrice: `${150}$`,
      // shippingAddress: "Hong Thuy-Le Thuy-Quang Binh",
      // status: "Wait confirm",
      // creationTime: "11:16 5/4/2023",
  //   },
  //   {
  //     key: "2",
  //     id: 2,
  //     orderId: 66,
  //     totalPrice: `${200}$`,
  //     shippingAddress: "Hong Thuy-Le Thuy-Quang Binh",
  //     status: "Wait confirm",
  //     creationTime: "11:16 5/4/2023",
  //   },
  //   {
  //     key: "3",
  //     id: 3,
  //     orderId: 66,
  //     totalPrice: `${200}$`,
  //     shippingAddress: "Hong Thuy-Le Thuy-Quang Binh",
  //     status: "Wait confirm",
  //     creationTime: "11:16 5/4/2023",
  //   },
  // ];
  return (
    <div className="list-order">
      <Input.Search
        placeholder="Search here...."
        style={{ marginBottom: 20, width: "25%" }}
        onSearch={(value) => {
            setSearchedText(value)
        }}
        onChange={(e) => {
            setSearchedText(e.target.value);
        }}
      />
      <Table
        columns={[
          {
            key: "1",
            title: "Order ID",
            dataIndex: "orderId",
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return (
                    String(record.orderId)
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                    String(record.totalPrice)
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                    String(record.shippingAddress)
                    .toLowerCase()
                    .includes(value.toLowerCase())
                )
            }
            
          },
          {
            key: "2",
            title: "Total price",
            dataIndex: "totalPrice",
          },
          {
            key: "3",
            title: "Shipping address",
            dataIndex: "shippingAddress",
          },
          {
            key: "4",
            title: "Status",
            dataIndex: "status",
            render: (record) => {
              return <Tag
                color={record === "pending" ? "processing" : "red"}
              >
                {record}
              </Tag>
            }
          },
          {
            key: "5",
            title: "Creation time",
            dataIndex: "creationTime",
          },
        ]}
        dataSource={orderList}

      ></Table>
    </div>
  );
};

export default OrderManagement;
