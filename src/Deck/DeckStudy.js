import React from 'react'
import {useHistory, useParams} from 'react-router-dom'

export default function DeckStudy({deck}) {
const history = useHistory();
const {deckId} = useParams();

  return (
    <div>
      <button className="btn btn-primary mr-2" onClick={() => history.push(`/study/${deckId}/study`)}><span className='oi oi-book mx-1'></span>Study</button>
    </div>
  )
}
