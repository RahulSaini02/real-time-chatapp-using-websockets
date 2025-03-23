"use client";

import Image from 'next/image'
import React from 'react'
import { Input } from '@/components/Util/Input';
import Link from 'next/link';

const SignIn = () => {  

  const[username, setUsername] = React.useState('')
  const[password, setPassword] = React.useState('')
  const[error, setError] = React.useState('')

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const validusername = 'admin'
      const validpassword = 'password'

    //   try{
    //     const response = await fetch('http://localhost:3000/api/login', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         username, 
    //         password
    //       }),
    //     });

    //     if (response.ok){
    //       const data = await response.json();
    //       console.log('Login Successful:', data);
    //       setError('valid')
    //       router.push('/dashboard');
    //     }else{
    //       const errorData = await response.json();
    //       console.log('Login Failed:', errorData);
    //       setError(errorData.message||'Invalid Credentials');
    //     }
    //   }catch(error){
    //     console.log('Error during login:', error);
    //     setError('An error occured. Please try again later.');
    //   }
    // };

      if (username === validusername && password === validpassword){ 
          console.log('Login Success', username, password)
          setError('valid')
      }
      else{
          setError('invalid')
      }
  };

    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-nunito-sans)] bg-white/90">
        {/* Overlay */}
        <div className="absolute inset-0 bg-primary bg-opacity-50 h-[50vh] md:h-[35vh]"></div>
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
              <h3 className='text-4xl font-bold text-secondary mb-4'>Login</h3>
              <p className='text-md md:text-lg text-accent'>Need an account? <Link href="/signup" className='text-blue-500 cursor-pointer underline font-semibold'>Create Account</Link>.</p><br />
              <div>
                <form>
                    <Input
                      label='Username' 
                      name='username'
                      type='text' 
                      value={username} 
                      onChange={(e)=>setUsername(e.target.value)}
                    />
                    <br />
                    <Input
                      label='Password' 
                      name='password'
                      type='password' 
                      value={password} 
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                    <br />
                    <div className='space-x-2' style={{justifyContent:'space-between'}}>
                      <button className="bg-primary cursor-pointer text-white px-4 py-2 rounded hover:bg-primary/95 transition-colors duration-150 ease-in" onClick={handleLogin}>Login</button>
                      <p className='text-md md:text-lg text-accent mt-5'><Link href="/signup" className='text-blue-500 cursor-pointer underline font-semibold'>Forgot Password?</Link></p>
                    </div>
                    {error && <p style={{color:'red'}}>{error}</p>}
                </form>
              </div>
            </div> 
          </div>
        </div>
      </div>
    )
}

export default SignIn