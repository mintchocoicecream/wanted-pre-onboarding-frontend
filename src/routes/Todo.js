import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoList from "../components/TodoList";

function Todo({url}){
    const URL = url;
    const LOGIN_KEY = "login_info";
    const savedInfos = localStorage.getItem(LOGIN_KEY);

    const initialTargets = {
        todo: ""
    }
    const [todos, setTodos] = useState({...initialTargets});
    const [todoArr, setTodoArr] = useState([]);
    const todosArr = [];
    //getTodos get
    useEffect(()=>{
        if(!savedInfos){
            document.location.href = "/";
        }
        axios.get(URL+"todos", {
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
    }, [URL, savedInfos, todosArr])

    const handleChange = ({target}) => {
        setTodos({
            ...todos,
            todo: target.value,
        });
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(todos.todo !== ""){
            //createTodo Post
            axios.post(URL+"todos", {
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
        localStorage.removeItem(LOGIN_KEY);
        document.location.href = "/";
    }

    return(
        <div className="todo">
            <h1>TODO</h1>
            <div className="todoForm">
                <input onChange={handleChange} placeholder="To Do..." maxLength="30" value={todos.todo}/>
                <button onClick={handleClick}>입력</button>
            </div>
            <div className="todoLists">
                <ul>
                    {todoArr.map((td) => (
                        <TodoList key={td.id} todo={td.todo} todoId={td.id}/>
                    ))}
                </ul>
            </div>
            <Link className="logout" onClick={onLogout} to="/">Logout</Link>
        </div>
    )
}

export default Todo;