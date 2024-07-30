import { Input } from "./ui/input";
import { useState, ChangeEvent } from "react";

interface KeywordSectionProps {
  setKeyword: (keyword: string) => void;
}

const KeywordSection: React.FC<KeywordSectionProps> = ({ setKeyword }) => {
  const [keywordInput, setKeywordInput] = useState("");

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeywordInput(value);
    setKeyword(value); // Call the function passed from the parent component
  };

  return (
    <div className="items-center flex-col flex justify-around md:flex-row md:text-4xl bg-orange-100 text-orange-500 font-bold text-3xl py-20 px-20">
      Keyword
      <div>
        <Input
          className="md:mt-auto mt-5 p-5 md:min-w-full text-orange-500 rounded-lg hover:scale-105 transition duration-300 hover:-translate-y-1 text-lg md:text-2xl shadow-xl text-center shadow-gray-300 bg-orange-200 border-none" // Updated class
          placeholder="Keyword of your question"
          type="text"
          value={keywordInput}
          onChange={handleKeywordChange}
        />
      </div>
    </div>
  );
};

export default KeywordSection;
