import Image from 'next/image';
import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

import { User } from '@/types';
import { ChatMessage } from './ChatMessage';
import { MessageInput } from './MessageInput';

export const ChatWindow = ({ users, selectedUserId }: { users: User[], selectedUserId: number }) => {
  
  const user = users.find((user) => user.id === selectedUserId);

  if (!user) {
    return <p className="flex justify-center place-items-center min-h-screen bg-white/60 text-accent font-semibold p-4 text-5xl">WhatsApp for Users</p>;
  }

  return (
    <div className="bg-[url('/whatsapp_background.png')] flex flex-col max-h-screen">
      {/* Header */}
      <header className='flex justify-between place-items-center px-4 py-2 border-b-1 border-muted/30 bg-[#f4f4f4] max-h-16'>
        <div className='flex space-x-6 h-12 cursor-pointer'>
          <Image 
            alt={user?.name || ""}
            src={user?.profile_pic || ""} 
            className='rounded-full'
            width={50} 
            height={50} 
            objectFit="contain" 
            priority
          />
          <div className=''>
            <h3 className='text-secondary text-lg font-bold'>{user?.name}</h3>
            <p className='text-accent text-base'>{user?.status}</p>
          </div>
        </div>
        <IoSearchOutline className='text-muted w-6 h-6 cursor-pointer' />
      </header>
      {/* Messages */}
        <div className='flex-1 flex-col space-y-4 p-4 overflow-scroll'>
          {
            user?.messages?.map((message) => (
                <ChatMessage key={message.id} currentUser="Roy"  message={message} />
            ))
          }
        </div>
      {/* Text Input Area */}
      <MessageInput />
    </div>
  )
}