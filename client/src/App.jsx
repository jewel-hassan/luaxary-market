// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./components/Home";
import Profile from "./pages/Profile";
import CreateProduct from "./components/CreateProduct";
import ProductList from "./components/ProductList";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        {/* Protected Routes */}
        <Route element={<ProtectRoute />}>
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/createproduct" element={<CreateProduct />} />
        </Route>

        {/* Catch-all 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-3xl font-bold text-red-500">
                404 | Page Not Found
              </h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


