import React from "react";
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
      <p className="flex justify-center place-items-center min-h-screen bg-white/60 text-accent font-semibold p-4 text-5xl">
        WhatsApp for Users
      </p>
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
