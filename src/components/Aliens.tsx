import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ALIENS = gql`
  {
    getAliens{
      id
      firstName
      lastName
      planet
    }
  }
`

interface Alien {
  firstName: string
  lastName: string
  planet: string
}

interface AlienData {
  getAliens: Alien[];
}

const Aliens = () => {
  const { loading, error, data } = useQuery<AlienData>(ALIENS);

  if (loading) return <div className="loading"><p>Loading...</p></div>
  if (error) return <div className="error"><p>Error :({error})</p></div>

  return (
    <div className="alienList">
    { data &&
        data.getAliens.map(({ firstName, lastName , planet }, index) => (
          <div id={index.toString()} key={index} className="alien">
            <div>First Name: {firstName}</div>
            <div>Last Name: {lastName}</div>
            <div>Planet: {planet}</div>
          </div>
        ))
      }
    </div>
  )
}

export default Aliens