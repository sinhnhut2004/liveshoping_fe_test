import { Button, Form, Input, Typography, Upload } from "antd";
import "./index.css"

const EditProduct = ({editingProduct}) => {
    const handleSaveProduct = (e) => {
        console.log(e);
    }
    console.log(editingProduct?.productName);
    return (
        <div className="edit-product">
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
                    flex: '150px',
                }} 
                labelAlign="left"
                labelWrap
                wrapperCol={{
                flex: 1,
                }}
            >
                <div className="basic-information">
                    <Typography.Title>Basic Information</Typography.Title>
                    <Form.Item label="Product image" name="product-image">
                        <Upload.Dragger 
                            style={{width: "10%"}}
                            listType="picture" 
                            accept=".png,.jpeg">
                            Insert image
                        </Upload.Dragger>
                    </Form.Item>
                    <Form.Item label="Name">
                        <Input value={editingProduct?.productName} name="productName"/>
                    </Form.Item>
                    <Form.Item label="Category">
                        <Input value={editingProduct?.category} />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea />
                    </Form.Item>
                </div>
                <div className="sales-information">
                    <Typography.Title>Sales Information</Typography.Title>
                    <Form.Item label="Brand" name="brand">
                        <Input />
                    </Form.Item>
                </div>    
                <div 
                    className="handle-button"
                >
                    <Button 
                        htmlType="submit"
                        style={{
                            backgroundColor: "#FF7008"
                        }}
                    >Save</Button>
                    <Button danger={true}>Cancel</Button>
                          
                </div>          
            </Form>
        </div>
    )
    
}

export default EditProduct;