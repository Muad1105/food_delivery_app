import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { useSelector } from "react-redux";

import AddProduct from "./createItemSection/components/addItems/AddProduct";
import CategorySection from "./createItemSection/components/CategorySection";
import IngredientsSection from "./createItemSection/components/IngredientsSection";

interface displaySectionState {
  showAddCategoryPage: Boolean;
  showAddIncredientsPage: Boolean;
  showAddProductPage: Boolean;
  showAllProductsPage: Boolean;
}

interface showSectionState {
  showSection: displaySectionState;
}

const ProductItemsDisplaySection = () => {
  const [showdisplayedSection, setShowdisplayedSection] =
    useState<displaySectionState>();
  const showSection = useSelector(
    (state: showSectionState) => state.showSection
  );

  useEffect(() => {
    console.log(showSection);
    setShowdisplayedSection(showSection);
  }, [showSection]);

  return (
    <div>
      {showdisplayedSection?.showAddCategoryPage && <CategorySection />}
      {showdisplayedSection?.showAddIncredientsPage && <IngredientsSection />}
      {showdisplayedSection?.showAddProductPage && <AddProduct />}
      {showdisplayedSection?.showAllProductsPage && <ProductList />}
    </div>
  );
};

export default ProductItemsDisplaySection;
