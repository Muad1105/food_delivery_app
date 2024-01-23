import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import MultiSelect from "../selectItem/MultiSelect";
import SingleSelect from "../selectItem/SingleSelect";

const AddProduct = () => {
  const [productName, setProductName] = useState<String>("");
  const [productAlreadyExists, setProductAlreadyExists] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchCategories();
    fetchIngredients();
  }, []);

  useEffect(() => {
    console.log("allCategory", allCategory);
    console.log("allIngredients", allIngredients);
  }, [allCategory, allIngredients]);

  const fetchCategories = async () => {
    interface Category {
      _id: String;
      name: String;
    }
    const response = await axios.get(
      "http://localhost:1112/category/allCategory"
    );
    const data = response.data.map((category: Category) => ({
      value: category._id,
      label: category.name,
    }));
    setAllCategory(data);
  };

  const fetchIngredients = async () => {
    interface Ingredient {
      _id: String;
      name: String;
    }
    const response = await axios.get(
      "http://localhost:1112/ingredients/allIngredients"
    );
    const data = response.data.map((ingredient: Ingredient) => ({
      value: ingredient._id,
      label: ingredient.name,
    }));

    setAllIngredients(data);
  };

  const handleProduct = async () => {
    setProductAlreadyExists(false);
    if (productName) {
      console.log(productName);

      const data = { name: productName };

      await axios
        .post("http://localhost:1112/product/create", data)
        .then((res) => {
          console.log(res);
          enqueueSnackbar("Product Created", { variant: "success" });
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setProductAlreadyExists(true);
          }
        });
    }
  };

  const handleOnchangeProduct = (product: String) => {
    setProductAlreadyExists(false);

    setProductName(product);
  };

  return (
    <div className="border-2 border-blue-300 w-[450px] h-[400px] flex justify-center items-center  ml-auto mr-auto p-6 shadow-md shadow-blue-300">
      <form className=" flex flex-col justify-center items-center gap-y-4">
        <div className="text-xl text-slate-700">Add Product</div>
        <input
          type="text"
          placeholder="Name.."
          className="border-2"
          onChange={(e) => handleOnchangeProduct(e.target.value)}
          style={{
            border: "2px solid #818cf8",
            padding: "0 10px",
            height: "35px",
            borderRadius: "20px",
          }}
        />
        <SingleSelect allCategory={allCategory} />
        <MultiSelect allIngredients={allIngredients} />

        <input
          type="text"
          placeholder="Price.."
          className="border-2"
          onChange={(e) => handleOnchangeProduct(e.target.value)}
          style={{
            border: "2px solid #818cf8",
            padding: "0 10px",
            height: "35px",
            borderRadius: "20px",
          }}
        />
        <input
          type="file"
          onChange={(e) => handleOnchangeProduct(e.target.value)}
        />
        <div>
          <Button
            variant="contained"
            size="medium"
            style={{ background: "green", width: "100px" }}
            onClick={handleProduct}
          >
            Add
          </Button>
        </div>
        {productAlreadyExists && (
          <div className="text-red-700">Product Already exists.</div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
