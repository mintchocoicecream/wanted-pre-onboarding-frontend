import { faCheck, faPenToSquare, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";

function TodoList({todo, todoId, axiosObj, storage}){
    const URL = axiosObj.URL;
    const content = todo;
    const todosId = todoId;
    const initialEdits = {
        todo: ""
    }

    const [editChange, setEditChange] = useState({...initialEdits});
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState("");
    const [delModal, setDelModal] = useState(false);
    //updateTodo
    const handleEdit = (e) => {
        e.preventDefault();
        const parentNode = e.currentTarget.parentNode;
        setEdit(true);
        setEditId(parentNode.parentNode.id);
    }

    const handleEditChange = ({target}) => {
        setEditChange({
            ...editChange,
            todo: target.value,
        });
    }

    const handleEditSubmit = () => {
        if(editChange.todo !== ""){
            axios.put(URL+`todos/${editId}`, {
                todo: editChange.todo,
                isCompleted: true
            }, {
                headers: {
                    Authorization: `Bearer ${storage}`
                }
            }).then((res) => {
                // console.log(res)
                setEdit(false);
            }).catch((err) => {
                console.log(err)
            })
        }else{
            window.alert("빈 칸을 채워주세요.")
        }
        setEditChange(initialEdits);
    }

    const handleEditCancel = () => {
        setEdit(false);
    }
    //deleteTodo
    const handleDel = (e) => {
        e.preventDefault();
        const parentNode = e.currentTarget.parentNode.parentNode;
        setEditId(parentNode.parentNode.id);
        setDelModal(true);
    }

    const handleDelOK = () => {
        axios.delete(URL+`todos/${editId}`, {
            headers: {
                Authorization: `Bearer ${storage}`
            }
        }).catch((error) => {
                console.log(error);
            })
            setDelModal(false);
    }

    const handleDelCancel = () => {
        setDelModal(false);
    }
    //checkTodo
    return(
        <>
            <li id={todosId}>
            {edit===false?(
                <>
                    <span className="todoLi">{content}</span>
                    <span className="todoBtns">
                        <span className="todoEdit" onClick={handleEdit}>
                            <FontAwesomeIcon className="icon" icon={faPenToSquare}></FontAwesomeIcon>
                        </span>
                        <span className="todoDel">
                            <FontAwesomeIcon className="icon" icon={faTrashCan} onClick={handleDel}></FontAwesomeIcon>
                        </span>
                    </span>
                </>
            ):(
                <>
                    <input className="todoLi todoEditContent" placeholder={content} value={editChange.todo} onChange={handleEditChange}/>
                    <span className="todoBtns">
                        <span className="todoEditSubmit">
                            <FontAwesomeIcon className="icon" icon={faCheck} onClick={handleEditSubmit}></FontAwesomeIcon>
                        </span>
                        <span className="todoEditCancel">
                            <FontAwesomeIcon className="icon" icon={faXmark} onClick={handleEditCancel}></FontAwesomeIcon>
                        </span>
                    </span>
                </>
            )}
        </li>   
        {delModal === true &&(
            <div className="delModal">
                <button onClick={handleDelOK}>Ok</button>
                <button onClick={handleDelCancel}>Cancel</button>
            </div>
        )}  
        </>
    )
}

export default TodoList;