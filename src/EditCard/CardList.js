import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import DeleteCards from './DeleteCards'
import { readDeck } from '../utils/api'

export default function CardList({cards}) {
const { deckId } = useParams();
const [deck, setDeck] = useState([])
// no params() not the last string on url
// const {id, setId} = useState({})

 useEffect(() => {
    async function loadDeck(){
        const deck = await readDeck(deckId);
        setDeck(deck)
    }
    loadDeck();
  }, [deckId])
// get deckId from query string

  return (
    <div>
      <h2 className='deck-cards my-2'>Cards</h2>
      {cards.map((card, index) => {
        return (
          <div className='deck-card card mt-2' key={index}>
            <div className="card-body row">
              <div className="col-md-5 p1-3">   
                <p className="card-text ">{card.front}</p>
              </div>
              <div className="col-md-5 ml-auto">
                <p className="card-text">{card.back}</p>
              </div>
            </div>
            <div className="ml-auto mt-2">
              
            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
              <button className="btn btn-secondary mr-1"><span className="oi oi-pencil mr-2"></span>Edit</button></Link>

            <DeleteCards card={card}/>
          </div>
        </div>
        )
      })}
    </div>
  )
}
