import React, { useEffect } from "react";
import { Select, Space } from "antd";
import type { SelectProps } from "antd";

interface Ingredient {
  value: String;
  label: String;
}

interface SelectIngredientsType {
  allIngredients: Ingredient[];
}

const MultiSelect: React.FC<SelectIngredientsType> = ({ allIngredients }) => {
  useEffect(() => {
    console.log(allIngredients);
  }, [allIngredients]);

  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        onChange={handleChange}
        options={allIngredients}
      />
    </Space>
  );
};

export default MultiSelect;
