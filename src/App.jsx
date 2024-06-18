import React from 'react'
import Login from './components/user_side/auth/Login'
import SignUp from './components/user_side/auth/SignUp'
import Navbar from './components/user_side/home/Navbar'
import Profile from './components/user_side/home/Profile'
import Footer from './components/user_side/home/Footer'
import AdminHome from './components/admin_side/AdminHome'
import AddUserModal from './components/admin_side/AddUserModal'
import EditUserModal from './components/admin_side/EditUserModal'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Login /> */}
      {/* <SignUp /> */}
      <Profile />
      {/* <AdminHome /> */}
      {/* <AddUserModal /> */}
      {/* <EditUserModal />  */}
      <Footer />
    </div>
  )
}

export default App