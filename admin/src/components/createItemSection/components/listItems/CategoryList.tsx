import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setShowCategoryDeleted } from "../../../../redux/showItemChangesReducer";

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

interface CategoryState {
  id: String;
  name: String | undefined;
}

interface CategoryListState {
  categoryData: CategoryState[];
}

export default function CategoryList() {
  const [categoryData, setcategoryData] = useState<CategoryListState[]>([]);
  const [categoryDeleted, setCategoryDeleted] = useState(false);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("category delete");

    categoryDeleted
      ? dispatch(setShowCategoryDeleted(true))
      : dispatch(setShowCategoryDeleted(false));
  }, [categoryDeleted]);

  interface BooleanData {
    showCategoryAdded: Boolean;
    showCategoryDeleted: Boolean;
  }

  interface RootState {
    showChanges: BooleanData;
  }

  //Redux to refer to changes and reload when add and delete

  const dataDeleted = useSelector(
    (state: RootState) => state.showChanges.showCategoryDeleted
  );
  console.log(dataDeleted);

  const dataAdded = useSelector(
    (state: RootState) => state.showChanges.showCategoryAdded
  );
  console.log(dataAdded);

  useEffect(() => {
    fetchCategoryData();
  }, [dataDeleted, dataAdded]);

  const { enqueueSnackbar } = useSnackbar();

  const fetchCategoryData = async () => {
    await axios
      .get("http://localhost:1112/category/allCategory")
      .then((res) => {
        console.log(res.data);
        console.log(typeof res.data);

        interface ItemType {
          _id: String;
          name: String;
          __v: number;
        }
        const data = res.data.map((item: ItemType) => {
          console.log(item);

          return { id: item._id, name: item.name };
        });

        setcategoryData(data);
      });
  };

  const deleteCategory = async (id: String) => {
    setCategoryDeleted(false);

    await axios.delete(`http://localhost:1112/category/${id}`).then((res) => {
      res.status === 200 &&
        enqueueSnackbar("Category Deleted", { variant: "success" });
      setCategoryDeleted(true);
    });
  };

  return (
    <TableContainer sx={{ maxWidth: 300 }} component={Paper}>
      <Table sx={{ maxWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Category Section : </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoryData.map((item) => (
            <StyledTableRow
              key={item.id}
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
                onClick={() => deleteCategory(item.id)}
              />
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
