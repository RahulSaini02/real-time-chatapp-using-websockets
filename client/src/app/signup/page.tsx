"use client";

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";

import { Input } from '@/components/Util/Input';
import { userRegisterFormData, userRegisterFormDataErrors } from '@/types';

export default function SignIn() {
  // const router = useRouter();
    const [user, setUser] = useState<userRegisterFormData>({
      name: "",
      email: "",
      password: ""
    })
    const [errors, setErrors] = useState<userRegisterFormDataErrors>({});
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [submitted, setSubmitted] = useState({
      message: "",
      status: false
    });
    const router = useRouter(); 
  
    // Generic handler for all inputs
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    // Clear errors when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    };

    // Validate form fields
    const validateForm = (): boolean => {
      const newErrors: userRegisterFormDataErrors = {};

      if (!user.name.trim()) newErrors.name = "Full name is required.";
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


  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      setSubmitted({message: data.message, status: true});

      if (response.ok) {
        // Clear form after successful submission
        setUser({ name: "", email: "", password: "" });
        setButtonDisabled(true); // Disable button again

        setTimeout(() => {
          router.replace("/")
        }, 3000)
        
      }
    };
  }

  // Disable button untill all fields are filled
 useEffect(() => {
    const allFieldsFilled = user.name.trim() && user.email.trim() && user.password.trim();
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
            {/* Register Form */}
              <div>
                <div className='p-4'>
                  <h3 className='text-4xl font-bold text-secondary mb-4'>Register</h3>
                  {submitted.status && <div className="text-green-600 mb-3">{submitted.message} Redirecting you to Sign In Page... in 3 seconds</div>}
                  <p className='text-md md:text-lg text-accent'>Already have an account? <Link href="/" className='text-blue-500 cursor-pointer underline font-semibold'>Sign In</Link> to login.</p>
                </div>

                <form className="p-4 space-y-4" onSubmit={handleSubmit} noValidate>
                  <Input label="Full Name" type="text" name="name" value={user.name} onChange={handleChange} error={errors.name}  />
                  <Input label="Email" type="email" name="email" value={user.email} onChange={handleChange} error={errors.email} />
                  <Input label="Password" type="password" name="password" value={user.password} onChange={handleChange} error={errors.password} />
                  <button disabled={buttonDisabled} className={`${buttonDisabled ? "bg-muted cursor-not-allowed" : "bg-primary cursor-pointer"  } text-white px-4 py-2 rounded`} type='submit'>
                    Submit
                  </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    )
}