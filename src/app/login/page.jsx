"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter()

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisable,setButtonDisable] = useState(false)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    if(user?.email.length > 0 && user.password.length > 0){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  },[user])

  const onLogin = async () => {
    try{
      setLoading(true)
      const response = await axios.post("/api/users/login",user)
      console.log(response,' the response in the client side and still waiting for the backend')
      toast.success("Login success")
      router.push("/profile")
    }catch(error){
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };

  return (
    <div
      className="flex flex-col items-center 
        justify-center min-h-screen py-2"
    >
      <h1>{loading? "prccessing" :"Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 rounded-md mb-4 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 rounded-md mb-4 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="p-2 border border-gray-300
       rounded-lg mb-4
      focus:outline-none
      focus:border-gray-600"
        onClick={onLogin}
      >
        {buttonDisable ? "No Login" : "Login here"}
      </button>
      <Link href="/signup">Visit SignUp page </Link>
    </div>
  );
}
