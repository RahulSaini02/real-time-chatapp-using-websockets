"use client";

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-nunito-sans)] bg-white/90">
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-600 bg-opacity-50 h-[50vh] md:h-[35vh]"></div>
      {/* Logo */}
      <Image src='logo/logo-inline-white.svg' alt="Inline Logo" height={100} width={250} className='relative z-10 pb-20' />
      <div className='relative z-10 flex justify-center place-items-center'>
        {/* Login Container */}
        <div className='bg-white w-full p-10 rounded-md h-[70vh]'>
          {/* <Input  /> */}
        </div>
      </div>
      
    </div>
  )
}

export default SignUp