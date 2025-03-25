import React from 'react'
import { User } from '@/types';
import { ChatSearch } from './ChatSearch';
import { ChatItem } from './ChatItem';

export const ChatInbox = ( { users, handleSelectedUser }: { users: User[], handleSelectedUser: ( id: number ) => void } ) => {
    const formattedUsers = users.map( user => {
        const lastMessage = user.messages[user.messages.length - 1]; // Get last message
        const unreadCount = user.messages.filter( msg => msg.status !== "read" ).length; // Count unread messages
        return {
            id: user.id,
            name: user.name,
            lastMessage: lastMessage?.text || "", // Handle case where no messages exist
            status: lastMessage?.status || "sent",
            time: lastMessage?.time || "",
            profile_pic: user.profile_pic,
            unreadCount: unreadCount,
        };
    } );

    return (
        // Main Div
        <div className='flex flex-col bg-white max-h-screen border border-r-1 border-accent' >
        {/* Div consist  Main Heading and search box*/ }
            <div className='bg-white' >
                <h3 className='text-2xl font-bold text-secondary p-4 pb-1' > Chats </h3>
                {/* Div for search box */ }
                <ChatSearch users={users} />
                {/* All users */ }
                <div className='flex flex-1 flex-col space-y-2 p-2 overflow-y-auto' >
                {
                    formattedUsers.length === 0 ? (
                    <p className= "text-center text-gray-500" >No chats available</p >
                    ) : (
                    // creating a loop for user to appear on chatInbox
                        formattedUsers.map((user, index ) => (
                            <div key={user.id} className={`${ index == users.length - 1 ? "mb-10" : "mb-0"}`} onClick = {() => handleSelectedUser( user.id )} >
                                <ChatItem user= { user } />
                            </div>))
                    )
                }
                </div>
            </div>  
        </div>  
  )
}
