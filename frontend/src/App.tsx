import { useState } from "react";
import "./App.css";
import type { Chat } from "./model/chat";
import ChatHistory from "./components/ChatHistory";
import PromptBar from "./components/PromptBar";
import { chatWithAI } from "./services/apiservice";
import InitialPage from "./components/InitialPage";
import type { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";

function App() {
  // Generate a unique user ID for this session using UUID
  const [userId] = useState<string>(uuidv4());

  // Store the chat conversation history as an array of Chat objects
  const [chats, setChats] = useState<Chat[]>([]);

  // Store the current user input text from the prompt bar
  const [prompt, setPrompt] = useState<string>("");

  // Store any uploaded file (image) for multimodal conversations
  const [file, setFile] = useState<File | null>(null);

  /**
   * Handles the submission of a user message to the AI
   * This method:
   * 1. Validates the prompt is not empty
   * 2. Creates a temporary chat entry with loading state
   * 3. Prepares FormData with user prompt and optional image
   * 4. Sends the request to the AI service
   * 5. Updates the chat history with the AI response
   * 6. Handles errors gracefully with user-friendly messages
   */
  const handleSubmit = async () => {
    // Trim whitespace and validate that prompt is not empty
    const chatPrompt = prompt.trim();
    if (!chatPrompt) return;

    // Create initial chat object with user message and loading state for AI response
    const initiallyChatShow = {
      user: chatPrompt,
      ai: null, // null indicates AI is still processing
      image: file ? URL.createObjectURL(file) : null, // Create preview URL for uploaded image
    };

    try {
      // Immediately add the user message to chat history for instant feedback
      setChats((prevChats) => {
        return [...prevChats, initiallyChatShow];
      });

      // Prepare FormData for multipart request (text + optional image)
      const formData: FormData = new FormData();
      formData.append(
        "chatPrompt",
        new Blob([JSON.stringify({ userId, prompt: chatPrompt })], {
          type: "application/json",
        })
      );

      // Add image file if user uploaded one, otherwise add empty blob
      if (file) {
        formData.append("image", file as Blob);
      } else {
        formData.append("image", new Blob());
      }

      // Clear input fields immediately for better UX
      setPrompt("");
      setFile(null);

      // Send request to AI service and wait for response
      const response = await chatWithAI(formData);

      // Update the last chat entry with the AI response
      setChats((prevChats) => {
        const updatedChats = [...prevChats];
        updatedChats[updatedChats.length - 1] = {
          ...initiallyChatShow,
          ai: response.response, // Replace null with actual AI response
        };
        return updatedChats;
      });
    } catch (error) {
      // Handle API errors gracefully by showing error message in chat
      setChats((prevChats) => {
        const updatedChats = [...prevChats];
        updatedChats[updatedChats.length - 1] = {
          ...initiallyChatShow,
          ai:
            (error as AxiosError).message ||
            "Sorry, something went wrong. Please try again.",
        };
        return updatedChats;
      });
    } finally {
      // Ensure input fields are cleared regardless of success/failure
      setPrompt("");
      setFile(null);
    }
  };

  /**
   * Handles keyboard input in the textarea
   * Enables users to send messages with Enter key (without Shift)
   * Shift+Enter allows for multi-line input
   *
   * @param e - React keyboard event from the textarea
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter was pressed without Shift key
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default newline behavior
      setPrompt(""); // Clear the prompt input
      handleSubmit(); // Submit the message
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        {/* Conditional rendering: Show chat history if conversations exist, otherwise show welcome page */}
        {chats.length > 0 ? (
          <ChatHistory messages={chats} file={file} />
        ) : (
          <InitialPage />
        )}

        {/* Always visible input bar for user to type messages */}
        <PromptBar
          file={file}
          handleKeyDown={handleKeyDown}
          setPrompt={setPrompt}
          setFile={setFile}
          prompt={prompt}
          sendPrompt={handleSubmit}
        />
      </div>
    </>
  );
}

export default App;
