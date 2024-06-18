import React from 'react'

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 rounded-xl blur-effect">
        <h2 className="mb-6 text-2xl font-semibold text-center text-white text-opacity-80">
          SignUp
        </h2>
        <form>
        <div className="mb-4">
            <label
              className="block mb-2 text-sm font-semibold text-white text-opacity-70"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              className="w-full px-4 py-3 leading-tight text-gray-700 glass-input focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-semibold text-white text-opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-3 leading-tight text-gray-700 glass-input focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-semibold text-white text-opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full px-4 py-3 mb-3 leading-tight text-gray-700 glass-input focus:outline-none focus:shadow-outline"
            />
            <div className="mb-6">
            <label
              className="block mb-2 text-sm font-semibold text-white text-opacity-70"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              required
              className="w-full px-4 py-3 mb-3 leading-tight text-gray-700 glass-input focus:outline-none focus:shadow-outline"
            />
          </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="glass-button font-bold bg-transparent rounded-full focus:outline-none focus:shadow-outline text-opacity-70 px-6 py-3"
            >
              Sign Up
            </button>
          </div>
          <p className="flex items-center justify-center mt-3 font-light">If you have an account 
            <a className="text-sky-600 ml-2" href="">SignIn</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp