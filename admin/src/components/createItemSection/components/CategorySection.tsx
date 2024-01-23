import AddCategory from "./addItems/AddCategory";
import CategoryList from "./listItems/CategoryList";

const CategorySection = () => {
  return (
    <div className="flex flex-col gap-10">
      <AddCategory />
      <CategoryList />
    </div>
  );
};

export default CategorySection;
