import React, {useState} from 'react';
import './App.module.css';
import Todolist from "./components/Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: true},
        {id: v1(), title: "rest API", isDone: true},
        {id: v1(), title: "graphQL", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValueType>("all")
    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    const changeFilter = (value: FilterValueType) => setFilter(value)
    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if(task) task.isDone = isDone
        setTasks([...tasks] )
    }
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }
    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodolist}
                changeFilter={changeFilter}
                removeTask={removeTask}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
