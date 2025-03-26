import React from "react";
import { FaCheck, FaCheckDouble } from "react-icons/fa";

interface MessageType {
  id: number;
  text: string;
  sender: string;
  time: string;
  status: string;
}

export const ChatMessage = ({
  currentUser,
  message,
}: {
  currentUser: string;
  message: MessageType;
}) => {
  return (
    <div
      className={`flex ${currentUser == message.sender ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative ${currentUser == message.sender ? "bg-green-200" : "bg-white"} text-secondary px-4 py-2 rounded-lg shadow-md max-w-[50vw]`}
      >
        {/* Message Text */}
        <p className="text-lg leading-relaxed break-words pr-14">
          {message.text}
        </p>

        {/* Time & Status */}
        <div
          className={`absolute right-2 bottom-2 flex items-center space-x-1 text-muted font-semibold text-sm`}
        >
          <span className="whitespace-nowrap">{message.time}</span>
          {currentUser == message.sender && message.status === "sent" && (
            <FaCheck className="text-muted" />
          )}
          {currentUser == message.sender && message.status === "delivered" && (
            <FaCheckDouble className="text-muted" />
          )}
          {currentUser == message.sender && message.status === "read" && (
            <FaCheckDouble className="text-blue-500" />
          )}
        </div>

        {/* Message Tail */}
        {/* <div className="absolute right-[0.6rem] -bottom-0 w-3 h-3 bg-green-200 rotate-45 -mb-1 -mr-1"></div>  */}
      </div>
    </div>
  );
};
