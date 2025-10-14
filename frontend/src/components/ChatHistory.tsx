import Markdown from "react-markdown";
import type { Chat } from "../model/chat";
import { SyncLoader } from "react-spinners";

export default function ChatHistory({
  messages,
  file,
}: {
  messages: Chat[];
  file?: File | null;
}) {
  return (
    <div className="flex flex-col">
      {/* Glassmorphic Header */}
      <div className="sticky top-0 z-50 p-3 w-full flex justify-center border-b border-white/20 backdrop-blur-md shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Miko
          </h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        className={`flex flex-col mt-4 space-y-4 p-4 ${
          file ? "pb-50" : "pb-35"
        } max-w-4xl mx-auto w-[80vw]`}
      >
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col space-y-3">
            {/* User Message - Right Side */}
            <div className="flex justify-end flex-col items-end space-y-2">
              <div className="max-w-[75%] bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-md shadow-lg">
                <p className="leading-relaxed break-words">{msg.user}</p>
              </div>
              {msg.image && (
                <div className="max-w-[75%] relative bottom-3 text-white rounded-2xl rounded-br-md shadow-lg">
                  <img
                    src={msg.image}
                    alt="User uploaded"
                    className="mt-2 w-50 rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* AI Response - Left Side */}
            <div className="flex justify-start">
              <div className="max-w-[75%] bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-md shadow-lg">
                <p className="text-sm font-medium text-gray-600 mb-1">Miko</p>
                <p className="leading-relaxed break-words whitespace-pre-wrap">
                  {msg.ai === null ? (
                    <SyncLoader size={5} />
                  ) : (
                    <Markdown>{msg.ai}</Markdown>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state when no messages */}
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <p className="text-lg font-medium">Start a conversation</p>
              <p className="text-sm">Your chat history will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
