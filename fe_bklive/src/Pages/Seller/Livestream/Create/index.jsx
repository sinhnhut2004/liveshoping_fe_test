import { Button, Calendar, DatePicker, Form, Image, Input, Modal, Radio, Table, Typography, Upload } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LivestreamScreen from "../../../../Components/Seller/LivestreamScreen";
import "./index.css"





const CreateLiveStream = ({productList}) => {

  const [value, setValue] = useState("livenow");
  const [showComponent, setShowComponent] = useState(false);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // setShowComponent(!showComponent); // Khi click button, thay đổi trạng thái của showComponent
    navigate('/seller/livescreen')
  }
  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const handleNavigate = () => {
    navigate('/seller/livestream/create-livestream/choose-products')
  }
  console.log(productList);

  const onFinish = (e) => {
    console.log(e);
  }

  return (
    <>
    {/* {showComponent? (<> <LivestreamScreen />
    </>) : (
    <> */}
      <div className="livestream">
      <Typography.Title type="success">Create livestream</Typography.Title>

      <Form
        onFinish={onFinish}
        name="wrap"
        labelCol={{
          flex: '130px',
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={{
          maxWidth: "80%",
        }}
      >
        <Form.Item className="form-label" label="Title" name="title">
          <Input className="form-input" style={{width: "70%"}} size="large" />
        </Form.Item>
        <Form.Item label="Thumnail" name="thumnail">
          <Upload.Dragger 
            style={{width: "10%"}}
            listType="picture" 
            accept=".png,.jpeg">
            Insert image
          </Upload.Dragger>
        </Form.Item>
        <Form.Item className="form-label" label="Description" name="description">
          <Input.TextArea className="form-input" style={{width: "70%"}} size="large"/>
        </Form.Item>
        <Form.Item className="me-2" label="Livestream time?">
          <Radio.Group onChange={onChange} value={value}>
            <Radio value="livenow">Live now</Radio>
            <Radio value="schedule">Schedule</Radio>
          </Radio.Group>
        </Form.Item>
        {
          value === 'schedule' ?
          <>
            <Form.Item label="Start time">
              <DatePicker showTime />
            </Form.Item>
           
          </> : 
          <br />
        }

        <div className="choose-products">
        <Button 
          style={{
            backgroundColor: "#3E7FFF",
            
        }}
          onClick={handleNavigate}
        >Choose products</Button>
        {productList ?
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

        ]} dataSource={productList}></Table> : 
         <Typography.Paragraph 
          type="danger"
          style={{
            border: "2px solid black",
            padding: "10px",
        }}
         >
          No products have been selected, please select products
          </Typography.Paragraph>}
        </div>
        
        <div className="livestream-button"> 
            <Button
              htmlType="submit"
              className="buttonlive"
              onClick={handleButtonClick}
            >Create</Button>
            <Button danger={true}>Cancel</Button>
        </div>
      </Form>
    </div>
    
    {/* </> */}
    {/* //)
  //} */}


    </>
  
  );
};



export default CreateLiveStream;
