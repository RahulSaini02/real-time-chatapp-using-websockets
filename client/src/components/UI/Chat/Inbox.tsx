import React from "react";
import { User } from "@/types";
import { InboxHeader } from "./InboxHeader";
import { InboxParticipant } from "./InboxParticipant";

export const Inbox = ({
  users,
  handleSelectedUser,
}: {
  users: User[];
  handleSelectedUser: (id: number) => void;
}) => {
  const formattedUsers = users.map((user) => {
    const lastMessage = user.messages[user.messages.length - 1]; // Get last message
    const unreadCount = user.messages.filter(
      (msg) => msg.status !== "read"
    ).length; // Count unread messages
    return {
      id: user.id,
      name: user.name,
      lastMessage: lastMessage?.text || "", // Handle case where no messages exist
      status: lastMessage?.status || "sent",
      time: lastMessage?.time || "",
      profile_pic: user.profile_pic,
      unreadCount: unreadCount,
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
              key={user.id}
              className={`${index == users.length - 1 ? "mb-10" : "mb-0"}`}
              onClick={() => handleSelectedUser(user.id)}
            >
              <InboxParticipant user={user} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
