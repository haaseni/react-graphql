import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const FRIEND = gql`
  query getFriend($userId: ID!) {
    getOneFriend(id: $userId) {
        id
        firstName
        lastName
        gender
        age
        language
        email
        contacts {
            firstName
            lastName
        }
    }
  }
`

interface Friend {
    firstName: number
    lastName: string
    gender: string
    age: number
    language: string
    email: string
    contacts: object
}

interface FriendData {
    getOneFriend: Friend;
}

interface FriendVars {
    userId: string;
}

const Friend = () => {
    const [userId, setUserId] = useState('')
    const [getFriend, { loading, error, data }] = useLazyQuery<FriendData, FriendVars>(
        FRIEND, 
        { variables: { userId: userId } }
    )

    const handleUserIdChange = (e: any) => {
        setUserId(e.target.value)
    }

    const handleButtonClick = () => {
        getFriend({ variables: { userId: userId } })
    }

    if (loading) return ( <p>Loading...</p> )
    if (error) return ( <p>Error :({error})</p> )

    return (
        <div className="friend">
            <div className="userId">
                <input 
                    type="text"
                    value={userId}
                    onChange={e => handleUserIdChange(e)}
                    placeholder="User ID" />
                <button onClick={handleButtonClick}>
                Find User
                </button>
            </div>
            { data && 
                <div>
                    <div>First Name: {data.getOneFriend.firstName}</div>
                    <div>Last Name: {data.getOneFriend.lastName}</div>
                    <div>Gender: {data.getOneFriend.gender}</div>
                    <div>Age: {data.getOneFriend.age}</div>
                    <div>Language: {data.getOneFriend.language}</div>
                    <div>Email: {data.getOneFriend.email}</div>
                    <div>
                        Contacts:
                        <div>
                            {
                                (data.getOneFriend.contacts && data.getOneFriend.contacts instanceof Array) ? data.getOneFriend.contacts.map(({firstName, lastName}, index) => (
                                    <div key={index} className="contact">
                                        <div>{firstName} {lastName}</div>
                                    </div>
                                )) : null
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Friend