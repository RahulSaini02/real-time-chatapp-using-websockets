import { User } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

export const NewChatInput = () => {
  const [showNewChat, setShowNewChat] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>()
  const [userFound, setUserFound] = useState<{
    message: string;
    status: string;
  } | null>(null);

  const newChatSearch = async () =>{
    const response = await fetch(
      `/api/users?email=${email}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    //  Geting response from API
    const data = await response.json();

    // Handling Response
    if (response.ok) {
      setUser(data.data);
      setUserFound({
        "message": data.message,
        "status": "passed"
      });
    } 

    if(response.status == 404) {
      setUserFound({
        "message": data.error,
        "status": "failed"
      })
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value == ""){
      setUser(null)
      setUserFound(null)
    }
    setEmail(e.target.value)
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && email.trim() != "") {
        newChatSearch();
    }
  }

  const handleNewChatButton = ()=> {
    setShowNewChat(!showNewChat)
    setEmail("")
    setUser(null)
    setUserFound(null)
  }



  return (
    <div className="popup-overlay">
      <div className="popup relative">
        {/* Add New Chat Button */}
        <button
          className="left-0.5"
          type="button"
          onClick={handleNewChatButton}
        >
          <MdOutlinePersonAddAlt1 className="h-6 w-6 text-accent cursor-pointer" />
        </button>
        {/* Input Dialogue box */}
        {showNewChat && (
          <div className="absolute left-6 transform -translate-x-1/2  popup bg-neutral-50 border-1 border-accent/30 shadow-lg h-100 w-100 z-50 rounded-lg p-4">
            <div className="absolute popup right-[50%] transform -translate-x-1/2 -top-1.5 w-3 h-3 bg-neutral-50 border-t-1 border-l-1 border-accent/30 rotate-45"></div>
              <h1 className="text-lg text-center font-bold text-secondary/80 mb-2">
                New Chat
              </h1>
            <div className="relative flex place-items-center bg-white w-full px-3 py-2 border border-gray-300 rounded-lg group-focus:ring-2 group-focus:ring-fuchsia-300">
              <FaSearch className=" text-gray-400" />
              <input
                className="text-accent outline-none placeholder:text-accent/70 placeholder:font-semibold flex-1 ml-2 group"
                type="text" value={email} onChange={handleInputChange} onKeyDown={handleEnter}
              />
              {/* absolute top-1/2 left-6 transform -translate-y-1/2 */}
            </div>
            <div className="my-2">
              {
                email.trim() === user?.email ? 
                <SearchResultUser user={user} /> : 
                (
                  <div className="flex justify-center items-center p-2 py-4 rounded-lg bg-white max-h-24">
                    {
                      userFound?.status === "failed" && email.trim() !== "" ?
                      <p className="text-accent font-bold">{userFound.message}</p> :
                      <p className="text-accent font-bold">Add New Friends!</p>
                    }
                  </div>
                )
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const SearchResultUser = ({user}: {user: User}) => {
  return (
    <div className="flex gap-4 items-center p-2 py-4 cursor-pointer rounded-lg bg-white hover:bg-gray-100 max-h-24">
            <Image
              alt={user?.name || ""}
              src={
                user?.profile_pic
                  ? `/profiles/${user?.profile_pic}`
                  : "/profiles/default.png"
              }
              className="rounded-full object-cover aspect-square"
              width={60}
              height={60}
              layout="fixed"
              priority
            />
            {/* For name, email {*/}
            <div className="w-full flex-1 relative">
              <h4 className="text-secondary text-md font-bold">{user?.name}</h4>
                <p className="text-accent text-base">
                  <span className="font-semibold">{user?.email}</span>
                </p>
            </div>          
    </div>
  )
};