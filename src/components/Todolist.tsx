import React, {ChangeEvent} from 'react';
import {FilterValueType} from "../App";
import s from "../App.module.css"
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
}

function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodolistHandler = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodolistHandler}><Delete/></IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                    }
                    return <div key={t.id} className={t.isDone ? s.is_done : ""}>
                        <Checkbox
                            color={"primary"}
                            onChange={onChangeStatusHandler}
                            checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}><Delete/></IconButton>
                    </div>
                })}
            </div>
            <div>
                <Button
                    variant={props.filter === "all" ? "outlined" : "text"}
                    color={"primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={props.filter === "active" ? "outlined" : "text"}
                    color={"primary"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={props.filter === "completed" ? "outlined" : "text"}
                    color={"primary"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
}

export default Todolist;
