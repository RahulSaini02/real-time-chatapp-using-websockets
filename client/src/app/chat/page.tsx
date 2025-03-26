"use client";

import { Inbox } from "@/components/UI/Chat/Inbox";
import { ChatWindow } from "@/components/UI/Chat/ChatWindow";
import React, { useState } from "react";
import { User } from "@/types";

const Chat = () => {
  const users: User[] = [
    {
      id: 1,
      name: "Sam",
      profile_pic: "/sam.jpg",
      status: "Online",
      messages: [
        {
          id: 1,
          text: "Hi",
          sender: "Roy",
          time: "18:00",
          status: "read",
        },
        {
          id: 2,
          text: "How are you?",
          sender: "Sam",
          time: "18:04",
          status: "read",
        },
        {
          id: 3,
          text: "I am, doing great! What about you?",
          sender: "Roy",
          time: "18:06",
          status: "read",
        },
        {
          id: 4,
          text: "I am good.",
          sender: "Sam",
          time: "18:06",
          status: "read",
        },
        {
          id: 5,
          text: "Okay",
          sender: "Roy",
          time: "18:06",
          status: "read",
        },
        {
          id: 6,
          text: "Bye",
          sender: "Sam",
          time: "18:08",
          status: "sent",
        },
      ],
    },
    {
      id: 2,
      name: "Monica",
      profile_pic: "/molly.jpg",
      status: "Online",
      messages: [
        {
          id: 1,
          text: "Hey Roy!",
          sender: "Mary",
          time: "17:45",
          status: "read",
        },
        {
          id: 2,
          text: "Hey Mary! How's your day going?",
          sender: "Roy",
          time: "17:46",
          status: "read",
        },
        {
          id: 3,
          text: "Pretty good, just finished some work. You?",
          sender: "Mary",
          time: "17:48",
          status: "read",
        },
        {
          id: 4,
          text: "Same here, just relaxing now.",
          sender: "Roy",
          time: "17:50",
          status: "read",
        },
        {
          id: 5,
          text: "Sounds good! Want to catch up later?",
          sender: "Mary",
          time: "17:52",
          status: "read",
        },
        {
          id: 6,
          text: "Yeah, let's do it!",
          sender: "Roy",
          time: "17:53",
          status: "read",
        },
        {
          id: 7,
          text: "Awesome! Talk soon 😊",
          sender: "Mary",
          time: "17:55",
          status: "sent",
        },
      ],
    },
  ];
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const handleSelectedUser = (id: number) => {
    setSelectedUserId(id);
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-nunito-sans)] bg-white/90 grid grid-cols-12 text-secondary">
      <div className="grid col-span-3 bg-white">
        <Inbox users={users} handleSelectedUser={handleSelectedUser} />
      </div>
      <div className="grid col-span-9 bg-white/70">
        <ChatWindow users={users} selectedUserId={selectedUserId} />
      </div>
    </div>
  );
};

export default Chat;
