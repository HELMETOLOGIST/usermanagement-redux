import React from 'react'
import Login from './components/user_side/auth/Login'
import SignUp from './components/user_side/auth/SignUp'
import Navbar from './components/user_side/home/Navbar'
import Profile from './components/user_side/home/Profile'

const App = () => {
  return (
    <div>
      {/* <Login /> */}
      {/* <SignUp /> */}
      <Navbar />
      <Profile />
    </div>
  )
}

export default App