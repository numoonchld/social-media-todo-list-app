import React, { useState } from "react";

const ToDoItem = ({ todoItem }) => {
    console.log({ todoItem })

    const { text, done, _id: id } = todoItem

    const [isDone, setIsDone] = useState(done)

    const [isBusyWithDoneToggle, setIsBusyWithDoneToggle] = useState(false)

    const handleCheckbox = async () => {
        setIsBusyWithDoneToggle(true)


        const response = await fetch(`http://localhost:3000/todos/toggle-done/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'POST',
        })

        const responseJSON = await response.json()

        if (responseJSON.status === 'ok') {
            setIsDone(responseJSON.newTodoDone)
        }

        setIsBusyWithDoneToggle(false)
    }

    return <>
        <div class="alert alert-light d-flex flex-row justify-content-between" >
            {text}
            <span>
                <input
                    type='checkbox'
                    checked={isDone}
                    disabled={isBusyWithDoneToggle}
                    onChange={handleCheckbox}
                />
            </span>
        </div>
    </>
}

export default ToDoItem