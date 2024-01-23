import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setShowIngredientAdded } from "../../../../redux/showItemChangesReducer";

const AddIngredient = () => {
  const [ingredientName, setIngredientName] = useState<String>("");
  const [ingredientCreated, setIngredientCreated] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("incredient created");

    ingredientCreated
      ? dispatch(setShowIngredientAdded(true))
      : dispatch(setShowIngredientAdded(false));
  }, [ingredientCreated]);

  const { enqueueSnackbar } = useSnackbar();

  const handleIngredient = async () => {
    setIngredientCreated(false);
    if (ingredientName) {
      console.log(ingredientName);

      const data = { name: ingredientName };

      await axios
        .post("http://localhost:1112/ingredients/create", data)
        .then((res) => {
          console.log(res);
          enqueueSnackbar("Ingredient Created", { variant: "success" });
          setIngredientCreated(true);
        })
        .catch((err) => {
          if (err.response.status === 409) {
            enqueueSnackbar("Ingredient Already exists", {
              variant: "error",
            });
          }
        });
    }
  };

  const handleOnchangeIngredient = (ingredent: String) => {
    setIngredientName(ingredent);
  };

  return (
    <div className="border-2 border-blue-300 w-[350px] h-[300px] flex justify-center items-center  ml-auto mr-auto  p-6 shadow-md shadow-blue-300">
      <form className=" flex flex-col justify-center items-center gap-y-4">
        <div className="text-xl text-slate-700">Add Ingredient</div>
        <input
          type="text"
          placeholder="Name.."
          className="border-2"
          onChange={(e) => handleOnchangeIngredient(e.target.value)}
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
            onClick={handleIngredient}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddIngredient;
