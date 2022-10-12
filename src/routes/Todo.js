import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Todo(){
    const LOGIN_KEY = "login_info"
    const savedInfos = localStorage.getItem(LOGIN_KEY);
    useEffect(()=>{
        if(!savedInfos){
            document.location.href = "/";
        }
    })

    const onLogout = () => {
        localStorage.removeItem(LOGIN_KEY);
        document.location.href = "/";
    }

    return(
        <div>
            <h1>TODO</h1>
            <Link onClick={onLogout} to="/">Logout</Link>
        </div>
    )
}

export default Todo;