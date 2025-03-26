"use client";

import React, { useState } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export const MessageInput = () => {
  const [messageInput, setMessageInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessageInput((prevMessage) => prevMessage + emojiData.emoji);
    setShowPicker(false); // Hide picker after selection
  };

  return (
    <form className="flex space-x-2 px-4 py-3 bg-gray-100">
      <div className="flex justify-between place-items-center w-full bg-white border border-gray-300 rounded-full">
        <input
          type="text"
          name="message-input"
          value={messageInput}
          className=" flex-1 px-3 py-2 text-secondary text-base outline-none caret-green-700"
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <div>
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="p-2"
          >
            <MdOutlineEmojiEmotions className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </button>
          {/* Emoji Picker Dropdown */}
          {showPicker && (
            <div className="absolute bottom-12 right-0 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-green-600 text-white rounded-full flex justify-between place-items-center p-2 cursor-pointer"
      >
        <IoSend className="h-6 w-6" />
      </button>
    </form>
  );
};
