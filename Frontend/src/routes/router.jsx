import { createBrowserRouter } from "react-router-dom";
import Userlayout from "../layout/Userlayout";
import Adminlayout from "../layout/Adminlayout";
import Sellerlayout from "../layout/Sellerlayout";

import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";

import {Home} from "../pages/user/Home";
import  { Signup } from "../pages/user/Signup";
import { Login } from "../pages/user/Login";
import { ErrorPage } from "../pages/user/Error";
import { Wishlist } from "../pages/user/Wishlist";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Products } from "../pages/user/Products";
import { ProductDetails } from "../pages/user/ProductDetails";
import { Cart } from "../pages/user/Cart";
import { OrderSuccess } from "../pages/user/OrderSuccess";
import { MyOrder } from "../pages/user/MyOrder";
import { Profile } from "../pages/user/Profile";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Userlayout/>,
      errorElement:<ErrorPage/>,
      children :[
        {
          path: "home",
          element: <Home/>,
      },
        {
            path: "about",
            element: <About/>,
        },
        {
            path: "contact",
            element: <Contact/>,
        },
        {
          path: "signup",
          element: <Signup/>,
      },
      {
        path: "login",
        element: <Login/>,
    },
    {
      path: "profile",
      element: <Profile/>,
  },
    {
      path: "wishlist",
      element: <Wishlist/>,
  },
  {
    path: "product",
    element: <Products/>,
},
{
  path: "cart",
  element: <Cart/>,
},
{
  path: "payment/success",
  element: <OrderSuccess/>,
},
{
  path: "order/user-specific",
  element: <MyOrder/>,
},
{
  path: "product/productDetails/:id",
  element: <ProductDetails/>,
},
  //   {
    
  //     element: <ProtectedRoutes/>,
  //     children : [
      
  //     ]
  // },
 
       
      ]    },
      {
        path: "/admin",
        element: <Adminlayout/>,
        errorElement:<ErrorPage/>,
        children :[
          {
            path: "home",
            element: <Home/>,
        },]
      },
      {
        path: "/seller",
        element: <Sellerlayout/>,
        errorElement:<ErrorPage/>,
        children :[
          {
            path: "home",
            element: <Home/>,
        },]
      },
  ]);