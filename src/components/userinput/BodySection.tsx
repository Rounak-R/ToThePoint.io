import { useState } from "react";
import KeywordSection from "../KeywordSection";
import { InputCheckbox } from "./InputCheckbox";
import ResponseSection from "../ResponseSection";

const BodySection = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // const handleGenerateResponse = () => {
  // console.log("Selected Items:", selectedItems);
  // console.log(`selectedItems:${selectedItems} KeyWord:${keyword}`);
  // Function to handle generating response
  // You can pass the selected items and keyword to the ResponseSection here
  // You can call this function when the button for generating response is clicked
  // };

  return (
    <>
      <KeywordSection setKeyword={setKeyword} />
      <InputCheckbox setSelectedItems={setSelectedItems} />
      <ResponseSection
        keyword={keyword}
        selectedItems={selectedItems}
        // onGenerateResponse={handleGenerateResponse} // Pass the function to generate response
      />
    </>
  );
};

export default BodySection;
