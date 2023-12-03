import { logDOM } from "@testing-library/react";
import { Button, Image, Table } from "antd";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"


const ChooseProduct = ({ setProductList }) => {
    const navigate = useNavigate();
    const [valueCheckbox, setValueCheckbox] = useState([])

    const columns = [
        {
          key: "1",
          title: "Image",
          dataIndex: "image",
          render: (value) => {
            return <Image src={value} width={100} height={40}/>
          }
          
        },
        {
          key: "2",
          title: "Product Name",
          dataIndex: "productName",
          
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
            
        },
        {
            key: "7",
            title: "Size",
            dataIndex: "size",
            
        },
        {
            key: "8",
            title: "Action",
            dataIndex: "action",
            
        },
      ];
    
      const data = [
        {
          key: "1",
          id: 1,
          image: "https://product.hstatic.net/200000305259/product/mockup_tee_mix_grey-blk_1_d34e4abd1a334239a7d7d7882d8a141d_large.jpg",
          productName: "Iphone 8 plus",
          category: 'Smartphone',
          stock: "320",
          price: `${300}$`,
          color: 'blue',
          size: 'L',
          action: 'edit'
        },
        {
          key: "2",
          id: 2,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47WcFi6QAwc2lfpArO0aWr2PxsL-Xmh6klA&usqp=CAU',
          productName: "Iphone 8 plus",
          category: 'Smartphone',
          stock: "320",
          price: `${300}$`,
          color: 'blue',
          size: 'L',
          action: 'edit'
        },
        {
          key: "3",
          id: 3,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM5U_3lpmZBE4ea8ZfnV_fAg4uBuykhpffY3MqIGcbHbtFG5KwoPePEPeqHLCNoblAoVg&usqp=CAU',
          productName: "Iphone 8 plus",
          category: 'Smartphone',
          stock: "320",
          price: `${300}$`,
          color: 'blue',
          size: 'L',
          action: 'edit'
        },
      ];
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setValueCheckbox(selectedRows)
        },
        hideSelectAll: "true",
        // getCheckboxProps: record => ({
        //   disabled: record.category === 'Smartphone', // Column configuration not to be checked
        //   name: record.category,
        // }),
      };
      const data2 = valueCheckbox.map(result => {
      
         return {
          key: `${result.key}`,
          id: `${result.id}`,
          image: `${result.image}`,
          productName: `${result.productName}`,
          category: `${result.category}`,
          stock: `${result.stock}`,
          expected: 200,
          price: `${result.price}`, 
          discount: 5
        }
      })
      const handleAddProduct = () => {
        setProductList(data2)
        navigate('/seller/livestream/create-livestream');
        
      }
      return (
        <div className="storeManagement">
          <Table columns={columns} dataSource={data} rowSelection={rowSelection}></Table>
          <Table columns={[
            {
              key: "1",
              title: "Image",
              dataIndex: "image",
              render: (value) => {
                return <Image src={value} width={100} height={40}/>
              }
              
            },
            {
              key: "2",
              title: "Product Name",
              dataIndex: "productName",
              
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
              title: "Expected",
              dataIndex: "expected",
              
            },
            {
              key: "6",
              title: "Price",
              dataIndex: "price",
              
            },
            {
              key: "7",
              title: "Discount",
              dataIndex: "discount",
              
            },

          ]} dataSource={data2}></Table>

          <Button 
          onClick={handleAddProduct}
          style={{
            backgroundColor: "#FF7008"
          }}>Add livestream</Button>
        </div>
        
      );
}

export default ChooseProduct;