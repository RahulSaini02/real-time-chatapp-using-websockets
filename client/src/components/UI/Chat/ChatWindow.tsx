import React from "react";
import { FaWhatsapp } from "react-icons/fa";

import { User } from "@/types";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { ChatWindowHeader } from "./ChatWindowHeader";

export const ChatWindow = ({
  users,
  selectedUserId,
}: {
  users: User[];
  selectedUserId: number;
}) => {
  const user = users.find((user) => user.id === selectedUserId);

  if (!user) {
    return (
      <div className="flex flex-col space-y-4 min-h-screen justify-center place-items-center">
        <FaWhatsapp className="h-36 w-36 text-accent/60" />
        <p className=" text-accent/70 font-semibold p-4 text-5xl">
          WhatsApp for Web
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[url('/whatsapp_background.png')] flex flex-col max-h-screen">
      {/* Header */}
      <ChatWindowHeader user={user} />
      {/* Messages */}
      <div className="flex-1 flex-col space-y-4 p-4 overflow-scroll">
        {user?.messages?.map((message) => (
          <ChatMessage key={message.id} currentUser="Roy" message={message} />
        ))}
      </div>
      {/* Text Input Area */}
      <MessageInput />
    </div>
  );
};
