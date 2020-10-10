import React, {useReducer} from 'react';
import Todolist, {TaskType} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValueType = "all" | "active" | "completed"
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValueType
// }
// export type TasksStateType = {
//     [key: string]: Array<TaskPropsType>
// }

function AppWithReducers() {
    let todoListId1 = v1()
    let todoListId2 = v1()
    let [todoLists, dispatchToTodolist] = useReducer(todolistReducer, [
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
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
    });
    const changeFilter = (value: FilterValueType, todoListId: string) => {
        const action = changeTodolistFilterAC(todoListId, value)
        dispatchToTodolist(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }
    const addTask = (title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId)
        dispatchToTasks(action)
    }
    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todoListId)
        dispatchToTasks(action)
    }
    const removeTask = (id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId)
        dispatchToTasks(action)
    }
    const removeTodoList = (id: string) => {
        const action = removeTodolistAC(id)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todoListId)
        dispatchToTasks(action)
    }
    const changeTodoListTitle = (title: string, id: string) => {
        const action = changeTodolistTitleAC(id, title)
        dispatchToTodolist(action)
    }

//     return (
//         <div>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: "20px"}}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//
//                 <Grid container spacing={3}>
//                     {todoLists.map(tl => {
//                         let allTodoListTasks = tasks[tl.id]
//                         let tasksForTodolist = allTodoListTasks
//                         if (tl.filter === "active") {
//                             tasksForTodolist = allTodoListTasks.filter(t => !t.isDone)
//                         }
//                         if (tl.filter === "completed") {
//                             tasksForTodolist = allTodoListTasks.filter(t => t.isDone)
//                         }
//                         return (
//                             <Grid item>
//                                 <Paper style={{padding: "10px"}} elevation={3}>
//                                     <Todolist
//                                         key={tl.id}
//                                         id={tl.id}
//                                         title={tl.title}
//                                         tasks={tasksForTodolist}
//                                         removeTodoList={removeTodoList}
//                                         changeFilter={changeFilter}
//                                         removeTask={removeTask}
//                                         addTask={addTask}
//                                         changeStatus={changeStatus}
//                                         filter={tl.filter}
//                                         changeTaskTitle={changeTaskTitle}
//                                         changeTodoListTitle={changeTodoListTitle}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         )
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     );
}

export default AppWithReducers;
