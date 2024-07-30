import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ClipLoader from "react-spinners/ClipLoader"; // Import a spinner

interface ResponseSectionProps {
  keyword: string;
  selectedItems: string[];
}

const ResponseSection: React.FC<ResponseSectionProps> = ({
  keyword,
  selectedItems,
}) => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const generateResponse = async () => {
    setLoading(true); // Start loading
    try {
      const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_API_KEY as string
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `I would like to generate a response based on the following criteria:
      1. Keyword: ${keyword}
      2. Selected Options: ${selectedItems}
      Please provide a response that addresses the keyword and is tailored according to the selected options.`;

      const result = await model.generateContent(prompt);
      const responseData = await result.response.text();

      setResponse(responseData);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Error generating response");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex place-content-center bg-orange-100 p-8 h-full  ">
      <div className="flex flex-col container w-screen h-auto items-center mx-1 bg-orange-200 py-6 my-10 rounded-2xl shadow-xl shadow-gray-300">
        <button
          className="md:w-1/4 bg-neutral-400 text-black px-4 py-2 rounded-xl font-serif hover:scale-105 transition duration-300 ease-in-out hover:bg-neutral-500 shadow-lg shadow-gray-500"
          onClick={generateResponse}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Generate Response"}
        </button>
        {loading ? (
          <ClipLoader
            color={"#f97316"}
            loading={loading}
            size={30}
            className="mt-5"
          />
        ) : (
          <div className="text-black md:mt-15 mt-10 mb-10 md:text-lg text-sm font-sans mx-1 text-justify tracking-normal">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseSection;
