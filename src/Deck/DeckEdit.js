import React, { useState, useEffect } from 'react'
import DeckNavBar from './DeckNavBar'
import { useParams, useHistory } from 'react-router-dom'
import { updateDeck, readDeck } from '../utils/api';

export default function DeckEdit() {
  const [deck, setDeck] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setFormData(response);
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
    const updatedDeck = await updateDeck({ ...formData});
    history.push(`/decks/${deck.id}`);
    return updatedDeck;
  };

  const handleCancel = (event) => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <DeckNavBar DeckEdit={DeckEdit} deck={deck} />

      <h2>Edit Deck</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <br />
          <textarea
            id="description"
            className="form-control"
            rows={4}
            name="description"
            placeholder="Brief description of the deck"
            onChange={handleChange}
            value={formData.description}
          />
        </div>

        <button type="button" 
        className="btn btn-secondary mr-1" 
        onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}