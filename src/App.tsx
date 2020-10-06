import React, {useState} from 'react';
import Todolist, {TaskPropsType} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValueType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
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
    const addTodoList = (title: string) => {
        let newTodoListId = v1()
        let newTodoList: TodoListType = {id: newTodoListId, title: title, filter: "all"}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
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
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === taskId)
        if (task) task.title = newTitle
        setTasks({...tasks})
    }
    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={3}>
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
                            <Grid item>
                                <Paper style={{padding: "10px"}} elevation={3}>
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
