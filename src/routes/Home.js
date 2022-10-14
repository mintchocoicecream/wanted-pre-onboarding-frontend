import React, { useEffect, useState } from "react";
import axios from "axios";

function Home({url}){
    const URL = url;
    const LOGIN_KEY = "login_info";

    const [join, setJoin] = useState(false);
    const [errorM, setErrorM] = useState("");
    const initialTargets={
        email: "",
        password: "",
    };

    const savedInfos = localStorage.getItem(LOGIN_KEY);
    useEffect(()=>{
        if(savedInfos){
            document.location.href = `${process.env.PUBLIC_URL}/todos`;
        }
    })

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
        setData(initialTargets);
    }

    const offSignup = () => {
        if(join){
            setErrorM("");
            setJoin(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URL+"auth/signin", {
            email: data.email,
            password: data.password
        })
        .then((res) => {
            const accessToken = res.data.access_token;
            localStorage.setItem(LOGIN_KEY, accessToken);
            document.location.href = "/todos";
        })
        .catch((err) => {
            window.alert("아이디 또는 비밀번호를 확인해주세요.")
            setData(initialTargets);
        })
    }

    const handleSignup = async(e) => {
        e.preventDefault();
        axios.post(URL+"auth/signup", {
            email: data.email,
            password: data.password
        })
        .then((res) => {
            console.log(res.data);
            setErrorM("");
            setJoin(false);
        })
        .catch((err) => {
            console.log(err);
            setErrorM(err.response.data.message);
        })
        setData(initialTargets);
    }

    return(
        <>
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
                        <span>{errorM}</span>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home;