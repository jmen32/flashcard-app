import React, { useState, useEffect } from 'react'
import { readDeck } from "../utils/api"
import { useParams, useHistory, Link, useRouteMatch } from "react-router-dom"
import AddCards from './AddCards';
import DeckStudy from './DeckStudy';
import DeckEdit from './DeckEdit';
import DeckDelete from './DeckDelete';

export default function Deck() {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([])

    const { deckId } = useParams();
    const history = useHistory();
    const url = useRouteMatch();

  useEffect(() => {
    async function loadDeck(){
        const deck = await readDeck(deckId);
        setDeck(deck)
        setCards(deck.cards)
    }
    loadDeck();
  }, [deckId])


  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item">{deck.name}</li>
        </ol>
      </nav>
      <div>
        <h2>{deck.name}</h2>
        <h6>{deck.description}</h6>
        <div className='btn-group'>
        <DeckEdit deck={deck} cards={cards}/>
        <DeckStudy />
        <AddCards />
        <DeckDelete />
        </div>
      </div>
      <div>
      <h2>Cards</h2>
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


          <button
            type="button"
            className="btn btn-dark mr-2"
            onClick={() =>
              history.push(`/decks/${deckId}/cards/${card.id}/edit`)
            }
          >
            <span className="oi oi-pencil" /> Edit
          </button>

          <button type="button" className="btn btn-danger">

            <a href={url} className="text-white" >
              <span className="oi oi-trash" />
            </a>
          </button>


          </div>
        </div>
        )
      })}
      </div>
    </div>
    
  )
}