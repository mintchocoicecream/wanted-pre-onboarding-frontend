import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faPenToSquare, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";

function TodoList({todo, todoId, todoComplete, axiosObj, storage}){
    const URL = axiosObj.URL;
    const content = todo;
    const todosId = todoId;
    const initialEdits = {
        todo: ""
    }

    const [editChange, setEditChange] = useState({...initialEdits});
    const [edit, setEdit] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [checked, setChecked] = useState(todoComplete);
    //updateTodo
    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    }

    const handleEditChange = ({target}) => {
        setEditChange({
            ...editChange,
            todo: target.value,
        });
    }

    const handleEditSubmit = () => {
        if(editChange.todo !== ""){
            axios.put(URL+`todos/${todosId}`, {
                todo: editChange.todo,
                isCompleted: todoComplete
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
        setDelModal(true);
    }

    const handleDelOK = () => {
        axios.delete(URL+`todos/${todosId}`, {
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
    const handleCheck = async() => {
        setChecked(!todoComplete);
        try{
            await axios.put(URL+`todos/${todosId}`, {
                todo: content,
                isCompleted: !todoComplete
            }, {
                headers: {
                    Authorization: `Bearer ${storage}`
                }
            })
        }catch{
        }
    }
    return(
        <>
            <li id={todosId}>
            {edit===false?(
                <>
                    {checked===false?(
                        <>
                            <FontAwesomeIcon className="checkIcon" icon={faSquareCheck} onClick={handleCheck}/>
                            <span className="todoLi">{content}</span>       
                        </>
                    ):(
                        <>
                            <FontAwesomeIcon className="checkIcon checkedIcon" icon={faSquareCheck} onClick={handleCheck}/>
                            <span className="todoLi checkedTodo">{content}</span>
                        </>
                    )}
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
                <div>
                    <p>"확인"을 누르면 삭제됩니다.</p>
                    <div className="delBtns">
                        <button onClick={handleDelOK}>확인</button>
                        <button onClick={handleDelCancel}>취소</button>
                    </div>
                </div>
            </div>
        )}  
        </>
    )
}

export default TodoList;