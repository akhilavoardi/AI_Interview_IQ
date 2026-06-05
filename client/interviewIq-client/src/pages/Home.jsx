import React,{useEffect, useRef, useState} from 'react'
import {toast} from 'react-toastify'
import { api } from '../apis/interceptors'
function Home() {

  const aiContentContainer = useRef()
  const aiResponse = "HTML is the fundamental building block of the web. It's a simple yet powerful markup language that allows you to structure content, connect documents, and lay the foundation for any interactive and visually appealing web experience."

const[userText,setUserText] = useState("")

async function callAi(e){
  e.preventDefault()

  if(!userText){
    toast("Add Prompt to AI",{theme : "dark"})
  }
try{
  const response = await api.post("/interview/liveInterview",{prompt : userText})
  console.log(response,response?.data?.data,'ai response')

  aiContentContainer.current.innerText = response.data.data
}catch(err){
  console.log(err,"err while calling the api")

  toast.error(err.message)
}

console.log(userText)
}
  // useEffect(()=>{
  //   aiContentContainer.current.innerText = aiResponse
  // })
  return (
   <div className='h:[900px]'>
    <form className='flex justify-center gap-4 mt-4' onSubmit={callAi}>
      <textarea type="text" className='w-80 border shadow-2xl' placeholder= 'Ask AI' onChange={(e)=>setUserText(e.target.value)}/>
        <input type="submit" value="Submit" disabled={!userText.length ? true : false} className={`${!userText.length ? "bg-blue-200" : "bg-blue-400 cursor-pointer"} rounded text-white p-2`} />
    </form>
    <div ref={aiContentContainer}>

    </div>
   </div>
  )
}

export default Home