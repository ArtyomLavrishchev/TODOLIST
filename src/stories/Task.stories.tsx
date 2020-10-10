import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";

export default {
    title: 'Task Stories',
    component: Task,
}

const removeCallback = action('Remove Button inside Task clicked')
const changeStatusCallback = action('Status changed inside Task')
const changeTitleCallback = action('Title changed inside Task')

export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Task
                todolistID={"todolistID1"}
                changeStatus={changeStatusCallback}
                removeTask={removeCallback}
                changeTaskTitle={changeTitleCallback}
                task={{id: "1", isDone: true, title: "CSS"}}
            />

            <Task
                todolistID={"todolistID2"}
                changeStatus={changeStatusCallback}
                removeTask={removeCallback}
                changeTaskTitle={changeTitleCallback}
                task={{id: "2", isDone: false, title: "JS"}}
            />
        </div>
    )
};