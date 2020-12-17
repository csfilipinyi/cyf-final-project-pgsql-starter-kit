import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Login = ({onLogin}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")

  const onLogIn = ()=>{
    fetch("http://localhost:3002/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    })
    .then((res)=>res.json())
    .then((data)=>{
      onLogin(data)
    });
  }
  return (
    <div className="container">
      <header>
        <img
          className="App-logo"
          src="https://syllabus.codeyourfuture.io/img/logo.png"
          alt="cyf_logo"
        />
      </header>

      <div>
        <h1>
          <span className="font-weight-bold">Welcome!</span>
        </h1>

        <p className="first-line">
          This is an attendance register for CYF classes
        </p>
      </div>
      <div>
        <FormGroup>
          <div className="email">
            <label for="email">Email</label>
            <input
              type="email"
              placeholder="user name or email"
              value = {email}
              name="email"
              onChange= {event=>setEmail(event.target.value)}
              required
            ></input>
          </div>
          <div>
            <label for="password">Password</label>
            <input
              type="Password"
              placeholder="Password"
              value={password}
              name="password"
              onChange= {event=>setPassword(event.target.value)}
              required
            ></input>
          </div>
        </FormGroup>
        <button className="button" onClick={onLogIn}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
