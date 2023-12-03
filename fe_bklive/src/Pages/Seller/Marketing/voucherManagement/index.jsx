import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, Modal, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import makeRequest from "../../../../axios";
import axios from "axios";

const VoucherManagement = () => {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [infoProduct, setInfoProduct] = useState(null);

  const navigate = useNavigate();
  //onst URL = process.env.BASE_URL;
  const onDetailProduct = (record) => {
    setInfoProduct(record);
    setIsDetail(true);
  };

  //   const getData = () => {
  //     fetch("http://localhost:8000/api/voucher/getAll", {
  //       method: "GET",
  //     });
  //   };

  //console.log(getAll);
  //getData();
  //   useEffect(() => {
  //     getData();
  //   }, []);
  const getData = async () => {
    const res = await fetch("http://localhost:8080/api/voucher/getAll", {
      method: "GET",
    });
    const data = await res.json();
    setData(data);
  };

  //console.log(getAll);
  //getData();
  useEffect(() => {
    getData();
  }, []);
// const getData = async () => {
//     const res = await axios.get("http://localhost:8000/api/voucher/getAll");
//     setData(res.data);
//   };

  //console.log(getAll);
  //getData();
//   useEffect(() => {
//     getData();
//   }, []);
  //console.log(data);
  const listVoucher = data?.map((data) => {
    return {
      key: data.id,
      id: data.id,
      voucher_code: data.code,
      discount: data.discount_value,
      quantity: data.quantity,
      apply: data.apply,
      creation_time: data.create_date,
      expire_time: data.expire_time,
    };
  });
  const onDeleteProduct = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this product record?",
      okeText: "Yes",
      okeType: "danger",
      onOk: () => {
        setData((pre) => {
          return pre.filter((product) => product.id !== record.id);
        });
      },
    });
  };
  // const onEditProduct = (record) => {
  //   setIsEditing(true);
  //   setEditingProduct(record);
  // }
  //   const onEditProduct = (record) => {
  //     setEditingProduct(record);
  //     navigate(`/seller/store/edit-product/${record.id}`)
  //   }

  //   const resetProduct = () => {
  //     setIsEditing(false);
  //     setEditingProduct(null);
  //   }

  const columns = [
    {
      key: "1",
      title: "Voucher code",
      dataIndex: "voucher_code",
    },
    {
      key: "2",
      title: "Discount",
      dataIndex: "discount",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.productName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.category).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      key: "3",
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      key: "4",
      title: "Apply",
      dataIndex: "apply",
    },
    {
      key: "5",
      title: "Creation time",
      dataIndex: "creation_time",
    },
    {
      key: "6",
      title: "Expire time",
      dataIndex: "expire_time",
    },
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <FileSearchOutlined
              onClick={() => onDetailProduct(record)}
              style={{ color: "blue", marginLeft: "10px" }}
            />
            <EditOutlined
              //   onClick={() => {
              //     onEditProduct(record);
              //   }}
              style={{ color: "#FF7008", marginLeft: "10px" }}
            />
            <DeleteOutlined
              style={{ color: "red", marginLeft: "10px" }}
              onClick={() => {
                onDeleteProduct(record);
              }}
            />
          </>
        );
      },
    },
  ];
  const onAddProduct = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newProduct = {
      key: randomNumber,
      id: randomNumber,
      image:
        "https://product.hstatic.net/200000305259/product/mockup_tee_mix_grey-blk_1_d34e4abd1a334239a7d7d7882d8a141d_large.jpg",
      productName: "Iphone 8 plus",
      category: "Electronic",
      stock: "320",
      price: `${300}$`,
      color: "blue",
      size: "L",
    };
    setData((pre) => {
      return [...pre, newProduct];
    });
  };

  return (
    <div className="storeManagement">
      <div className="filteredProduct">
        <Input.Search
          placeholder="Enter search..."
          style={{
            width: "25%",
            marginBottom: "20px",
          }}
          onSearch={(value) => {
            setSearchedText(value);
            //console.log(value);
          }}
          onChange={(e) => {
            setSearchedText(e.target.value);
            //console.log(e.target.value);
          }}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={onAddProduct}
          style={{
            backgroundColor: "#0C51D7",
          }}
        >
          Create voucher
        </Button>
      </div>

      <Table columns={columns} dataSource={listVoucher}></Table>

      <Modal
        open={isDetail}
        onOk={() => {
          setIsDetail(false);
        }}
        onCancel={() => {
          setIsDetail(false);
        }}
      >
        <Typography.Text>
          productName: {infoProduct?.productName}
        </Typography.Text>
        <br />
        <Typography.Text>Category: {infoProduct?.category}</Typography.Text>
      </Modal>
    </div>
  );
};

export default VoucherManagement;
