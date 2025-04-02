"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/Util/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface formDataType {
  email: string;
  password: string;
}

interface formDataErrorsType {
  email?: string;
  password?: string;
}

export const LoginForm = () => {
  const { saveUser } = useUser();

  const [user, setUser] = useState<formDataType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<formDataErrorsType>({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [submitted, setSubmitted] = useState({
    message: "",
    status: "",
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
    const newErrors: formDataErrorsType = {};

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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      // Geting response from API
      const data = await response.json();

      // Handing Response
      if (response.ok) {
        setSubmitted({ message: data.message, status: "passed" });
        // Clear form after successful submission

        saveUser(data.user);

        setUser({ email: "", password: "" });
        setButtonDisabled(true); // Disable button again

        // Redirect to chat page
        router.replace("/chats");
      } else {
        setSubmitted({ message: data.error, status: "failed" });
      }
    }
  };
  // Disable button untill all fields are filled
  useEffect(() => {
    const allFieldsFilled = user.email.trim() && user.password.trim();
    setButtonDisabled(!allFieldsFilled);
  }, [user]); // Runs when user state changes
  return (
    <div>
      <div className="p-4">
        <h3 className="text-4xl font-bold text-secondary mb-4">Login</h3>
        {submitted.status == "passed" ? (
          <div className="text-success mb-3">{submitted.message}</div>
        ) : (
          <div className="text-error mb-3">{submitted.message}</div>
        )}
        <p className="text-md md:text-lg text-accent">
          Need an account?{" "}
          <Link
            href="/signup"
            className="text-blue-500 cursor-pointer underline font-semibold"
          >
            Create Account
          </Link>
          .
        </p>
      </div>
      <form className="p-4 space-y-4" onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
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
        <p className="text-md md:text-lg text-accent">
          <Link
            href="/signup"
            className="text-blue-500 cursor-pointer underline font-semibold"
          >
            Forgot Password?
          </Link>
        </p>
      </form>
    </div>
  );
};
