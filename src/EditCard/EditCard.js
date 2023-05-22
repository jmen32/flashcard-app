import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import BreadcrumbNav from './BreadcrumbNav';
import { readDeck, readCard, updateCard } from '../utils/api';
import CardForm from './CardForm';

export default function EditCard() {
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({
    front: '',
    back: '',
    id: '',
    deckId: '',
  });
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeckAndCard() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
      const loadedCard = await readCard(cardId);
      setCard(loadedCard);
      setFormData({
        id: loadedCard.id,
        front: loadedCard.front,
        back: loadedCard.back,
        deckId: loadedDeck.id,
      });
    }
    loadDeckAndCard();
  }, [cardId, deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCard = await updateCard({ ...formData });
    setCard(updatedCard);
    history.push(`/decks/${deckId}`);
  };

  const handleCancel = (event) => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <BreadcrumbNav EditCard={EditCard} card={card} deck={deck} />

      <h2>Edit Card</h2>

      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}