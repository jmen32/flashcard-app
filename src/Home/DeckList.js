import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
// import DeckDelete from "../Deck/DeckDelete";
import { listDecks, deleteDeck } from "../utils/api"


function DeckList(){
    const [decks, setDecks] = useState([]);
    const history = useHistory();
    // const { deckId } = useParams();

    useEffect(() => {
        async function getDecks() {
            const list = await listDecks();
            setDecks(list)
        }
        getDecks();
    }, [])

    //create deckDelete functionality
    const deleteHandle = async (id) => {
    const confirmed = window.confirm(
    "Delete this deck? You will not be able to recover it."
    );
    if (confirmed) {
            await deleteDeck(id);
            const list = await listDecks()
            setDecks(list)
            history.push("/");
        }

    }
    
    const ViewDecks = decks.map((deck) => {
        return (
            <div className="border rounded p-2 my-2" key={deck.id}>
                <div>
                    <h3>{deck.name}
                    <small className="float-right">{deck.cards.length} cards</small></h3>
                </div>
                <div>
                    <p>{deck.description}</p>
                </div>
                <div>
                    <button className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>
                        <span className="oi oi-eye mx-1"></span>
                        View
                    </button>
                    <button className="btn btn-primary" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                        <span className="oi oi-book mx-1"></span>
                        Study
                    </button>
                    <button type="button" className="btn btn-danger float-right" onClick={() => deleteHandle(deck.id)}>
                        <span className="oi oi-trash"></span>
                    </button>
                </div>
            </div>
        )
    })

    return (
        <div className="decks">
            {ViewDecks}
        </div>
    )
}

export default DeckList

