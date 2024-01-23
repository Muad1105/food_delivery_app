import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateProduct from "./components/createItemSection/components/addItems/AddProduct";
import CreateCategory from "./components/createItemSection/components/addItems/AddCategory";
import CreateIngredient from "./components/createItemSection/components/addItems/AddIngredient";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" />} />
      <Route path="/admin" element={<Home />} />
      <Route path="/admin/create-product" element={<CreateProduct />} />
      <Route path="/admin/create-category" element={<CreateCategory />} />
      <Route path="/admin/create-ingredient" element={<CreateIngredient />} />
    </Routes>
  );
}

export default App;
