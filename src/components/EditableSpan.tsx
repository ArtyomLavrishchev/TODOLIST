import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

function EditableSpan(props: EditableSpanType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode ?
            <TextField variant={"outlined"} onBlur={activateViewMode} value={title} autoFocus
                       onChange={onChangeTitleHandler}/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
}

export default EditableSpan;
