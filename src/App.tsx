import React, {useCallback, useEffect} from 'react';
import Todolist, {TaskType} from "./components/Todolist";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Container, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistAC,
    TodolistDomainType
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {todolistAPI} from "./api/todolist-api";

export type FilterValueType = "all" | "active" | "completed"
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeFilter = useCallback((value: FilterValueType, todoListId: string) => {
        const action = changeTodolistFilterAC(todoListId, value)
        dispatch(action)
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todoListId)
        dispatch(action)
    }, [dispatch])
    const removeTask = useCallback((id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId)
        dispatch(action)
    }, [dispatch])
    const removeTodoList = useCallback((id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todoListId)
        dispatch(action)
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, id: string) => {
        const action = changeTodolistTitleAC(id, title)
        dispatch(action)
    }, [dispatch])
    useEffect(() => {
        todolistAPI.getTodolist().then((res) => dispatch(setTodolistAC(res.data)))
    }, [])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let allTodoListTasks = tasks[tl.id]
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}} elevation={3}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodoListTasks}
                                        removeTodoList={removeTodoList}
                                        changeFilter={changeFilter}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;



// 7. 14
