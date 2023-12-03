import {
  product1Image,
  product2Image,
  product3Image,
} from "../../static/images";

const ProductPart = () => {
  return (
    <div>
      <div>

        <div className="flex flex-1 items-center justify-center w-full h-full rounded bg-white">
          <img src={product1Image} />
        </div>

        <div className="mt-5">
          <p className="text-base font-semibold text-white text-justify">
            Men Regular Fit Solid Collar Casual Shirt
          </p>
          <p className="mt-3 text-[#9A9FA5] text-xs text-justify">
            Lorem Ipsum is simply dummy text.
          </p>

          <div>
            <p className="text-base  font-extrabold text-green-150">
              $10
            </p>
            <button className="border-solid border-2 text-white p-2 rounded">-</button>
            <input className="border-solid border-2 p-2 rounded" value="1"></input>
            <button className="border-solid border-2 text-white p-2 rounded">+</button>
          </div>

          <br></br>

        </div>

        <button
          className="w-1/3  border-solid border-2 border-red-500 text-red-500 p-2 rounded"
          onClick={() => {
            console.log("size S");
          }}
        >
          Red
        </button>
        <button className="w-1/3  border-solid border-2 text-white p-2 rounded">
          Green
        </button>
        <button className="w-1/3  border-solid border-2 text-white p-2 rounded">
          Blue
        </button>

        <button className="w-1/3 text-white p-2 rounded">
          XS
        </button>
        <button className="w-1/3 text-white p-2 rounded">
          S
        </button>
        <button className="w-1/3 text-red-500 p-2 rounded">
          M
        </button>

        <button className="w-1/3 text-white p-2 rounded">
          L
        </button>

        <button className="w-1/3 text-white p-2 rounded">
          XL
        </button>
        <button className="w-1/3 text-white p-2 rounded">
          XXL
        </button>


      </div>
    </div>
  );
};

const BuyNowButtonPart = () => {
  return (
    <div class="w-full flex justify-center">
      <button class="bg-blue-500 text-white p-2 rounded text-sm w-auto">
        Add to cart
        </button>
      <button class="bg-red-500 text-white p-2 ml-6 rounded text-lg w-auto">
        Buy now
        </button>
    </div>
  );
};

const EProductDetailPanel = ({ panelHeight }) => {
  const Height = panelHeight;

  return (
    <div
      className="overflow-y-auto overflow-x-hidden"
      style={{ height: Height }}
    >
      <div className="flex flex-col justify-between flex-1 h-full">
        <ProductPart />
        <BuyNowButtonPart />
      </div>
    </div>
  );
};

export default EProductDetailPanel;
