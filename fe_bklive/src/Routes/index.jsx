import { Route, Routes } from "react-router-dom";
import ProductPage from "Pages/Buyer/Product";
import ShoppingCart from "../Pages/Buyer/ShoppingCart";
import Checkout from "../Pages/Buyer/Checkout";
import Category from "../Pages/Buyer/Category";
import NotFound from "../Pages/Buyer/NotFounds";
import ProductDetail from "../Pages/Buyer/ProductDetail";
import Home from "../Pages/Buyer/Home";
import LivePage from "../Pages/Buyer/Live";
import Chat from "../Pages/Buyer/Chat";
import Orders from "../Pages/Buyer/Orders";
import OrderDetail from "../Pages/Buyer/OrderDetail";
import Notifications from "../Pages/Buyer/Notifications";
import Account from "../Pages/Buyer/Account";
import SignIn from "../Pages/Buyer/SignIn";
import LogIn from "../Pages/Buyer/LogIn";
import StorePage from "../Pages/Buyer/Store";
import App from "../App";
import { AdminLayout, ClientLayout, SellerLayout } from "../Layouts";
import OrderManagement from "../Pages/Seller/Order";
import StoreManagement from "../Pages/Seller/Store/ProdcutList";
import CreateProduct from "../Pages/Seller/Store/crudProduct/create";
import EditProduct from "../Pages/Seller/Store/crudProduct/edit";
import { useState } from "react";
import CreateLiveStream from "../Pages/Seller/Livestream/Create";
import ChooseProduct from "../Pages/Seller/Livestream/Create/ChooseProducts";
import LivestreamScreen from "../Components/Seller/LivestreamScreen";


import AdminDashboard from "Pages/Admin/AdminDashboard";
import AdminReport from "Pages/Admin/AdminReport";
import AdminBuyer from "Pages/Admin/AdminBuyer";
import AdminBuyerDetail from "Pages/Admin/AdminBuyerDetail";
import AdminSeller from "Pages/Admin/AdminSeller";
import AdminSellerDetail from "Pages/Admin/AdminSellerDetail";
import AdminFeedback from "Pages/Admin/AdminFeedback";
import AdminFeedbackDetail from "Pages/Admin/AdminFeedbackDetail";
import AdminLogIn from "Pages/Admin/AdminLogin";
import VoucherManagement from "../Pages/Seller/Marketing/voucherManagement";
import LoginSeller from "../Pages/Seller/Login";
import CreateVoucher from "../Pages/Seller/Marketing/crudVoucher/create";



const AppRoute = () => {

  const [productList, setProductList] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  console.log(productList);
  console.log(editingProduct);


  return (
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="login" element={<LogIn />} />
      
      <Route path="/" element={<ClientLayout />}>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="live" element={<LivePage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="product_detail/:id?" element={<ProductDetail />} />
        <Route path="category" element={<Category />} />
        <Route path="shopping_cart" element={<ShoppingCart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="chat" element={<Chat />} />
        <Route path="orders" element={<Orders />} />
        <Route path="order_detail/:id?" element={<OrderDetail />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="account" element={<Account />} />
        <Route path="store" element={<StorePage />} />
        <Route path="test" element={<App />} />
      </Route>
      <Route path="/seller/login" element={<LoginSeller />}></Route>
      <Route path="/seller" element={<SellerLayout />}>
        
        <Route path="/seller/order/all" element={<OrderManagement />}></Route>
        <Route
          path="/seller/order/:childrenOrder"
          element={<OrderManagement />}
        ></Route>
        <Route
          path="/seller/store/all-products"
          element={<StoreManagement setEditingProduct={setEditingProduct} />}
        ></Route>
        <Route
          path="/seller/store/create-product"
          element={<CreateProduct />}
        ></Route>
        <Route
          path="/seller/store/edit-product/:productId"
          element={<EditProduct editingProduct={editingProduct} />}
        ></Route>
        <Route path="/seller/livestream"></Route>
        <Route
          path="/seller/livestream/create-livestream"
          element={<CreateLiveStream productList={productList} />}
        ></Route>
        <Route path="/seller/marketing-channel/all-voucher" element={<VoucherManagement />}></Route>
        <Route
          path="/seller/livestream/create-livestream/choose-products"
          element={<ChooseProduct setProductList={setProductList} />}
        ></Route>
        <Route path="/seller/marketing"></Route>
        <Route path="/seller/marketing-channel/create-voucher" element={<CreateVoucher />}></Route>
        <Route path="/seller/setting"></Route>
      </Route>

      <Route path="admin_login" element={<AdminLogIn />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />}></Route>
        <Route path="report" element={<AdminReport />}></Route>
        <Route path="buyer" element={<AdminBuyer />}></Route>
        <Route path="buyer_detail" element={<AdminBuyerDetail />}></Route>
        <Route path="seller" element={<AdminSeller />}></Route>
        <Route path="seller_detail" element={<AdminSellerDetail />}></Route>
        <Route path="feedback" element={<AdminFeedback />}></Route>
        <Route path="feedback_detail" element={<AdminFeedbackDetail />}></Route>
      </Route>

      <Route path="/seller/livescreen" element={<LivestreamScreen />}>

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
