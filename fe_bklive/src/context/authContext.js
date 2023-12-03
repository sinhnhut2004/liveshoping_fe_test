import axios from "axios";
import { createContext, useEffect, useState } from "react";
import makeRequest from "../utils/axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(
  //   null || JSON.parse(localStorage.getItem("user"))
  // );
  const [currentUser, setCurrentUser] = useState(null);
  //setCurrentUser({});
  const login = async (inputs) => {
    // const res = await fetch("http://localhost:8080/api/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify(inputs),
    //   //body: inputs,
    //   headers: { "Content-Type": "application/json" },
    // });
    
    // const data = await res.json();
    //const res = makeRequest.get('./product');
    // const res = await axios.post("http://localhost:8000/api/auth/login", inputs, {
    //   withCredentials: true
    // })
    const res = await makeRequest.post('./auth/login', inputs);

    // // console.log(data);
    console.log(res.data);
    setCurrentUser(res.data);
    
  };
  //console.log(currentUser);
  // //console.log(currentUser);
  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  // }, [currentUser]);

  //console.log(currentUser);
  return (
    <AuthContext.Provider value={{ currentUser, login, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
