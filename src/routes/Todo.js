import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoList from "../components/TodoList";

function Todo({url}){
    const axioses = {
        URL : url,
        LOGIN_KEY : "login_info",
    }
    const savedInfos = localStorage.getItem(axioses.LOGIN_KEY);

    const initialTargets = {
        todo: ""
    }
    const [todos, setTodos] = useState({...initialTargets});
    const [todoArr, setTodoArr] = useState([]);
    const todosArr = [];
    //getTodos get
    useEffect(()=>{
        if(!savedInfos){
            document.location.href = `${process.env.PUBLIC_URL}/`;
        }
        axios.get(axioses.URL+"todos", {
            headers: {
                Authorization: `Bearer ${savedInfos}`
            }
        }).then((res)=>{
            const resArr = res.data;
            resArr.forEach(element => {
                todosArr.push(element);
            });
            setTodoArr(todosArr);
        }).catch((err)=>{
            console.log(err);
        })
    }, [axioses.URL, savedInfos, todosArr])

    const handleChange = ({target}) => {
        setTodos({
            ...todos,
            todo: target.value,
        });
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(todos.todo !== ""){
            axios.post(axioses.URL+"todos", {
                todo: todos.todo,
            }, {
                headers: {
                    Authorization: `Bearer ${savedInfos}`
                }
            })
            .then((res) => {
                // console.log(res.data);
                setTodos(initialTargets);
            })
            .catch((err) => {
                console.log(err);
            })
        }else{
            window.alert("빈 칸을 채워주세요.")
        }
    }

    const onLogout = () => {
        localStorage.removeItem(axioses.LOGIN_KEY);
        document.location.href = "/";
    }

    return(
        <div className="todo">
            <div className="todoTitle">
                <img src="https://user-images.githubusercontent.com/64584574/194312063-9b4a3275-bebc-49bb-8ef9-8b8f1222d9ea.png" alt="mintchocoicecream"/>
                <h1>To:Do</h1>
                <img src="https://user-images.githubusercontent.com/64584574/194312063-9b4a3275-bebc-49bb-8ef9-8b8f1222d9ea.png" alt="mintchocoicecream"/>
            </div>
            <div className="todoDiv">
                <div className="todoForm">
                    <input onChange={handleChange} placeholder="To Do..." maxLength="30" value={todos.todo}/>
                    <button onClick={handleClick}><FontAwesomeIcon icon={faSquarePlus} size="2x"/></button>
                </div>
                <div className="todoLists">
                    <h3>To:Do</h3>
                    <ul>
                        {todoArr.map((td) => (
                            <TodoList key={td.id} todo={td.todo} todoId={td.id} todoComplete={td.isCompleted} axiosObj={axioses} storage={savedInfos}/>
                        ))}
                    </ul>
                </div>
            </div>
            <Link className="logout" onClick={onLogout} to="/">Logout</Link>
        </div>
    )
}

export default Todo;