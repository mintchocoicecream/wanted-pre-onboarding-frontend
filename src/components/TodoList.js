import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function TodoList({todo, todoId}){
    const content = todo;
    const todosId = todoId;
    //updateTodo
    //deleteTodo
    //checkTodo
    return(
        <li id={todosId}>
            <span className="todoLi">{content}</span>
            <span className="todoBtns">
                <span className="todoEdit">
                    <FontAwesomeIcon className="icon" icon={faPenToSquare}></FontAwesomeIcon>
                </span>
                <span className="todoDel">
                    <FontAwesomeIcon className="icon" icon={faTrashCan}></FontAwesomeIcon>
                </span>
            </span>
        </li>                
    )
}

export default TodoList;