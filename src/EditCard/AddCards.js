import React from 'react'
import { useHistory } from 'react-router-dom'

export default function AddCards() {
    const history = useHistory();

    const handleClick = () => {
        history.push('/decks/:deckId/cards/new')
    }

    return (
    <div>
      <button className= "btn btn-primary mr-2" onClick={handleClick}>
        <span className='oi oi-plus'></span> Add Cards</button>
    </div>
  )
}
