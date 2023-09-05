"use client";
import React, { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "admin@admin.com",
    username: "Admin",
    password: "password123",
    passwordConfirm: "password123",
  });

  const handleChange = (e) => {
    const { username, value } = e.target;
    setFormData({
      ...formData,
      [username]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration was successful
        // You can redirect or display a success message here
        console.log("Registration successful");
      } else {
        // Handle registration error
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Confirm Password:</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
}

export default RegistrationForm;
