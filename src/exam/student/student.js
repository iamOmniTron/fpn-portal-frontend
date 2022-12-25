import { Outlet } from "react-router-dom"
import NavBar from "./components/nav"

export default function ExamStudentDashboard(){
    return(
        <>
            <div style={{minHeight:"100vh",backgroundColor:"lightGray"}}>
                <NavBar/>
                <Outlet/>
            </div>
        </>
    )
}