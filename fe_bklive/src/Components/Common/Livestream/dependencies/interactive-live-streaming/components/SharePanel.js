import {
  facebook,
  gmail
} from "../../static/images";

const Share = () => {
  return (
    <div className="flex flex-col xl:m-4">
      <br></br>
      <div>
        <button class="bg-blue-600 text-white p-2 rounded text-sm w-1/3">Copy Link</button>
        <input className="w-2/3" value="http://localhost:3000/react-hls-demo#"></input>
      </div>
      <div class="h-56 grid grid-cols-2 gap-20 content-center">
        <div>
          <img className="" src={gmail} />
        </div>
        <div>
          <img className="" src={facebook} />
        </div>
      </div>

    </div>
  );
};

const SharePanel = ({ panelHeight }) => {
  const Height = panelHeight;

  return (
    <div
      className="overflow-y-auto overflow-x-hidden"
      style={{ height: Height }}
    >
      <div className="flex flex-col justify-between flex-1 h-full">
        <Share />
      </div>
    </div>
  );
};

export default SharePanel;
