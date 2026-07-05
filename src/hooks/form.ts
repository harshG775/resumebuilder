import { createFormHook } from "@tanstack/react-form"

import { fieldContext, formContext } from "./form-context"
import { SubscribeButton, Switch, TextArea, TextField } from "#/components/FormComponents"

export const { useAppForm, withForm } = createFormHook({
    fieldComponents: {
        TextField,
        TextArea,
        Switch,
    },
    formComponents: {
        SubscribeButton,
    },
    fieldContext,
    formContext,
})
