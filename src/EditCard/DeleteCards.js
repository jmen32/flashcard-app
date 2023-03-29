import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeleteCards({ deck }) {

    const history = useHistory();

    const deleteHandle = async () => {
        const confirmed = window.confirm("Delete this card? \n You will not be able to recover it.")
        if(confirmed){
            await deleteDeck(deck.id).then(() => history.push("/"))
        }
    };
    
    return(
        <button type="button" className="btn btn-danger" onClick={deleteHandle}>
            <span className="oi oi-trash"></span>
        </button>
    )
}
export default DeleteCards;