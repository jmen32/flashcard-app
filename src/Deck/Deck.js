import React, { useState, useEffect } from 'react'
import { readDeck } from "../utils/api"
import { useParams, Link } from "react-router-dom"
import DeckDelete from './DeckDelete';
import DeckNavBar from './DeckNavBar';
import CardList from '../EditCard/CardList';

export default function Deck() {
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([])
    const { deckId } = useParams();

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
      <DeckNavBar deck={deck}/>
      <div>
        <h2>{deck.name}</h2>
        <h6>{deck.description}</h6>
        <div className="row">
          <div className="col-sm-8">
            <div className="btn-group">
              <Link to={`/decks/${deck.id}/edit`}>
                <button className="btn btn-dark mr-2">
                <span className="oi oi-pencil"></span> Edit
                </button>
              </Link>

              <Link to={`/decks/${deck.id}/study`}>
                <button className="btn btn-primary mr-2">
                <span className="oi oi-book"></span> Study
                </button>
              </Link>

              <Link to={`/decks/${deck.id}/cards/new`}>
                <button className="btn btn-primary mr-2">
                <span className="oi oi-plus"></span> Add Card
                </button>
              </Link>

            </div>
          </div>
          <div className="col-sm-4 float-right">
            <DeckDelete deck={deckId}/>
          </div>
        </div>
      </div>
      <div> 
        <CardList cards={cards}/>
      </div>
    </div>
  )
}