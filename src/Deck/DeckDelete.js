import React from "react";
import { useHistory,} from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckDelete({ deckId }) {
    const history = useHistory();

    const deleteHandle = async () => {
    const confirmed = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmed) {
      try {
        await deleteDeck(deckId);
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
    }
    
    return(
        <button type="button" className="btn btn-danger float-right" onClick={deleteHandle}>
            <span className="oi oi-trash"></span>
        </button>
    )
}

export default DeckDelete;