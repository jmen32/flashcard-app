import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteCard } from '../utils/api';

export default function CardList() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);

  console.log(deck);

  useEffect(() => {
    async function loadDeck() {
      const deck = await readDeck(deckId);
      setDeck(deck);
      setCards(deck.cards);
    }
    loadDeck();
  }, [deckId]);

  const deleteHandle = async (cardId) => {
    const confirmed = window.confirm(
      'Delete this card? You will not be able to recover it.'
    );
    if (confirmed) {
      await deleteCard(cardId);
      history.push('/');
    }
  };

  return (
    <div>
      <h2 className="deck-cards my-2">Cards</h2>
      {cards.map((card, index) => {
        return (
          <div className="deck-card card mt-2" key={index}>
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
                <button className="btn btn-secondary mr-1">
                  <span className="oi oi-pencil mr-2"></span>Edit
                </button>
              </Link>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteHandle(card.id)}
              >
                <span className="oi oi-trash"></span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}