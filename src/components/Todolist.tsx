import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "../App";
import s from "../App.module.css"

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    addTask: (title: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    tasks: Array<TaskPropsType>
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValueType
}

function Todolist(props: PropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.id)
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
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodolistHandler = () => props.removeTodoList(props.id)
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>

            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className={s.error_message}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
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
