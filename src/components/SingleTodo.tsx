import "./styles.css";
import { Todo } from "./model";
import { MdDone } from "react-icons/md/index";
import { AiFillEdit, AiFillDelete } from "react-icons/ai/index";
import React, { useEffect, useRef, useState } from "react";
import { Actions } from "../App";
import { Draggable } from "react-beautiful-dnd";

interface props {
    todo: Todo;
    dispatchTodos: React.Dispatch<Actions>,
    index: number
}

const SingleTodo: React.FC<props> = ({ index, todo, dispatchTodos }) => {
    const [edit, setEdit] = useState<boolean>(false); //handle edit state
    const [editedTodo, setEditedTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    function handleDone(id: number): void {
        dispatchTodos({ type: "TOGGLE_DONE", payload: id })
    }

    function handleDelete(id: number): void {
        dispatchTodos({ type: "REMOVE", payload: id })
    }

    function todoUpdateHandler(e: React.FormEvent, id: number): void {
        e.preventDefault();
        if (!editedTodo) {
            return;
        }
        dispatchTodos({ type: "UPDATE", payload: { todo: editedTodo, id: id, isDone: todo.isDone } })
        setEdit(false);
    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index} >
            {
                (provided) => (
                    <form className="todos__single"
                        onSubmit={(e) => todoUpdateHandler(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {edit ?
                            (<input className="todos__single--text" value={editedTodo} onChange={(e) => setEditedTodo(e.target.value)} ref={inputRef} />)
                            :
                            (todo.isDone ? (
                                <s className="todos__single--text">{todo.todo}</s>
                            ) : (
                                <span className="todos__single--text">{todo.todo}</span>
                            ))
                        }
                        <div>
                            <span className="icon">
                                <AiFillEdit onClick={() => {
                                    if (!edit && !todo.isDone) {
                                        setEdit(true);
                                    }
                                }} />
                            </span>
                            <span className="icon">
                                <AiFillDelete onClick={() => handleDelete(todo.id)} />
                            </span>
                            <span className="icon" onClick={() => handleDone(todo.id)}>
                                <MdDone />
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default SingleTodo