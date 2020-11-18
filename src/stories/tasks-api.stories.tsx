import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {tasksAPI} from "../api/tasks-api";


export default {
    title: 'TasksAPI'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '97bfbfd1-95ff-4be0-b986-272d0424dd99'
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '97bfbfd1-95ff-4be0-b986-272d0424dd99'
        tasksAPI.createTask(todolistId, '___--React--___')
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '97bfbfd1-95ff-4be0-b986-272d0424dd99'
        const taskId = 'c13e12dd-65f3-47cb-9354-fc7272ed7105'
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                    setState(res.data)
                }
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '97bfbfd1-95ff-4be0-b986-272d0424dd99'
        const taskId = '4c8dc67b-0a46-49e4-9265-7d82627c227c'
        tasksAPI.updateTask(todolistId, taskId,  "___*HTML*___")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
