import "./App.css";
import React, { useState } from "react";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Header from "./components/Header";


function App() {
  const [user,setUser] = useState()
  const logout = () => {
    setUser(null);
  }

  if(!user) {
      return <Login onLogin={setUser} />;
  }

   return (
    <> 
    <Header onLogout = {logout} user= {user} />
    {
      user && user.user_type == 3 && <Welcome />   }
    </>
  );
}

export default App;
