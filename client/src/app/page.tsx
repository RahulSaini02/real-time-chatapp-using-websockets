"use client";

import Image from 'next/image'
import React from 'react'

const SignIn = () => {    
    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-nunito-sans)] bg-white/90">
        {/* Overlay */}
        <div className="absolute inset-0 bg-green-600 bg-opacity-50 h-[50vh] md:h-[35vh]"></div>
        {/* Logo */}
        <Image src='logo/logo-inline-white.svg' alt="Inline Logo" height={100} width={250} className='relative z-10 pb-20' />
        <div className='relative z-10 flex justify-center place-items-center'>
          {/* Login Container */}
          <div className='bg-white w-[70%] p-10 rounded-md h-[70vh] flex justify-center place-items-center gap-20'>
            {/* Left Image */}
            <div className="flex flex-col flex-shrink-0 place-items-center justify-center space-y-4">
              <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 overflow-hidden rounded-full">
                <Image
                  src='doodle_background.svg'
                  alt='doodle background'
                  fill
                  sizes="(max-width: 1000px) 100vw, 50vw"
                  placeholder = 'blur'
                  blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMN7ldDwAENwHnfg9UxAAAAABJRU5ErkJggg=='
                  objectFit="cover"
                  priority
                  className="bg-primary mask mask-image"
                />
              </div>

              <div className='space-y-2'>
                <h2 className="text-4xl font-bold mt-10 text-center text-secondary">Welcome to WhatsApp</h2>
                <p className="text-accent font-bold">Message privately with friends and family using WhatsApp.</p>
              </div>
            </div>
            <div className='text-accent'>
              Form Input
            </div>
          </div>
        </div>
      </div>
    )
}

export default SignIn