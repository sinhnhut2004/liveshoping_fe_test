import {
    Button,
    Col,
    Popover,
    Rate,
    Row,
    Space,
    InputNumber,
    Typography,
  } from "antd";
  import React, { Fragment, useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const { Text, Title } = Typography;
  
  const getPriceRange = (product_details) => {
    const listPrices = product_details.map((item) => item.price);
    let max = Math.max(...listPrices);
    let min = Math.min(...listPrices);
    if (max === min) return `${max}`;
    return `${min}-${max}`;
  };
  function areObjectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1?.length !== keys2?.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (!keys2?.includes(key) || obj1[key] !== obj2[key]) {
        return false;
      }
    }
  
    return true;
  }
  
  const getPriceOrQuantity = (value, product_detail, isPrice) => {
    let result;
    for(const item of product_detail) {
      let obj = {}
        
      for(const i of item.variation_options) {
        obj[`${i.variation_name}`] = i.option; 
      }
      
      // if(JSON.stringify(obj) === JSON.stringify(value)) {
      if(areObjectsEqual(value, obj)) {
        if(isPrice) result = item.price;
        else {
          result = item.quantity;
        }
        
        break;
      }
    }
    return result;
  }
  
  export default function FeaturedCardNew({
    product,
    containerRef,
    isShow,
    setIsShow,
  }) {
    const navigate = useNavigate();
    const handleClickAddToCart = () => {
      console.log("added to cart");
    };
    console.log(product.id);
    const handleClickBuyNow = () => {
      console.log("go to checkout page");
      //navigate("/checkout");
      window.open('http://localhost:3001/checkout', '_blank', 'noreferrer');
    };
    const [values, setValues] = useState({});
    const [price , setPrice] = useState();
    const [inputNumber, setInputNumber] = useState(1);
    const [quantity, setQuantity] = useState();
    console.log(product?.variations);
    const variations = product?.variations?.map((item) => {
      const options = item.variation_options?.map((i) => {
        //console.log(i.type_value);
        return {
          option_name: i.type_value
        }
      })
      return {
        variation_name: item.type_name,
        options
      }
    })
    console.log(variations);
  
    const products = product.product_details?.map((item) => {
      const variation_options = item.skus_variation_options?.map((i) => {
        return {
          variation_name: i.variation_options.variation_name,
          option: i.variation_options.type_value
        }
        
      })
      return {
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        variation_options 
      }
    })
  
    useEffect(() => {
      let price = getPriceOrQuantity(values, products, true);
      price && setPrice(price);
      
      
    }, [values])
    useEffect(() => {
      let quantity = getPriceOrQuantity(values, products, false);
      quantity && setQuantity(quantity);
      //setInputNumber(1);
      
    }, [values])
  
    useEffect(() => {
      setInputNumber(1);
    }, [values])
  
    
    // const variations = [
    //   {
    //     variation_name: "Color",
    //     options: [
    //       {
    //         option_name: "Blue"
    //       },
    //       {
    //         option_name: "Red"
    //       },
    //       {
    //         option_name: "White"
    //       },
    //       {
    //         option_name: "Green"
    //       }
    //     ]
    //   },
    //   {
    //     variation_name: "Size",
    //     options: [
    //       {
    //         option_name: "XL"
    //       },
    //       {
    //         option_name: "L"
    //       },
    //       {
    //         option_name: "XXL"
    //       }
    //     ]
    //   },
    //]
    const hasKeyValue = (obj, key, value) => {
      return obj?.hasOwnProperty(key) && obj[key] === value;
    }
    const handleVarationOption = (e, option_name, variation_name) => {
      e.preventDefault();
      console.log("Click....");
      console.log(`${variation_name}: ${option_name}`);
      setValues((pre) => ({...pre, [variation_name]: option_name}));  
    }
  
    const handleInputNumber = (value) => {
      console.log(value);
      setInputNumber(value);
    }
    
    console.log(values);
    const content = (
      <div className="rounded-xl border-2 p-xl">
        <Row gutter={[16, 16]}>
          <Col className="w-[200px]">
            <div>
              <img
                //src="https://lzd-img-global.slatic.net/g/p/bc9dc49231c13c51e0ebe413ee3f8fa2.jpg_156x156q80.jpg_.webp"
                src={product.image}
                alt="product"
                className="rounded-xl w-full"
              />
            </div>
            <p>Although all OLEDs deliver similar fantastic picture</p>
          </Col>
          <Col>
            <div>
              <Title level={2}>{product.product_name}</Title>
              <Rate disabled defaultValue={5} />
              {/* <Title level={2}>Color </Title> */}
              <Row>
                <Text type="danger" className="text-2xl">
                  {getPriceOrQuantity(values, products, true) || getPriceRange(product.product_details)} VND
                </Text>
              </Row>
              {
                variations?.map((variation, index1) => (
                  <Fragment key={index1}>
                    <Text className="text-2xl">{variation.variation_name}</Text>
                    <Row>
                      <Space>
                        {variation.options?.map((option, index2) => (
                          <Button
                            className={`${hasKeyValue(values, variation.variation_name, option.option_name) ? 'bg-blue-400': ''}`}
                            onClick={(e) => handleVarationOption(e, option.option_name, variation.variation_name)}
                            key={index2}>{option.option_name}</Button>
                        ))}
                        
                      </Space>
                    </Row>
                  </Fragment>
                ))
              }
              <Row gutter={[16, 16]} className="mt-xl">
                <Col>
                  <Row>
                    <InputNumber
                      min={1}
                      max={99}
                      value={inputNumber}
                      onChange={handleInputNumber}
                      addonBefore="+"
                      addonAfter="-"
                      size="large"
                      className="!w-28"
                    />
                  </Row>
                </Col>
              </Row>
              {getPriceOrQuantity(values, products, false) && (<p className="text-xl">{getPriceOrQuantity(values, products, false)} in stocks</p>)}
            </div>
          </Col>
        </Row>
        <Row justify="center">
          <Space wrap align="center">
            <Button type="primary" size="large" onClick={handleClickAddToCart}>
              Add to cart
            </Button>
            <Button
              type="primary"
              danger
              size="large"
              onClick={handleClickBuyNow}
            >
              Buy Now
            </Button>
          </Space>
          
        </Row>
      </div>
    );
  
    return (
      <Popover
        content={content}
        trigger="click"
        getPopupContainer={() => containerRef.current}
        open={isShow}
        onOpenChange={setIsShow}
      >
        {/* <div className="relative p-xl border-2 rounded-lg border-solid hover:border-red-150 border-transparent transition duration-300 ease-in-out"> */}
        <div className="relative px-4 py-3 border-[1px] border-gray-200 w-[300px] h-[300px]">
          <div className="text-center">
            {isShow !== undefined && console.log("isShow", isShow)}
            {/* <Text type="danger">Featured now</Text> */}
          </div>
          <div className="flex flex-col items-center">
            <img
              //src="https://lzd-img-global.slatic.net/g/p/bc9dc49231c13c51e0ebe413ee3f8fa2.jpg_156x156q80.jpg_.webp"
              src={product.image}
              alt="product"
              className="rounded-lg w-[90%] h-[60%]"
            />
  
            <div className="px-xl text-center flex flex-col justify-center">
              <Title level={3}>{product.product_name}</Title>
              <Text type="danger" strong className="text-xl">
                {getPriceRange(product.product_details)} VND
              </Text>
            </div>
          </div>
        </div>
      </Popover>
    );
  }
  
  