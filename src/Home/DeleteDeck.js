import React from 'react'
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api"

export default function DeleteDeck({deckId}) {
    const history = useHistory();

    function deleteHandler() {
        const confirmDelete = window.confirm("Delete this deck? \n You will not be able to recover it")

        if(confirmDelete){
            deleteDeck(deckId)
            .then(history.push('/'))
            .then(window.location.reload())
        }
    }

    return (
        <button className="btn btn-danger float-right" onClick={deleteHandler}>
            Delete
        </button>
    )
}

