import React from "react";
import { FaWhatsapp } from "react-icons/fa";

import { User } from "@/types";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { WindowHeader } from "./WindowHeader";
// import { ChatStartDate } from "./ChatStartDate";

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
    <div className="bg-[url('/backgrounds/whatsapp_background.png')] flex flex-col max-h-screen">
      {/* Header */}
      <WindowHeader user={user} />
      {/* Messages */}
      <div className="flex-1 flex-col space-y-4 p-4 overflow-scroll h-full content-end">
        {user?.messages?.map((message) => (
          <MessageBubble key={message.id} currentUser="Roy" message={message} />
        ))}
      </div>
      {/* Text Input Area */}
      <MessageInput />
    </div>
  );
};
