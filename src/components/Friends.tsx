import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const FRIENDS = gql`
  {
    getFriends {
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
  firstName: string
  lastName: string
  gender: string
  age: number
  language: string
  email: string
  contacts: object
}

interface FriendData {
  getFriends: Friend[];
}

const Friends = () => {
  const { loading, error, data } = useQuery<FriendData>(FRIENDS);

  if (loading) return <div className="loading"><p>Loading...</p></div>
  if (error) return <div className="error"><p>Error :({error})</p></div>

  return (
    <div className="friendsList">
    { data &&
        data.getFriends.map(({ firstName, lastName , gender, age, language, email, contacts }, index) => (
          <div id={index.toString()} key={index} className="friend">
            <div>First Name: {firstName}</div>
            <div>Last Name: {lastName}</div>
            <div>Gender: {gender}</div>
            <div>Age: {age}</div>
            <div>Language: {language}</div>
            <div>Email: {email}</div>
            <div>
              Contacts:
              <div>
                  {
                      contacts && contacts instanceof Array ? contacts.map(({firstName, lastName}, index) => (
                          <div key={index} className="contact">
                              <div>{firstName} {lastName}</div>
                          </div>
                      )) : null
                  }
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Friends