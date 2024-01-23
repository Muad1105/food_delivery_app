import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setShowIngredientDeleted } from "../../../../redux/showItemChangesReducer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Ingredient {
  _id: String;
  name: String;
}

interface IngredientsListState {
  IngredientsData: Ingredient[];
  _id: String;
  name: String;
}

export default function IngredientsList() {
  const [IngredientsData, setIngredientsData] = useState<
    IngredientsListState[]
  >([]);
  const [deleteIngredient, setdeleteIngredient] = useState(false);

  useEffect(() => {
    fetchIngredientsData();
  }, []);

  const dispatch = useDispatch();

  //save state to store when deleted
  useEffect(() => {
    deleteIngredient
      ? dispatch(setShowIngredientDeleted(true))
      : dispatch(setShowIngredientDeleted(false));
  }, [deleteIngredient]);

  interface BooleanData {
    showIngredientAdded: false;
    showIngredientDeleted: true;
  }

  interface RootState {
    showChanges: BooleanData;
  }
  //get data from store
  const dataDeleted = useSelector(
    (state: RootState) => state.showChanges.showIngredientDeleted
  );
  console.log(dataDeleted);

  const dataAdded = useSelector(
    (state: RootState) => state.showChanges.showIngredientAdded
  );
  console.log(dataAdded);

  useEffect(() => {
    fetchIngredientsData();
  }, [dataDeleted, dataAdded]);

  const { enqueueSnackbar } = useSnackbar();

  const fetchIngredientsData = async () => {
    await axios
      .get("http://localhost:1112/ingredients/allIngredients")
      .then((res) => {
        console.log(res.data);
        setIngredientsData(res.data);
      });
  };

  const handleDeleteIngredient = async (id: String) => {
    //To clear if the store value for showDeleteIngredient is true from prev render
    setdeleteIngredient(false);
    await axios
      .delete(`http://localhost:1112/ingredients/${id}`)
      .then((res) => {
        res.status === 200 &&
          enqueueSnackbar("Ingredient Deleted", { variant: "success" });
        setdeleteIngredient(true);
      });
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 300 }}>
      <Table sx={{ maxWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Ingredients Section : </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {IngredientsData.map((item) => (
            <StyledTableRow
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
              }}
            >
              <StyledTableCell align="left">{item.name}</StyledTableCell>
              <HighlightOffIcon
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleDeleteIngredient(item._id)}
              />
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
