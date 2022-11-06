import "./styles.css";
import { Todo } from "./model";
import { Actions } from "../App";
import SingleTodo from "./SingleTodo";
import { Droppable } from 'react-beautiful-dnd';

interface props {
    todos: Todo[];
    dispatchTodos: React.Dispatch<Actions>
}

const TodoList: React.FC<props> = ({ todos, dispatchTodos }) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Active Tasks</span>
                        {todos.map((todo, index) => {
                            return !todo.isDone && <SingleTodo index={index} key={todo.id} todo={todo} dispatchTodos={dispatchTodos} />
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Completed Tasks</span>
                        {todos.map((todo, index) => {
                            return todo.isDone && <SingleTodo index={index} key={todo.id} todo={todo} dispatchTodos={dispatchTodos} />
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>

    )
}

export default TodoList