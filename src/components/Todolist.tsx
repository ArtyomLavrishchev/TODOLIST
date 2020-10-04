import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "../App";
import s from "../App.module.css"

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    tasks: Array<TaskPropsType>
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
}

function Todolist(props: PropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className={s.error_message}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue)
                    }
                    return <li key={t.id} className={t.isDone ? s.is_done : ""}>
                        <input onChange={onChangeHandler} type={"checkbox"} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? s.active_filter : ""}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === "active" ? s.active_filter : ""}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === "completed" ? s.active_filter : ""}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;
