import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import BreadcrumbNav from "./BreadcrumbNav";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  function handleFrontChange(event) {
    setFront(event.target.value);
  }

  function handleBackChange(event) {
    setBack(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newCard = {
      front: front,
      back: back,
    };
    await createCard(deckId, newCard);
    setFront("");
    setBack("");
    // Refresh the deck data
    const loadedDeck = await readDeck(deckId);
    //implement into deck
    setDeck(loadedDeck);
  }

  return (
    <div>
      <BreadcrumbNav AddCard={AddCard} deck={deck}/>

      <h2>{deck && `${deck.name}: Add Card`}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            placeholder="front side of card"
            value={front}
            onChange={handleFrontChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="3"
            placeholder="Back side of card"
            value={back}
            onChange={handleBackChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;