"use client";

import Image from "next/image";
import { LoginForm } from "@/components/UI/Auth/LoginForm";
import { AuthContainerImage } from "@/components/UI/Auth/AuthContainerImage";
import { useEffect } from "react";
import { socket } from "./socket";

const SignIn = () => {
  useEffect(() => {
    // client-side
    socket.on("connect", () => {
      socket.emit("my event", { data: "I'm connected!" });
      console.log(socket.connected);
    });
  }, []);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-nunito-sans)] bg-white/90">
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary bg-opacity-50 h-[50vh] md:h-[35vh]"></div>
      {/* Logo */}
      <Image
        src="logo/logo-inline-white.svg"
        alt="Inline Logo"
        height={100}
        width={250}
        className="relative z-10 pb-20"
      />
      <div className="relative z-10 flex justify-center place-items-center">
        {/* Login Container */}
        <div className="bg-white w-[70%] p-10 rounded-md h-[70vh] flex justify-between place-items-center">
          {/* Left Image */}
          <div className="flex justify-center place-items-center flex-1">
            <AuthContainerImage />
          </div>
          {/* Login Form */}
          <div className="flex justify-center place-items-center flex-1">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
