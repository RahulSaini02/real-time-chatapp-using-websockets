"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userRegisterFormData, userRegisterFormDataErrors } from "@/types";
import { Input } from "@/components/Util/Input";
import Link from "next/link";

export const RegisterForm = () => {
  const [user, setUser] = useState<userRegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<userRegisterFormDataErrors>({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [submitted, setSubmitted] = useState({
    message: "",
    status: "",
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted({ message: data.message, status: "passed" });
        // Clear form after successful submission
        setUser({ name: "", email: "", password: "" });
        setButtonDisabled(true); // Disable button again

        setTimeout(() => {
          router.replace("/");
        }, 3000);
      } else {
        setSubmitted({ message: data.error, status: "failed" });
      }
    }
  };

  useEffect(() => {
    const allFieldsFilled =
      user.name.trim() && user.email.trim() && user.password.trim();
    setButtonDisabled(!allFieldsFilled);
  }, [user]); // Runs when user state changes

  return (
    <div>
      <div className="p-4">
        <h3 className="text-4xl font-bold text-secondary mb-4">Register</h3>
        {submitted.status == "passed" ? (
          <div className="text-success mb-3">
            {submitted.message} Redirecting you to Sign In Page... in 3 seconds
          </div>
        ) : (
          <div className="text-error mb-3">{submitted.message}</div>
        )}
        <p className="text-md md:text-lg text-accent">
          Already have an account?{" "}
          <Link
            href="/"
            className="text-blue-500 cursor-pointer underline font-semibold"
          >
            Sign In
          </Link>{" "}
          to login.
        </p>
      </div>

      <form className="p-4 space-y-4" onSubmit={handleSubmit} noValidate>
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button
          disabled={buttonDisabled}
          className={`${buttonDisabled ? "bg-muted cursor-not-allowed" : "bg-primary cursor-pointer"} text-white px-4 py-2 rounded`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
