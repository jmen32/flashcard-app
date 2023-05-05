import React, { useEffect, useState } from "react"
import { readDeck } from "../utils/api"
import { Link, useParams, useHistory } from "react-router-dom"

function Study(){
    const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState([]);
    const [cardCount, setCardCount] = useState(0);
    const [cardNumber, setCardNumber] = useState(0)
    const [front, setFront] = useState(true)
    const { deckId } = useParams();

    const history = useHistory();
    // loads deck from readDeck api
    useEffect(() => {
        async function loadCards() {
            const list = await readDeck(deckId);
            setDeck(list)
            setCardCount(list.cards.length)
            setCards(list.cards)
            setFront(true)
        }
        loadCards();
    }, [deckId])


    function nextCard(){
        if (cardNumber < cardCount - 1){
            setCardNumber(cardNumber + 1);
            setFront(true)
        }else{
            const restartDeck = window.confirm("restart cards? /n Click 'cancel' to return to the home page.")
            if(restartDeck){
                // return to beginning of deck
                setCardNumber(0);
                setFront(true)
            }else {
                history.push('/')
            }
        }
    }

    const flipHandler = (event) => {
        if(front){
            setFront(false);
        }else {
            setFront(true)
        }
    }

    function showNextButton(){
        if(front){
            return null;
        }else{
            return(
                <button className="btn btn-primary mx-1" onClick={nextCard}>Next</button>
            )
        }
    }

    function notEnoughCards(){
        if(cards.length < 3){
            return(
                <div>
                <h2>Not enough cards.</h2>
                <p>You need atleast 3 cards to study. There are {cards.length} cards in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`}>
                <button className="btn btn-primary mr-2">
                <span className="oi oi-plus"></span> Add Card
                </button>
                </Link>
                </div>
            )
        }
    }

    return(
        <div>
        {/* creates a nav on top of the card  */}
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item">Study</li>
            </ol>
        </nav>

        <h3>Study: {deck.name}</h3>
        <div className="card">
          <div className="card-body">
            {notEnoughCards() || (
              <div>
                <h5 className="card-title">
                  Card {cardNumber + 1} of {cardCount}
                </h5>

                <div>
                  {cards[cardNumber] && (
                    <div>
                      <div className="card-text">
                        {front ? cards[cardNumber].front : cards[cardNumber].back}
                      </div>
                    </div>
                  )}
                </div>
                
                <button className="btn btn-secondary mx-1" onClick={flipHandler}>
                  Flip
                </button>
                {showNextButton()}
              </div>
            )}
          </div>
        </div>
      </div>
    )
}   

export default Study;