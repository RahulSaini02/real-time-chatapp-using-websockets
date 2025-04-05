import React, { useEffect, useMemo, useState } from "react";
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
  selectedUserId: string;
}) => {
  const { currentUser } = useUser();
  const user = useMemo(
    () => users.find((u) => u.user_id === selectedUserId),
    [users, selectedUserId]
  );
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  // Load messages from database
  useEffect(() => {
    const getChatMessages = async () => {
      const response = await fetch(
        `/api/chats/messages?chat_id=${user?.chat_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      //  Geting response from API
      const data = await response.json();

      // Handling Response
      if (response.ok) {
        setChatMessages(data.data);
      }
    };

    getChatMessages();
  }, [user]);

  // Load messages from websocket
  useEffect(() => {
    if (!currentUser?.user_id || !user?.chat_id) return;

    const { user_id } = currentUser;
    const { chat_id } = user;

    console.log(`Joining chat room: ${chat_id}`);

    const messageListener = (data: { data?: Message }) => {
      console.log("Received data: ", data);
      if (!data?.data?.message_text) {
        console.error("Invalid message received:", data);
        return;
      }
      setChatMessages((prev) => [...prev, data.data as Message]);
    };

    socket.emit("join_room", { user_id, room: chat_id });
    socket.on("receive_message", messageListener);

    return () => {
      console.log(`Leaving chat room: ${chat_id}`);
      socket.off("receive_message", messageListener);
      socket.emit("leave", { room: chat_id });
    };
  }, [currentUser, currentUser?.user_id, user, user?.chat_id]);

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
            key={message?.message_id}
            currentUser={currentUser?.user_id}
            message={message}
          />
        ))}
      </div>
      {/* Text Input Area */}
      <MessageInput chat_id={user?.chat_id} />
    </div>
  );
};
