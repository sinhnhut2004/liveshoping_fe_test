const Voucher = () => {
  return (
    <div className="flex flex-col xl:m-4 m-2">
      <br></br>
      <h1 className="text-red-500">Voucher 1</h1>
      <ul className="text-white">
        <li>25% OFF</li>
        <li>Voucher type: Type 1</li>
        <li>Valid until May 22, 2024</li>
        <li>Voucher code: XR02MQVOU</li>
      </ul>

      <br></br>

      <h1 className="text-red-500">Voucher 2</h1>
      <ul className="text-white">
        <li>25% OFF</li>
        <li>Voucher type: Type 1</li>
        <li>Valid until May 22, 2024</li>
        <li>Voucher code: XR02MQVOU</li>
      </ul>

      <br></br>

      <h1 className="text-red-500">Voucher 3</h1>
      <ul className="text-white">
        <li>25% OFF</li>
        <li>Voucher type: Type 1</li>
        <li>Valid until May 22, 2024</li>
        <li>Voucher code: XR02MQVOU</li>
      </ul>
    </div>
  );
};



const VoucherPanel = ({ panelHeight }) => {
  const Height = panelHeight;

  return (
    <div
      className="overflow-y-auto overflow-x-hidden"
      style={{ height: Height }}
    >
      <div className="flex flex-col justify-between flex-1 h-full">
        <Voucher />
      </div>
    </div>
  );
};

export default VoucherPanel;
