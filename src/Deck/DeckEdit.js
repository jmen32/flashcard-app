import React from 'react'
import {useHistory, useParams} from 'react-router-dom'

export default function DeckStudy() {
const history = useHistory();
const {deckId} = useParams();

  return (
    <div>
      <button className= "btn btn-dark mr-2">
        <span className='oi oi-pencil' onClick={() => history.push(`/decks/${deckId}/edit`)}></span> Edit</button>
    </div>
  )
}

