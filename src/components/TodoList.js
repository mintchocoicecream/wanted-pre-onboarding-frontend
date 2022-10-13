import React from "react";

function TodoList({todo, todoId}){
    const content = todo;
    const todosId = todoId;
    //updateTodo
    //deleteTodo
    return(
        <li id={todosId}>
            <span>{content}</span>
            <span>
                <span>edit</span>
                <span>❌</span>
            </span>
        </li>                
    )
}

export default TodoList;