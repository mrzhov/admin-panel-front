import React from "react";
import Button from "../components/Button";

export const getTitlePage = (id, type) => (
    id && id !== 'new'
        ? <h3>Change {type} information</h3>
        : <h3>Create {type}</h3>
)

export const getFormActions = (id, history) => (
    <div className='form__actions'>
        <Button
            type='submit'
            variant='small'
        >
            {id && id === 'new' ? 'Create' : 'Save'}
        </Button>
        <Button
            type='button'
            variant='small'
            className='secondary'
            onClick={history.goBack}
        >
            Back
        </Button>
    </div>
)
