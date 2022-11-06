import './App.css';
import React, { useReducer, useState } from 'react';
import InputField from './components/InputField';
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';

export type Actions =
  { type: "ADD", payload: string } |
  { type: "REMOVE", payload: number } |
  { type: "TOGGLE_DONE", payload: number } |
  { type: "UPDATE", payload: Todo } |
  { type: "SWAP_INDEX", payload: { source: number, destination: number } }

const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case "ADD":
      return [...state, { todo: action.payload, id: Date.now(), isDone: false }]; //payload is todo here
    case "TOGGLE_DONE":
      return state.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo) //payload is ID here
    case "REMOVE":
      return state.filter(todo => todo.id !== action.payload); //payload is ID here
    case "UPDATE": //payload is Todo here
      return state
        .map(todo => (todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo))
    case "SWAP_INDEX":
      let temp = state[action.payload.source];
      state[action.payload.source] = state[action.payload.destination];
      state[action.payload.destination] = temp;
      return state;
    default:
      return state;
  };

}

const App: React.FC = () => {
  const [todos, dispatchTodos] = useReducer(TodoReducer, []);

  const [todo, setTodo] = useState<string>("");

  const handlerAdd = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (todo) {
      dispatchTodos({ type: "ADD", payload: todo });
      setTodo("");
    }
  }

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const id = result.draggableId;
    if (result.destination === null) {
      return;
    }
    if (result.destination?.droppableId !== result.source.droppableId) {
      dispatchTodos({ type: "TOGGLE_DONE", payload: parseInt(id) });
    } else {
      dispatchTodos({ type: "SWAP_INDEX", payload: { source: result.source.index, destination: result.destination.index } })
      return;
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handlerAdd} />
        <TodoList todos={todos} dispatchTodos={dispatchTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;
