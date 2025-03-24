"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/Util/Input';
import Link from 'next/link';
import { userLoginFormData, userLoginFormDataErrors } from '@/types';
import { useRouter } from "next/navigation";

const SignIn = () => {  
  const[user, setUser] = useState<userLoginFormData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<userLoginFormDataErrors>({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [submitted, setSubmitted] = useState({
    message: "",
    status: ""
  });
  const router = useRouter(); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: userLoginFormDataErrors = {};

    if (!user.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!user.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
    
  //Handling form submition and API request

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (validateForm()) {
    // Sending form data to login API route
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    // Geting response from API    
    const data = await response.json();
    
    // Handing Response
    if (response.ok) {
      setSubmitted({message: data.message, status: "passed"});
      // Clear form after successful submission
      setUser({ email: "", password: "" });
      setButtonDisabled(true); // Disable button again
      
      // Redirect to chat page
      router.replace("/chat");
      
    } else {
      setSubmitted({message: data.error, status: "failed"});
    }
  };
};
  // Disable button untill all fields are filled
  useEffect(() => {
    const allFieldsFilled = user.email.trim() && user.password.trim();
    setButtonDisabled(!allFieldsFilled);
  }, [user]); // Runs when user state changes


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
          {/* Login Form */}
          <div>
            <div className='p-4'>
              <h3 className='text-4xl font-bold text-secondary mb-4'>Login</h3>
              { submitted.status == "passed" ?
                (
                  <div className="text-success mb-3">{submitted.message}</div>
                ) : (
                  <div className="text-error mb-3">{submitted.message}</div>
                )
              }
              <p className='text-md md:text-lg text-accent'>Need an account? <Link href="/signup" className='text-blue-500 cursor-pointer underline font-semibold'>Create Account</Link>.</p>
            </div>
              <form className="p-4 space-y-4" onSubmit={handleSubmit} noValidate>
                  <Input
                    label='Email' 
                    name='email'
                    type='email' 
                    value={user.email} 
                    onChange={handleChange} error={errors.email}
                  />
                  <Input
                    label='Password' 
                    name='password'
                    type='password' 
                    value={user.password} 
                    onChange={handleChange} error={errors.password}
                  />
                  <button 
                    disabled={buttonDisabled} 
                    className={`${buttonDisabled ? "bg-muted cursor-not-allowed" : "bg-primary cursor-pointer"  } text-white px-4 py-2 rounded`} type='submit'>
                    Submit
                  </button>
                  <p className='text-md md:text-lg text-accent'><Link href="/signup" className='text-blue-500 cursor-pointer underline font-semibold'>Forgot Password?</Link></p>
              </form>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default SignIn