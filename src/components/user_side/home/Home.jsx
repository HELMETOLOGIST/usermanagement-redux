import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const userName = useSelector((state) => state.user.user?.username);
  const navigate = useNavigate()


  useEffect(() => {
    if(isAuthenticated){
        navigate("/home")
    }else{
        navigate("/")
    }
},[isAuthenticated])

  return (
    <div className="flex items-center justify-center h-screen">
      {isAuthenticated ? (
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-500 to-red-500">
          Hello, {userName.toUpperCase()}
        </h1>
      ) : (
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-500 to-red-500">
          Hello, Guest
        </h1>
      )}
    </div>
  );
};

export default Home;
