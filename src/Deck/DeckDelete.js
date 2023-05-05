import React from "react";
import { useHistory,} from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckDelete({ deckId }) {
    const history = useHistory();

    const deleteHandle = () => {
        const confirmed = window.confirm("Delete this deck? \n You will not be able to recover it.")
        if(confirmed){
            deleteDeck(deckId)
            .then(() => history.push("/"))
        }
    };
    
    return(
        <button type="button" className="btn btn-danger float-right" onClick={deleteHandle}>
            <span className="oi oi-trash"></span>
        </button>
    )
}
export default DeckDelete;