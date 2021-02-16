import React, {useCallback} from 'react';
import {FilterValueType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    tasks: Array<TaskType>
    filter: FilterValueType
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
}

const Todolist = React.memo(function (props: PropsType) {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props])
    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props])
    const removeTodolistHandler = () => props.removeTodoList(props.id)
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }, [props])
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
                {tasksForTodolist.map(t => <Task
                        task={t}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        changeStatus={props.changeStatus}
                        todolistID={props.id}
                        key={t.id}
                    />
                )}
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
