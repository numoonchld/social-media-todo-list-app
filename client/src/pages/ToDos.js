import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import ToDoItem from '../components/ToDoItem';

const ToDos = () => {

    const navigate = useNavigate()

    const [token, setToken] = useState(localStorage.getItem('token'))
    const { user } = useAuthContext()

    const [todoText, setTodoText] = useState('')

    const [allUserToDos, setAllUserToDos] = useState([])

    const getAllUserToDos = async () => {

        const response = await fetch('http://localhost:3000/todos', {
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'GET',
        })

        const responseJSON = await response.json()

        if (responseJSON.status === 'ok') {
            setAllUserToDos(responseJSON.allUserToDos)
        }

    }


    useEffect(() => {
        const decodedToken = decodeToken(token)
        if (user.email !== decodedToken.email) {
            navigate('/logout')
        }
        else {
            getAllUserToDos()
        }

    }, [token])

    const handleAddTodo = async (event) => {
        event.preventDefault()

        const response = await fetch('http://localhost:3000/todos', {
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify({
                todoText
            })
        })

        const responseJSON = await response.json()

        if (responseJSON.status === 'ok') {

            setAllUserToDos([...allUserToDos, responseJSON.todo])
        }



    }

    return <>
        <section
            className='card p-5 w-75 my-5'
        >
            <h5 className='card-title'>Create new To-Do</h5>
            <hr />
            <form onSubmit={handleAddTodo}>
                <div className='input-group'>
                    <input
                        type="text"
                        className='form-control'
                        value={todoText}
                        onChange={e => setTodoText(e.target.value)}
                        aria-label="add todo"
                        aria-describedby="button-add-todo"
                    />
                    <button
                        className="btn btn-outline-success"
                        type="submit"
                        id="button-add-todo"
                    >
                        Add
                    </button>
                </div>
            </form>

        </section>

        <section
            className='card p-5 w-75 bg-dark text-light'
        >
            <h5 className='card-title'>Your To-Dos</h5>
            <hr />
            {allUserToDos.map(todoItem => <ToDoItem key={todoItem._id} todoItem={todoItem} />)}
        </section>
    </>
}

export default ToDos