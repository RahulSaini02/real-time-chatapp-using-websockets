import React from "react";
import Image from "next/image";
import { FaCheck, FaCheckDouble } from "react-icons/fa";

interface InboxUser {
  id: number;
  name: string;
  lastMessage: string;
  status: string;
  time: string;
  profile_pic: string;
  unreadCount: number;
}

export const ChatInboxItem = ({ user }: { user: InboxUser }) => {
  return (
    <div className="flex gap-4 items-center p-2 py-4 cursor-pointer rounded-lg bg-white hover:bg-stone-100 max-h-24">
      <Image
        alt={user?.name || ""}
        src={user?.profile_pic || ""}
        className="rounded-full object-cover aspect-square"
        width={60}
        height={60}
        layout="fixed"
        priority
      />
      {/* For name, time and last message */}
      <div className="w-full flex-1 relative">
        <h4 className="text-secondary text-md font-bold">{user.name}</h4>
        <p className="text-accent text-base">
          <span className="font-semibold">{user.lastMessage}</span>
        </p>
      </div>
      {/* Unread Messages Badge & Status */}
      <div className="flex flex-col items-end">
        <span
          className={`${user.unreadCount > 0 ? "text-green-500" : "text-accent"} text-sm font-medium`}
        >
          {user.time}
        </span>
        {user.unreadCount > 0 ? (
          <span className="mt-1 bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {user.unreadCount}
          </span>
        ) : (
          <span className="mt-1 font-bold w-5 h-5 flex items-center justify-center">
            {user.status === "sent" && <FaCheck className="text-muted" />}
            {user.status === "delivered" && (
              <FaCheckDouble className="text-muted" />
            )}
            {user.status === "read" && (
              <FaCheckDouble className="text-blue-500" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};
