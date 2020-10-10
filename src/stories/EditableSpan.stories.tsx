import React from 'react';
import {action} from "@storybook/addon-actions";
import EditableSpan from "../components/EditableSpan";

export default {
    title: 'EditableSpan Stories',
    component: EditableSpan,
}

const removeCallback = action('Remove Button inside Task clicked')
const changeStatusCallback = action('Status changed inside Task')
const changeTitleCallback = action('Title changed inside Task')

export const EditableSpanFormBaseExample = (props: any) => {
    return (
        <EditableSpan onChange={action('value changed')} title={'StartValue'}/>
    )
};