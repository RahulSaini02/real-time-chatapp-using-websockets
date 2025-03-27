import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { User } from "@/types";
import { NewChatInput } from "./NewChatInput";

export const InboxHeader = ({ users }: { users: User[] }) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value.toLowerCase());

    // Filter users by partial match
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(value)
    );

    console.log(filteredUsers);
  };

  return (
    <div className="w-full p-2 rounded">
      <div className="flex place-items-center justify-between px-2 py-4 mb-2">
        <h3 className="text-2xl font-bold text-secondary">
          Chats
        </h3>
        <NewChatInput />
      </div>
      <div className="relative flex place-items-center">
        <input
          type="text"
          name="search"
          value={searchInput}
          onChange={handleSearch}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300 text-accent outline-none placeholder:pl-10 placeholder:text-accent/70 placeholder:font-semibold caret-fuchsia-300"
          placeholder="Search"
          autoComplete="off"
        />
        <FaSearch className="absolute top-1/2 left-6 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};
