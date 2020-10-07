import {TasksStateType} from "../AppWithRedux"
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    id: string
    todolistId: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    id: string
    isDone: boolean
    todolistId: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    id: string
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodoListActionType | RemoveTodoListActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const todoListTasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = todoListTasks.filter(t => t.id !== action.id)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const task = {id: v1(), title: action.title, isDone: false}
            const todoListTasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = [task, ...todoListTasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const todoListTasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = todoListTasks.map(t => t.id === action.id ? {
                ...t,
                isDone: action.isDone
            } : t)
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const todoListTasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = todoListTasks.map(t => t.id === action.id ? {...t, title: action.title} : t)
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}
export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", id, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", id, isDone, todolistId}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", id, title, todolistId}
}