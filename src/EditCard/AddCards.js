import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api/index';
import BreadcrumbNav from './BreadcrumbNav';
import CardForm from './CardForm';

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({
    front: '',
    back: '',
  });

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCard = {
      front: formData.front,
      back: formData.back,
    };
    await createCard(deckId, newCard);
    setFormData({
      front: '',
      back: '',
    });
    // Refresh the deck data
    const loadedDeck = await readDeck(deckId);
    setDeck(loadedDeck);
  };

    const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <BreadcrumbNav AddCard={AddCard} deck={deck} />

      <h2>{deck && `${deck.name}: Add Card`}</h2>

      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={handleDone}
      >
        Done
      </button>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );

}

export default AddCard;