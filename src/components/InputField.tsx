import React, { useRef } from 'react';
import "./styles.css";

interface props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent<EventTarget>) => void
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <form
            className='input'
            onSubmit={(e) => {
                handleAdd(e)
                inputRef.current?.blur();
            }}
        >
            <input
                type="text"
                placeholder='Enter your task'
                className='input__box'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                ref={inputRef}
            />
            <button className='input_submit'>Go</button>
        </form>
    )
}

export default InputField