import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleXmark,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";

export default function PromptBar({
  prompt,
  file,
  sendPrompt,
  setPrompt,
  handleKeyDown,
  setFile,
}: {
  file: File | null;
  prompt: string;
  sendPrompt: () => void;
  setPrompt: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  setFile: (file: File | null) => void;
}) {
  return (
    <div className="p-6 w-full flex justify-center border-t border-gray-200 fixed bottom-0 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl">
        <label
          className="absolute left-3 bottom-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 rounded-full py-1.5 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg cursor-pointer"
          onClick={sendPrompt}
          htmlFor="file-input"
          title="Attach image or file"
        >
          <FontAwesomeIcon icon={faPaperclip} className="w-4 h-4" />
        </label>
        <input
          type="file"
          className="hidden"
          id="file-input"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
          }}
        />
        {/* Preview of the selected file with option to remove */}
        {file && (
          <div className="absolute bottom-16 left-3 h-16 flex">
            <img
              src={URL.createObjectURL(file)}
              alt="User uploaded"
              className=" rounded-lg opacity-70"
            />
            <button
              onClick={() => setFile(null)}
              className="relative bottom-6 text-sm focus:outline-none cursor-pointer opacity-80 hover:opacity-70 transition"
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
        )}
        <textarea
          className={`w-full p-4 pr-16 pl-16 border border-gray-300 rounded-2xl mb-2 resize-none min-h-[60px] max-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 placeholder:text-gray-500 ${
            file ? "pt-20" : ""
          }`}
          name="prompt"
          id="prompt"
          placeholder="Type your message here..."
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          value={prompt}
        />
        <button
          className="absolute right-3 bottom-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 rounded-full py-1.5 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg cursor-pointer"
          onClick={sendPrompt}
          title="Send message"
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
