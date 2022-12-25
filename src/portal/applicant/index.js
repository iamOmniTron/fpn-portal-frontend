import { Outlet } from "react-router-dom"
import NavBar from "../components/nav"


export default function ApplicantIndex(){

    return(
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}