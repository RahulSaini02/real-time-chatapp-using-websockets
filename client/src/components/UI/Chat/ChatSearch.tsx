import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { User } from '@/types';

export const ChatSearch = ({users}: {users: User[]}) => {
    const [searchInput, setSearchInput] = useState("")
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
    <div className='relative w-full p-2 rounded'>
        <input
            type='text'
            name='search'
            value={searchInput}
            onChange={handleSearch}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300 text-gray-600 outline-none placeholder:pl-8"
            placeholder="Search"
            autoComplete="off"
          />
        <FaSearch className='absolute top-1/2 left-6 transform -translate-y-1/2 text-gray-400'/>
    </div>
  )
}
