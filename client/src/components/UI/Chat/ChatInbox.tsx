"use client";

import React, { useState } from 'react'
import { Input } from '@/components/Util/Input';
import { FaSearch } from "react-icons/fa";
import Image from 'next/image';

export const ChatInbox = () => {
    const users = [{
        id: 1,
        name: 'Sateesh',
        lastMessage: 'Hello',
        time: '12:00',
        profilePic: '/profile.jpg'
        },
        {
            id: 2,
            name: 'Nithya',
            lastMessage: 'How are you',
            time: '01:00',
            profilePic: '/profile.jpg'
        },
        {
            id: 3,
            name: 'Rahul',
            lastMessage: 'How are you',
            time: '01:00',
            profilePic: '/profile.jpg'
        },
    ]

    

    const [searchInput, setSearchInput] = useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value)
    const usersCopy = users.filter((user) => user.name === value)
    
    console.log(usersCopy)
    };

    
 
  return (
    // Main Div
    <div className='flex flex-col bg-white max-h-screen'>
        {/* Div consist  Main Heading and search box*/}
        <div className='bg-white'>
            <h3 className='text-2xl font-bold text-secondary p-4 pb-1'>Chats</h3>
            {/* Div for search box */}
            <div className='relative w-full p-2 pl-10 rounded'>
                <Input 
                    label=''
                    type='text'
                    name='search'
                    value={searchInput}
                    onChange={handleChange}
                />
                <FaSearch className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted'/>
            </div>
        </div>
        {/* All users */}
        <div className='flex flex-1 flex-col space-y-2 p-2 overflow-y-auto'>
            {
                // creating a loop for user to appear on chatInbox
                users.map((user, index) => (
                    // TO generate image
                    <div key={user.id} className={`${index == users.length-1 ? 'mb-10' : 'mb-0'} flex gap-5 p-2 cursor-pointer rounded-lg bg-white hover:bg-stone-100 max-h-18`}>
                        <div>
                            <Image 
                                src={user.profilePic} 
                                alt='user profile' 
                                width={50} 
                                height={50} 
                                className='rounded-full'
                            />
                        </div>
                        {/* For name, time and last message */}
                        <div className='w-full'>
                            <div className='flex w-full justify-between place-items-center'>
                                <div><h3>{user.name}</h3></div>
                                <div><p>{user.time}</p></div>
                            </div>
                            <p>{user.lastMessage}</p>
                        </div>
                    </div>
                ))
            }
            
        </div>
    </div>
    // Main heading Chats
    // input box to search user by name
    //list of users--> user name, last message, time of last message

    
    
  )
}
