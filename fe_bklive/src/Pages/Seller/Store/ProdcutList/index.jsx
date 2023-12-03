import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, Modal, Select, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import makeRequest from "../../../../utils/axios";


const StoreManagement = ({ setEditingProduct }) => {
  const [data, setData] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [infoProduct, setInfoProduct] = useState(null);

  const navigate = useNavigate();

  const getData = async () => {
    // const res = await fetch("http://localhost:8080/api/product");
    // const dt = await res.json();
    // setData(dt);
    // const res = await axios.get("http://localhost:8080/api/product",{
    //   withCredentials: true,
    // })
    const res = await makeRequest.get('/product');
    setData(res.data);
  };
  console.log(data);
  useEffect(() => {
    getData();
  }, []);
  const productList = data?.map((data) => {
    return {
      key: data.id,
      id: data.id,
      image: data.image,
      productName: data.product_name,
      category: data.Category.category_name,
      stock: data.Product_detail,
      price: `${300}$`,
      color: "blue",
      size: "L",
    };
  });

  const onDetailProduct = (record) => {
    setInfoProduct(record);
    setIsDetail(true);
  };

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
  const onEditProduct = (record) => {
    setEditingProduct(record);
    navigate(`/seller/store/edit-product/${record.id}`);
  };

  const resetProduct = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  const columns = [
    {
      key: "1",
      title: "Image",
      dataIndex: "image",
      render: (value) => {
        return <Image src={value} width={100} height={40} />;
      },
    },
    {
      key: "2",
      title: "Product Name",
      dataIndex: "productName",
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
      title: "Category",
      dataIndex: "category",
      
    },
    {
      key: "4",
      title: "Stock",
      dataIndex: "stock",
    },
    {
      key: "5",
      title: "Price",
      dataIndex: "price",
    },
    {
      key: "6",
      title: "Color",
      dataIndex: "color",
      // render: (value) => {
      //   value?.map((v) => {
      //     <Select
      //     defaultValue="lucy"
      //     style={{ width: 120 }}
      //     options={[
      //       { value: "jack", label:"Jack"},
      //     ]}
      //   />;
      //   })
        
      // },
    },
    {
      key: "7",
      title: "Size",
      dataIndex: "size",
    },
    {
      key: "8",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <FileSearchOutlined
              onClick={() => onDetailProduct(record)}
              style={{ color: "blue", marginLeft: "10px" }}
            />
            <EditOutlined
              onClick={() => {
                onEditProduct(record);
              }}
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
          New product
        </Button>
      </div>

      <Table columns={columns} dataSource={productList}></Table>
      {/* <Modal
        title="Edit Product"
        open={isEditing}
        onOk={() => {
          
          setData(pre => {
            return pre.map(product => {
              if(product.id === editingProduct.id) return editingProduct;
              else return product
            })
          })
          resetProduct();
          
          
        }}
        onCancel={() => {
          resetProduct();
        }}
      >
        <Input 
          value={editingProduct?.productName} 
          onChange={(e) => {
          setEditingProduct(pre => {
            return {...pre, productName: e.target.value}
          })
        }} 
        />
        <Input 
          value={editingProduct?.category}
          onChange={(e) => {
            setEditingProduct(pre => {
              return {...pre, category: e.target.value}
            })
          }}  
        />
      </Modal> */}
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

export default StoreManagement;
