import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {

  const[userCredentials,setUserCredentials] = useState({email : "", password : ""})
const navigate = useNavigate()
  function handleChange(e){
    const{name,value} = e.target

    const newCredentials = {...userCredentials}
    newCredentials[name] = value

    setUserCredentials(newCredentials)
  }

 async function login(e){
  e.preventDefault()
  try{
    const data = await axios.post(`http://localhost:4000/auth/login`,userCredentials)

    localStorage.setItem("token",data.data.token)
    navigate("/")
  }catch(err){
    console.log(err, err.message)
    toast.error(err?.response?.data?.message)
  }
  }
  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type='email' name='email' id='email'/>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type='password' name='password' id='password'/>
        </div>

        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login