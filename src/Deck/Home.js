import React from "react";
import { useHistory } from "react-router-dom";
import DeckList from "./DeckList";

function Home () {
    const history = useHistory()

    return(
        <div>
            <button className="btn btn-secondary" type="button" onClick={() => history.push("/decks/new")}>
                <span style={{fontWeight: "bolder"}}>+ </span>
                Create Deck
            </button>
            
            <DeckList />
        </div>
    )
}


export default Home;