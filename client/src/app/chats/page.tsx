"use client";

import { Inbox } from "@/components/UI/Chat/Inbox";
import { ChatWindow } from "@/components/UI/Chat/ChatWindow";
import React, { useEffect, useState } from "react";
import { UserChatsType } from "@/types";
import { socket } from "@/lib/socket";
import { useUser } from "@/context/UserContext";

const Chat = () => {
  const { currentUser } = useUser();
  const [users, setUsers] = useState<UserChatsType[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isConnected, setIsConnected] = useState(false);

  // const getUser = (user_id: number) => {
  //   return users.find((user) => user.id == user_id);
  // };

  const openChat = (id: number) => {
    setSelectedUserId(id);
  };

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        `/api/chats/all?user_id=${currentUser?.user_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      //  Geting response from API
      const data = await response.json();

      // Handling Response
      if (response.ok) {
        setUsers(data.data);
      }
    };

    getUsers();
  }, [currentUser]);

  return (
    <div className="min-h-screen font-[family-name:var(--font-nunito-sans)] bg-white/90 grid grid-cols-12 text-secondary">
      <div className="grid col-span-3 bg-white">
        <Inbox users={users} openChat={openChat} />
      </div>
      <div className="grid col-span-9 bg-white/70">
        <ChatWindow users={users} selectedUserId={selectedUserId} />
      </div>
    </div>
  );
};

export default Chat;
