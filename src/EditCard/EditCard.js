import React, {useState, useEffect} from 'react'
import BreadcrumbNav from './BreadcrumbNav'
import { useParams, useHistory } from 'react-router-dom'
import { readDeck, readCard, updateCard } from '../utils/api'

export default function EditCard() {
    const [card, setCard] = useState({})
    const [deck, setDeck] = useState([])
    const [formData, setFormData] = useState({
        front: "",
        back: "",
    });
    const { deckId, cardId } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function loadDeckAndCard(){
            const loadedDeck= await readDeck(deckId)
            setDeck(loadedDeck)
            // console.log(loadedDeck)
            const loadedCard =  await readCard(cardId)
            setCard(loadedCard)
            // console.log(loadedCard)
            setFormData({
                id: loadedCard.id,
                front: loadedCard.front,
                back: loadedCard.back,
            });
        }
        loadDeckAndCard();
    }, [cardId, deckId])
  
const handleChange = ({ target }) => {
  setFormData({
    ...formData,
    [target.name]: target.value,
  });
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const updatedCard = await updateCard({ ...formData, id: cardId });
  console.log(updatedCard);
  setCard(updatedCard);
  history.push(`/decks/${deck.id}/cards/${updatedCard.id}`);
};

  const handleCancel = (event) => {
    history.push(`/decks/${deckId}`)
  }

  return (
    <div>
        <BreadcrumbNav EditCard={EditCard} card={card} deck={deck}/>

        <h2>Edit Card</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            type="text"
            className="form-control"
            id="front"
            name="front"
            rows="3"
            placeholder="front side of card"
            onChange={handleChange}
            value={formData.front}
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
            onChange={handleChange}
            value={formData.back}
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
