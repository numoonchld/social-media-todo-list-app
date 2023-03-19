import React, { useState } from 'react'

const ToDoItemLite = ({ todoItem }) => {
    const { text, author } = todoItem
    const [toDoText, setToDoText] = useState(text)
    return <>
        <div className="alert alert-light d-flex flex-column">
            <div className="d-flex flex-column justify-content-between" >
                {toDoText}
                <br />
                <span
                    className='fw-lighter fst-italic'
                >
                    user: {author}
                </span>
            </div>
        </div>
    </>
}

export default ToDoItemLite