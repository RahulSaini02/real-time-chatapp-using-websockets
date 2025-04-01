"use client";

import { Inbox } from "@/components/UI/Chat/Inbox";
import { ChatWindow } from "@/components/UI/Chat/ChatWindow";
import React, { useEffect, useState } from "react";
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
          timestamp: "2024-02-28T18:00:00.000Z",
          status: "read",
        },
        {
          id: 2,
          text: "How are you?",
          sender: "Sam",
          timestamp: "2025-03-28T18:04:00.000Z",
          status: "read",
        },
        {
          id: 3,
          text: "I am doing great! What about you?",
          sender: "Roy",
          timestamp: "2025-03-28T18:06:00.000Z",
          status: "read",
        },
        {
          id: 4,
          text: "I am good.",
          sender: "Sam",
          timestamp: "2025-03-28T18:06:30.000Z",
          status: "read",
        },
        {
          id: 5,
          text: "Okay",
          sender: "Roy",
          timestamp: "2025-03-28T18:07:00.000Z",
          status: "read",
        },
        {
          id: 6,
          text: "Bye",
          sender: "Sam",
          timestamp: "2025-03-28T18:08:00.000Z",
          status: "sent",
        },
        {
          id: 7,
          text: "Hey, good morning!",
          sender: "Sam",
          timestamp: "2025-03-29T09:00:00.000Z",
          status: "read",
        },
        {
          id: 8,
          text: "Good morning! How's your day going?",
          sender: "Roy",
          timestamp: "2025-03-29T09:02:00.000Z",
          status: "read",
        },
        {
          id: 9,
          text: "Pretty good, just started working on my project.",
          sender: "Sam",
          timestamp: "2025-03-29T09:05:00.000Z",
          status: "read",
        },
        {
          id: 10,
          text: "That sounds great! Need any help?",
          sender: "Roy",
          timestamp: "2025-03-29T09:06:30.000Z",
          status: "read",
        },
        {
          id: 11,
          text: "Not right now, but I’ll let you know.",
          sender: "Sam",
          timestamp: "2025-03-29T09:08:00.000Z",
          status: "sent",
        },
        {
          id: 12,
          text: "Sure, just ping me anytime!",
          sender: "Roy",
          timestamp: "2025-03-29T09:09:00.000Z",
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
          timestamp: "2025-03-29T09:09:00.000Z",
          status: "read",
        },
        {
          id: 2,
          text: "Hey Mary! How's your day going?",
          sender: "Roy",
          timestamp: "2025-03-29T09:09:00.000Z",
          status: "read",
        },
        {
          id: 3,
          text: "Pretty good, just finished some work. You?",
          sender: "Mary",
          timestamp: "2025-03-29T09:09:00.000Z",
          status: "read",
        },
        {
          id: 4,
          text: "Same here, just relaxing now.",
          sender: "Roy",
          timestamp: "2025-03-29T09:09:00.000Z",
          status: "read",
        },
        {
          id: 5,
          text: "Sounds good! Want to catch up later?",
          sender: "Mary",
          timestamp: "2025-03-29T09:09:00.000Z",
          status: "read",
        },
        {
          id: 6,
          text: "Yeah, let's do it!",
          sender: "Roy",
          timestamp: "2025-03-29T09:09:00.000Z",
          status: "read",
        },
        {
          id: 7,
          text: "Awesome! Talk soon 😊",
          sender: "Mary",
          timestamp: "2025-03-29T09:09:00.000Z",
          status: "sent",
        },
      ],
    },
  ];
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [usersList, setUsersList] = useState(users);

  const handleSelectedUser = (id: number) => {
    setSelectedUserId(id);
  };

  // const getUsers = async () => {
  //   const response = await fetch("/api/users", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   });

  //    Geting response from API
  //   const data = await response.json();

  //   Handing Response
  //   if (response.ok) {
  //     setUsersList(data.data);
  //     console.log(data.data);
  //   }
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);

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
