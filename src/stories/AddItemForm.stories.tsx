import React from 'react';
import AddItemForm from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Add item form Stories',
    component: AddItemForm,
}

export const AddItemFormBaseExample = (props: any) => {
    return (
        <AddItemForm addItem={action('Button inside from clicked')}/>
    )
};