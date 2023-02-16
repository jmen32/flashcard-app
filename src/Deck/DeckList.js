import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { listDecks } from "../utils/api"
import DeleteDeck from "./DeleteDeck";



function DeckList(){
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function getDecks() {
            const list = await listDecks();
            setDecks(list)
            console.log(list)
        }
        getDecks();
    }, [])

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
                    <DeleteDeck deckId={deck.id} />
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