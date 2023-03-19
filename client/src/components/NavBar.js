import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const NavBar = () => {

    const { user } = useAuthContext()
    

    return <>
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container px-5">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/" className="nav-brand">Home</Link>
                    <ul className="navbar-nav mx-lg-5 mb-2 mb-lg-0">
                        {!user &&
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                            </>
                        }
                        {user &&
                            <>
                                <li className="nav-item">
                                    <Link to="/todos" className="nav-link">{user.username}'s To-Dos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/logout" className="nav-link mx-5">Logout</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default NavBar