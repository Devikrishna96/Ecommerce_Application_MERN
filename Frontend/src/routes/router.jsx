import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import SellerLayout from "../layout/SellerLayout";

import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { Home } from "../pages/user/Home";
import { Signup } from "../pages/user/Signup";
import { Login } from "../pages/user/Login";
import { ErrorPage } from "../pages/user/Error";
import { Wishlist } from "../pages/user/Wishlist";
import { Products } from "../pages/user/Products"; 
import { ProductDetails } from "../pages/user/ProductDetails";
import { Cart } from "../pages/user/Cart";
import { OrderSuccess } from "../pages/user/OrderSuccess";
import { MyOrder } from "../pages/user/MyOrder";
import { Profile } from "../pages/user/Profile";

import { AdminLogin } from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UsersList from "../pages/admin/UsersList";
import OrdersList from "../pages/admin/OrdersList";
import SellerVerification from "../pages/admin/SellerVerification";
import AdminProducts from "../pages/admin/AdminProducts";

import  SellerSignup  from "../pages/seller/SellerSignup";
import { SellerLogin } from "../pages/seller/SellerLogin";
import { SellerHome } from "../pages/seller/SellerHome";
import { SellerProfile } from "../pages/seller/SellerProfile";
import { SellerProducts } from "../pages/seller/SellerProducts";
import { SellerPendingProducts } from "../pages/seller/SellerPendingProducts";

// ProtectedRoute wrapper
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([

  // ===== USER ROUTES =====
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute role="user">
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute role="user">
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      { path: "product", element: <Products /> },
      { path: "product/productDetails/:id", element: <ProductDetails /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute role="user">
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment/success",
        element: (
          <ProtectedRoute role="user">
            <OrderSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "order/user-specific",
        element: (
          <ProtectedRoute role="user">
            <MyOrder />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ===== ADMIN ROUTES =====
  
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute role="admin">
            <UsersList />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute role="admin">
            <OrdersList />
          </ProtectedRoute>
        ),
      },
      {
        path: "sellers",
        element: (
          <ProtectedRoute role="admin">
            <SellerVerification />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute role="admin">
            <AdminProducts />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ===== SELLER ROUTES =====
  {
    path: "/seller",
    element: <SellerLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <SellerLogin /> },
      { path: "signup", element: <SellerSignup /> },
      {
        path: "home",
        element: (
          <ProtectedRoute role="seller">
            <SellerHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute role="seller">
            <SellerProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute role="seller">
            <SellerProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "pending-products",
        element: (
          <ProtectedRoute role="seller">
            <SellerPendingProducts />
          </ProtectedRoute>
        ),
      },
    ],
  },

]);
