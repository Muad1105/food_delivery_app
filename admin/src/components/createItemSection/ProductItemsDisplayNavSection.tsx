import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setShowAddCategoryPage,
  setShowAddIncredientsPage,
  setShowAddCreateProductPage,
  setShowAllProductPage,
} from "../../redux/reducer";

interface ShowSectionState {
  showCategorySection: Boolean;
  showIngredietsSection: Boolean;
  showCreateProductSection: Boolean;
  showAllProductsSection: Boolean;
}

const ProductItemsDisplayNavSection = () => {
  const [_, setShowSection] = useState<ShowSectionState>({
    showCategorySection: false,
    showIngredietsSection: false,
    showCreateProductSection: false,
    showAllProductsSection: false,
  });

  const dispatch = useDispatch();

  const handleShowCategorySectionChange = () => {
    setShowSection((prev) => ({ ...prev, showCategorySection: true }));
    dispatch(setShowAddCategoryPage());
  };
  const handleShowIngredientsSectionChange = () => {
    setShowSection((prev) => ({ ...prev, showIngredietsSection: true }));
    dispatch(setShowAddIncredientsPage());
  };
  const handleShowCreateProductSectionChange = () => {
    setShowSection((prev) => ({ ...prev, showCreateProductSection: true }));
    dispatch(setShowAddCreateProductPage());
  };
  const handleShowAllProductsSectionChange = () => {
    setShowSection((prev) => ({ ...prev, showAllProductsSection: true }));
    dispatch(setShowAllProductPage());
  };

  return (
    <div className="flex gap-10">
      <div>
        <Button
          variant="contained"
          size="medium"
          style={{ background: "Yellow", color: "#535353" }}
          onClick={handleShowCategorySectionChange}
        >
          Category
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          size="medium"
          style={{ background: "Yellow", color: "#535353" }}
          onClick={handleShowIngredientsSectionChange}
        >
          Ingredient
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          size="medium"
          style={{ background: "Yellow", color: "#535353" }}
          onClick={handleShowCreateProductSectionChange}
        >
          Product
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          size="medium"
          style={{ background: "Yellow", color: "#535353" }}
          onClick={handleShowAllProductsSectionChange}
        >
          All Products
        </Button>
      </div>
    </div>
  );
};

export default ProductItemsDisplayNavSection;
