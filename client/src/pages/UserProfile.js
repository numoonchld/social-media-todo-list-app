import React from 'react'
import { useParams } from 'react-router-dom';

const UserProfile = () => {

    const { userID } = useParams()

    console.log({ userID })

    return <>
    </>
}

export default UserProfile