import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Message, UserChatsType } from "@/types";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { WindowHeader } from "./WindowHeader";
import { socket } from "@/lib/socket";
import { useUser } from "@/context/UserContext";
// import { ChatStartDate } from "./ChatStartDate";

export const ChatWindow = ({
  users,
  selectedUserId,
}: {
  users: UserChatsType[];
  selectedUserId: number;
}) => {
  const { currentUser } = useUser();
  const user = users.find((user) => user.user_id === selectedUserId);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messageListener = (data: { message: Message }) => {
      console.log("Received message:", data);

      if (!data || !data.message?.text) {
        console.error("Invalid message received:", data);
        return;
      }

      setChatMessages((prev) => [...prev, data.message]);
    };

    if (currentUser?.user_id && user?.chat_id) {
      console.log("Joining room:", user.chat_id);
      socket.emit("join_room", {
        user_id: currentUser?.user_id,
        room: user?.chat_id,
      });
      socket.on("receive_message", messageListener);
    }
    return () => {
      socket.off("receive_message", messageListener);
      socket.emit("leave", { room: user?.chat_id });
    };
  }, [currentUser?.user_id, user?.chat_id, selectedUserId]);

  return !user ? (
    <div className="flex flex-col space-y-4 min-h-screen justify-center place-items-center">
      <FaWhatsapp className="h-36 w-36 text-accent/60" />
      <p className=" text-accent/70 font-semibold p-4 text-5xl">
        WhatsApp for Web
      </p>
    </div>
  ) : (
    <div className="bg-[url('/backgrounds/whatsapp_background.png')] flex flex-col max-h-screen">
      {/* Header */}
      <WindowHeader user={user} />
      {/* Messages */}
      <div className="flex-1 flex-col space-y-4 p-4 overflow-scroll h-full content-end">
        {chatMessages?.map((message) => (
          <MessageBubble
            key={message?.id || Math.random()}
            currentUser={currentUser?.name}
            message={message}
          />
        ))}
      </div>
      {/* Text Input Area */}
      <MessageInput chat_id={user?.chat_id} />
    </div>
  );
};
