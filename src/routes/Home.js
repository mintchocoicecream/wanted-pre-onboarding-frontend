import React, { useState } from "react";
import Auth from "../components/Auth";

function Home(){
    const [join, setJoin] = useState(false);
    const initialTargets={
        email: "",
        password: "",
    };

    const [data, setData] = useState({...initialTargets});

    const handleChange = ({target}) => {
        setData({
            ...data,
            [target.name]:target.value,
        });
    }

    const onSignup = () => {
        if(!join){
            setJoin(true)
        }
    }

    const offSignup = () => {
        if(join){
            setJoin(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            Auth(data.email, data.password);
        }catch(error){
            console.log(error);
        }
        
    }

    const handleSignup = (e) => {
        e.preventDefault();
    }

    return(
        <div className="home">
            <h1>Mintchoco<img src="https://user-images.githubusercontent.com/64584574/194312063-9b4a3275-bebc-49bb-8ef9-8b8f1222d9ea.png" alt="mintchocoicecream"/>Icecream</h1>
            <div className="homeLogin">
                <h1>로그인</h1>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <input className="authInput" name="email" type="email" value={data.email} placeholder="youremail@email.com" onChange={handleChange} required />
                    <input className="authInput" name="password" type="password" value={data.password} placeholder="password" minLength="8" onChange={handleChange}required />
                    <input className="authInput" type="submit" value="확인" />
                    <span onClick={onSignup}>회원가입</span>
                </form>
            </div>
            {join&&(
                <div className="homeLogin homeSignup">
                    <h1>회원 가입</h1>
                    <form className="loginForm" onSubmit={handleSignup}>
                        <input className="authInput" name="email" type="email" value={data.email} placeholder="youremail@email.com" onChange={handleChange} required />
                        <input className="authInput" name="password" type="password" value={data.password} placeholder="password" minLength="8" onChange={handleChange}required />
                        <input className="authInput" type="submit" value="가입" />
                    </form>
                    <span className="closedSignup" onClick={offSignup}>X</span>
                </div>
            )}
        </div>
    )
}

export default Home;