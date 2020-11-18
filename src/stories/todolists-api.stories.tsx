import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";


export default {
    title: 'TodolistsAPI'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('___--_REST_--___')
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f8dfa166-cb26-4770-ad9f-da05c23a9f32'
        todolistAPI.deleteTodolist(todolistId)
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
        const todolistId = 'c38c995a-c7af-483b-bfb4-ab14b4456994'
        todolistAPI.updateTodolist(todolistId, "___*HTML*___")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
