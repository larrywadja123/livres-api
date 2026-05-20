import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";

import CartPage from "../pages/Cart/CartPage";

import WishlistPage from "../pages/listesouhait/WishlistPage";

import OrdersPage from "../pages/orders/OrdersPage";

/* ADMIN */
import Dashboard from "../admin/Dashboard";
import AddBook from "../admin/AddBook";
import OrdersAdmin from "../admin/OrdersAdmin";
import UsersAdmin from "../admin/UsersAdmin";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* CLIENT */}

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/wishlist"
          element={<WishlistPage />}
        />

        <Route
          path="/orders"
          element={<OrdersPage />}
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={<Dashboard />}
        />

        <Route
          path="/admin/add-book"
          element={<AddBook />}
        />

        <Route
          path="/admin/orders"
          element={<OrdersAdmin />}
        />

        <Route
          path="/admin/users"
          element={<UsersAdmin />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;