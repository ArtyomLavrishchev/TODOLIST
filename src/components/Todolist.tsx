import React, {ChangeEvent, useCallback} from 'react';
import {FilterValueType} from "../AppWithRedux";
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

const Todolist = React.memo(function (props: PropsType) {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])
    const removeTodolistHandler = () => props.removeTodoList(props.id)
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }, [props.changeTodoListTitle, props.id])
    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodolistHandler}><Delete/></IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <div>
                {tasksForTodolist.map(t => {
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
})

export default Todolist;
