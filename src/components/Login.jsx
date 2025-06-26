// src/components/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // TODO: Integrate with backend login API
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <div className="mb-2">
        <label htmlFor=''>Email:</label>
        <input
          {...register('email', { required: 'Email is required' })}
          className="border p-1 w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="mb-2">
        <label htmlFor=''>Password:</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="border p-1 w-full"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
};

export default Login;
