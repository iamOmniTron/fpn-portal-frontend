import { Outlet } from "react-router-dom"
import NavBar from "./components/nav"

export default function ExaminerDashboard(){
    return(
        <>
            <div style={{backgroundColor:"lightgray",minHeight:"100vh"}}>
            <NavBar/>
            <Outlet/>
            </div>
        </>
    )
}