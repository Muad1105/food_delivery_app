import AddIngredient from "./addItems/AddIngredient";
import IngredientsList from "./listItems/IngredientsList";

const IngredientsSection = () => {
  return (
    <div className="flex flex-col gap-10">
      <AddIngredient />
      <IngredientsList />
    </div>
  );
};

export default IngredientsSection;
