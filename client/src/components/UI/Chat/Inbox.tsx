import React from "react";
import { UserChatsType } from "@/types";
import { InboxHeader } from "./InboxHeader";
import { InboxParticipant } from "./InboxParticipant";

export const Inbox = ({
  users,
  openChat,
}: {
  users: UserChatsType[];
  openChat: (id: number) => void;
}) => {
  const formattedUsers = users?.map((user) => {
    // const lastMessage = user?.messages[user.messages.length - 1]; // Get last message
    // const unreadCount = user.messages.filter(
    //   (msg) => msg.status !== "read"
    // ).length; // Count unread messages
    const time = new Date().toISOString();
    return {
      user_id: user.user_id,
      name: user.name,
      lastMessage: "", // Handle case where no messages exist
      status: "sent",
      timestamp: time,
      profile_pic: user.profile_pic,
      unreadCount: 1,
      chat_id: user.chat_id,
    };
  });

  return (
    <div className="flex flex-col bg-white min-h-screen border border-r-1 border-accent">
      {/* Component for Main Heading & search box */}
      <InboxHeader users={users} />
      {/* Users List */}
      <div className="flex flex-1 flex-col p-2 overflow-y-auto">
        {formattedUsers.length === 0 ? (
          <p className="text-center text-gray-500">No chats available</p>
        ) : (
          // creating a loop for user to appear on chatInbox
          formattedUsers.map((user, index) => (
            <div
              key={user.user_id}
              className={`${index == users.length - 1 ? "mb-10" : "mb-0"}`}
              onClick={() => openChat(user.user_id)}
            >
              <InboxParticipant user={user} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
