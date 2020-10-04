import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addItem()
        }
    }
    return (
        <div>
            <TextField
                variant={"outlined"}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={"Title"}
                helperText={error}
            />
            <IconButton
                color={"primary"}
                onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    );
}

export default AddItemForm;