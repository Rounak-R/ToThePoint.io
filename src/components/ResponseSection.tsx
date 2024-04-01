import { useState } from "react";
import axios from "axios";

const ResponseSection = ({
  keyword,
  selectedItems,
}: // onGenerateResponse, // Add onGenerateResponse prop
{
  keyword: string;
  selectedItems: string[];
  // onGenerateResponse: (selectedItems: string[]) => void; // Define onGenerateResponse function
}) => {
  const [response, setResponse] = useState<string>("");

  const generateResponse = async () => {
    try {
      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `I would like to generate a response based on the following criteria:
            1. Keyword: ${keyword}
            2. Selected Options: ${selectedItems}   
            Please provide a response that addresses the keyword and is tailored according to the selected options.`,
          },
        ],
        temperature: 0.7,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      };

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestBody,
        { headers }
      );
      const responseData = response.data;

      if (responseData.choices && responseData.choices.length > 0) {
        const generatedResponse =
          responseData.choices[0].message.content.trim();
        setResponse(generatedResponse);
      } else {
        setResponse("No response received");
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Error generating response");
    }
  };

  return (
    <div className="flex place-content-center bg-neutral-900 p-10 h-full ">
      <div className="flex flex-col container w-screen h-auto items-center mx-1 bg-neutral-800 py-6 my-10 rounded-lg shadow-xl shadow-cyan-700">
        <button
          className="md:w-1/4 bg-neutral-900 text-red-600 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition duration-300 ease-in-out hover:bg-neutral-700 shadow-lg shadow-red-700"
          onClick={() => {
            generateResponse();
            // onGenerateResponse(selectedItems); // Call onGenerateResponse function
          }}
        >
          Generate Response
        </button>
        <div className=" text-cyan-500 md:mt-16 mt-10 mb-10 md:text-xl text-lg font-semibold mx-1 text-justify tracking-tight">
          {response}
        </div>
      </div>
    </div>
  );
};

export default ResponseSection;
