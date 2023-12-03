import { Button, Form, Input, Typography, Upload } from "antd";


const CreateVoucher = () => {
  const handleSaveProduct = (e) => {
    console.log(e);
  };

  return (
    <div className="create-product">
      <Form
        onFinish={handleSaveProduct}
        style={{
          maxWidth: "80%",
          padding: "20px",
        }}
        size="large"
        className="create-product-form"
        name="wrap"
        labelCol={{
          flex: "150px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
      >
        <Form.Item label="Product image" name="product-image">
          <Upload.Dragger
            style={{ width: "10%" }}
            listType="picture"
            accept=".png,.jpeg"
          >
            Insert image
          </Upload.Dragger>
          
        </Form.Item>
        <Form.Item label="Name" name="productName">
          <Input />
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Brand" name="brand">
          <Input />
        </Form.Item>
        <div className="handle-button">
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "#FF7008",
            }}
          >
            Save
          </Button>
          <Button danger={true}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateVoucher;
