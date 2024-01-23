import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setShowCategoryAdded } from "../../../../redux/showItemChangesReducer";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState<String>("");
  const [categoryAdded, setCategoryAdded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    categoryAdded
      ? dispatch(setShowCategoryAdded(true))
      : dispatch(setShowCategoryAdded(false));
  }, [categoryAdded]);

  const { enqueueSnackbar } = useSnackbar();

  const handleCategory = async () => {
    setCategoryAdded(false);
    if (categoryName) {
      console.log(categoryName);

      const data = { name: categoryName };

      await axios
        .post("http://localhost:1112/category/create", data)
        .then((res) => {
          console.log(res);
          enqueueSnackbar("CategoryCreated", { variant: "success" });
          setCategoryAdded(true);
        })
        .catch((err) => {
          if (err.response.status === 409) {
            enqueueSnackbar("Category Already Exist.", {
              variant: "error",
            });
          }
        });
    }
  };

  const handleOnchangeCategory = (category: String) => {
    setCategoryName(category);
  };

  return (
    <div>
      <div className="border-2 border-blue-300 w-[350px] h-[300px] flex justify-center ml-auto mr-auto items-center p-6  shadow-md shadow-blue-300">
        <form className=" flex flex-col justify-center items-center gap-y-4">
          <div className="text-xl text-slate-700">Add Category</div>
          <input
            type="text"
            placeholder="Name.."
            className="border-2"
            onChange={(e) => handleOnchangeCategory(e.target.value)}
            style={{
              border: "2px solid #818cf8",
              padding: "0 10px",
              height: "35px",
              borderRadius: "20px",
            }}
          />
          <div>
            <Button
              variant="contained"
              size="medium"
              style={{ background: "green", width: "100px" }}
              onClick={handleCategory}
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
