/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { redirectToSignIn } from "@clerk/clerk-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-50 to-blue-10  flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-xl text-center text-white"
      >
        <h1 className="text-4xl font-bold mb-4">AI Study Scheduler</h1>
        <p className="mb-6 text-lg">Plan smarter, stay motivated, and reach your goals with the power of AI.</p>

        <div className="flex justify-center gap-6">
  <button
    onClick={() => redirectToSignIn()}
    className="px-6 py-2 rounded-xl bg-white text-indigo-600 font-semibold shadow-md hover:scale-105 transition"
  >
    Login
  </button>
  <button
    onClick={() => navigate('/signup')}
    className="px-6 py-2 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-indigo-600 transition"
  >
    Sign Up
  </button>
</div>

      </motion.div>
    </div>
  );
};

export default Home;
*/
import React from 'react';
import { motion } from 'framer-motion';
import { SignIn } from "@clerk/clerk-react";

const Home = () => {
  const [showSignIn, setShowSignIn] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-50 to-blue-10 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-xl text-center text-white"
      >
        <h1 className="text-4xl font-bold mb-4">AI Study Scheduler</h1>
        <p className="mb-6 text-lg">
          Plan smarter, stay motivated, and reach your goals with the power of AI.
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => setShowSignIn(true)}
            className="px-6 py-2 rounded-xl bg-white text-indigo-600 font-semibold shadow-md hover:scale-105 transition"
          >
            Login
          </button>
          <button
            onClick={() => window.location.href = '/signup'}
            className="px-6 py-2 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-indigo-600 transition"
          >
            Sign Up
          </button>
        </div>
      </motion.div>

      {/* Clerk SignIn Modal */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <SignIn path="/login" routing="path" />
            <button
              className="mt-4 text-sm text-gray-500 hover:underline"
              onClick={() => setShowSignIn(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
