import React, { useEffect } from "react"
import HomeScreen from "./Components/HomeScreen"
import './App.css'
import { BrowserRouter, Route,  Routes } from "react-router-dom"
import LoginScreen from "./Components/LoginScreen";

import { authentication } from "./firestore";
import {  useDispatch, useSelector } from "react-redux";
import ProfileScreen from "./Components/ProfileScreen";
import { login, logout } from "./Redux/Slice";

function App() {

  const dispatch  = useDispatch()
  const user = useSelector(state => state.user)
  console.log(user);
  useEffect(() => {
    const unSubscribe = authentication.onAuthStateChanged(userAuth => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))

      }else{
        dispatch(logout())
      }
    })

    return unSubscribe
  },[dispatch])


  return (
    
    <BrowserRouter>
     <div className="app">
      
      <Routes>
       {user ? (
        <Route path='/' element={<HomeScreen/>}/>
       ) : (
        <Route path='/' element={<LoginScreen/>}/>
       )}
       <Route path="/profile" element = {<ProfileScreen/>} />
       <Route path="/login" element = {<LoginScreen/>} />
      
      </Routes>
     
     </div>
     </BrowserRouter>
    
  )
}

export default App
