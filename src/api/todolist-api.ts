import axios from 'axios'
import {TodolistDomainType} from "../state/todolist-reducer";

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '3999e522-cb4e-4498-8ef3-a2f773a6c74f'
    }
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodolistDomainType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    },

}
