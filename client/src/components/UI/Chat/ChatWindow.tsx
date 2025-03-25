'use client';

import Image from 'next/image';
import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export const ChatWindow = () => {

  // const users = [
  //   {
  //     id: 1,
  //     name: 'Rahul',
  //     profile_pic: '/profile.jpg',
  //     status: 'Online',
  //     messages: []
  //   }
  // ]
  const [messageInput, setMessageInput] = useState("")
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessageInput(value)
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessageInput((prevMessage) => prevMessage + emojiData.emoji);
    setShowPicker(false); // Hide picker after selection
  };

  return (
    <div className="bg-[url('/whatsapp_background.png')] flex flex-col max-h-screen">
      {/* Header */}
      <header className='flex justify-between place-items-center px-4 py-2 border-b-1 border-muted/30 bg-[#f4f4f4] max-h-16'>
        <div className='flex space-x-6 h-12 cursor-pointer'>
          <Image 
            alt="Profile Picture" 
            src="/profile.jpg" 
            className='rounded-full'
            width={50} 
            height={50} 
            objectFit="contain" 
            priority
          />
          <div className=''>
            <h3 className='text-secondary text-lg font-bold'>Rahul Saini</h3>
            <p className='text-accent text-base'>Online</p>
          </div>
        </div>
        <IoSearchOutline className='text-muted w-6 h-6 cursor-pointer' />
      </header>
      {/* Messages */}
        <div className='flex-1'>

        </div>
      {/* Text Input Area */}
      <form className='flex space-x-2 px-4 py-3 bg-gray-100'>
        <div className='flex justify-between place-items-center w-full bg-white border border-gray-300 rounded-full'>
          <input 
            type="text" 
            name="message-input" 
            value={messageInput}
            className=" flex-1 px-3 py-2 text-secondary text-base outline-none caret-green-700"
            onChange={handleChange}
          />
          <div>
            <button
              type="button"
              onClick={() => setShowPicker(!showPicker)}
              className='p-2'
            >
              <MdOutlineEmojiEmotions className='h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer' />
            </button>
            {/* Emoji Picker Dropdown */}
            {showPicker && (
              <div className="absolute bottom-12 right-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </div>
        <button type='submit' className='bg-primary hover:bg-green-600 text-white rounded-full flex justify-between place-items-center p-2 cursor-pointer'>
          <IoSend className='h-6 w-6' />
        </button>
      </form>
    </div>
  )
}