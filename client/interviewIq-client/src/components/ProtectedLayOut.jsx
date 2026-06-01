import { use } from "react"
import { Navigate,Outlet } from "react-router-dom"

function ProtectedLayOut(){

    function redirect(){
        const userCredentials = localStorage.getItem("user")
        console.log(userCredentials)

        if(userCredentials){
            return <Navigate to="/"/>
        }
    }

    redirect()
    return <div>
        <Outlet/>
    </div>
}

export default ProtectedLayOut