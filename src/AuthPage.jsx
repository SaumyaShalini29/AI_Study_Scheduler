// src/AuthPage.jsx
import { SignIn, SignUp } from "@clerk/clerk-react";

export const AuthPage = () => (
  <div className="flex flex-col items-center gap-10 p-10">
    <h2 className="text-2xl font-bold text-gray-800">Welcome to Smart Study Scheduler 🎓</h2>
    <div className="flex flex-col md:flex-row gap-6 justify-center">
      <SignIn path="/sign-in" routing="path" />
      <SignUp path="/sign-up" routing="path" />
    </div>
  </div>
);
