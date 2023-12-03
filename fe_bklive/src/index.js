// import React from 'react';
import ReactDOM from 'react-dom';

import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Livestream from "./App";
import { ToastContainer } from 'react-toastify';
import LivestreamScreen from './Components/Seller/LivestreamScreen';
import 'react-toastify/dist/ReactToastify.css';
////////////////
// import { JoiningScreen } from './Components/Common/Livestream/screens/JoiningScreen';

/// nháp sửa lại
import { createRoot } from 'react-dom/client';
import { AdminLayout, ClientLayout } from './Layouts/';

////////////ta//////////
import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import { ConfigProvider } from 'antd';

import { AuthContextProvider } from './context/authContext';

///////////////////////
import { Windmill } from '@windmill/react-ui';

import AppRoute from './Routes/index.jsx';

import { Provider } from 'react-redux';

import store from 'Redux/store';

const container = document.getElementById('root');
const root = createRoot(container);
// root.render(<App />);

// ReactDOM.render(
//   <React.StrictMode>
//     <Windmill>
//       <ToastContainer
//         toastClassName={() =>
//           'relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg'
//         }
//         bodyClassName={() => 'text-black text-base font-normal'}
//         position="bottom-left"
//         autoClose={4000}
//         hideProgressBar={true}
//         newestOnTop={false}
//         closeButton={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       {/* <App /> */}
//       <App />
//     </Windmill>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// root.render(
//   <React.StrictMode>
//     {/* <Livestream /> */}
//     <LivestreamScreen/>
//     {/* <Windmill>
//       <BrowserRouter>
//         <AppRoute />
//       </BrowserRouter>
//     </Windmill> */}
//   </React.StrictMode>

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Windmill>
        <ToastContainer
          toastClassName={() =>
            'relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg'
          }
          bodyClassName={() => 'text-black text-base font-normal'}
          position="bottom-left"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeButton={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* <App /> */}

        <BrowserRouter>
          <AuthContextProvider>
            <AppRoute />
          </AuthContextProvider>
        </BrowserRouter>

        {/* <LivestreamScreen /> */}
      </Windmill>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')

  // document.getElementById("root")
);
