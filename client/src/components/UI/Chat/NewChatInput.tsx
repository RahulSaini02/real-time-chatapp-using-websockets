import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

export const NewChatInput = () => {
  const [showNewChat, setShowNewChat] = useState(false);

  return (
    <div className="popup-overlay">
      <div className="popup relative">
        <button
          className="left-0.5"
          type="button"
          onClick={() => setShowNewChat(!showNewChat)}
        >
          <MdOutlinePersonAddAlt1 className="h-6 w-6 text-accent cursor-pointer" />
        </button>
        {showNewChat && (
          <div className="absolute left-6 transform -translate-x-1/2  popup bg-neutral-50 border-1 border-accent/30 shadow-lg h-100 w-100 z-50 rounded-lg p-4">
            <div className="absolute popup right-[50%] transform -translate-x-1/2 -top-1.5 w-3 h-3 bg-neutral-50 border-t-1 border-l-1 border-accent/30 rotate-45"></div>
            <h1 className="text-lg text-center font-bold text-secondary/80 mb-2">
              New Chat
            </h1>
            <div className="relative flex place-items-center bg-white w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300">
              <FaSearch className=" text-gray-400" />
              <input
                className="text-accent outline-none placeholder:text-accent/70 placeholder:font-semibold flex-1 ml-2"
                type="text"
              />
              {/* absolute top-1/2 left-6 transform -translate-y-1/2 */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
