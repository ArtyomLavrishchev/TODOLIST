import React, {useState} from 'react';
import './App.module.css';
import Todolist, {TaskPropsType} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
type TasksStateType = {
    [key: string]: Array<TaskPropsType>
}

function App() {
    let todoListId1 = v1()
    let todoListId2 = v1()
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListId1,
            title: "What to learn",
            filter: "all"
        },
        {
            id: todoListId2,
            title: "What to buy",
            filter: "all"
        }
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "rest API", isDone: true},
            {id: v1(), title: "graphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "IPhone", isDone: false}
        ]
    })
    const changeFilter = (value: FilterValueType, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }
    const addTask = (title: string, todoListId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todoListTasks]
        setTasks({...tasks})
    }
    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === taskId)
        if (task) task.isDone = isDone
        setTasks({...tasks})
    }
    const removeTask = (id: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id != id)
        setTasks({...tasks})
    }
    const removeTodoList = (id: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let allTodoListTasks = tasks[tl.id]
                let tasksForTodolist = allTodoListTasks
                if (tl.filter === "active") {
                    tasksForTodolist = allTodoListTasks.filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodoListTasks.filter(t => t.isDone)
                }
                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
