import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

export const NewChatInput = () => {
  const [showNewChat, setShowNewChat] = useState(false);

  return (
    <div className="popup-overlay">
        <div className='popup'>
            <button
                className='left-0.5'
                type='button'
                onClick={()=>setShowNewChat(!showNewChat)}>
                    <MdOutlinePersonAddAlt1 className='h-6 w-6'/>
            </button>
            {showNewChat && (
                        <div className="absolute popup bg-gray-200 h-100 w-100 z-50 rounded-lg p-4">
                            <h1 className="text-2lg text-center font-bold text-secondary mb-2">
                                New Chat
                            </h1>
                            <div className='relative'>
                                <input 
                                    className="bg-white w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300 text-accent outline-none placeholder:pl-2 placeholder:text-accent/70 placeholder:font-semibold caret-fuchsia-300"
                                    type="text"
                                     />
                                <FaSearch className="absolute top-1/2 left-6 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    )}
        </div>
    </div>
  );
};
