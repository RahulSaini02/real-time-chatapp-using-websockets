import { User } from "@/types";
import Image from "next/image";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

export const WindowHeader = ({ user }: { user: User }) => {
  return (
    <header className="flex justify-between place-items-center px-4 py-2 border-b-2 border-muted/50 bg-[#f4f4f4] max-h-16 shadow-md">
      <div className="flex space-x-4 h-12 cursor-pointer">
        <Image
          alt={user?.name || ""}
          src={`/profiles${user?.profile_pic}` || "/profiles/default.png"}
          className="rounded-full aspect-square object-cover"
          width={50}
          height={50}
          priority
        />
        <div className="">
          <h3 className="text-secondary text-lg font-bold">{user?.name}</h3>
          <p className="text-accent text-base">{user?.status}</p>
        </div>
      </div>
      <IoSearchOutline className="text-muted w-6 h-6 cursor-pointer" />
    </header>
  );
};
