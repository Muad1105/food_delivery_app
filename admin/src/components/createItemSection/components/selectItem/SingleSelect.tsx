import React, { useEffect } from "react";
import { Select, Space } from "antd";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

interface SelectCategoryProps {
  allCategory: Object[];
}

const SingleSelect: React.FC<SelectCategoryProps> = ({ allCategory }) => {
  useEffect(() => {
    console.log(allCategory);
  }, []);

  return (
    <Space wrap>
      <Select
        defaultValue="Select"
        style={{ width: 120 }}
        onChange={handleChange}
        options={allCategory}
      />
    </Space>
  );
};

export default SingleSelect;
