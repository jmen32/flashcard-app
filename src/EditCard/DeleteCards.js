import React from "react";
import { deleteCard } from "../utils/api";

function DeleteCards({ card }) {

    const deleteHandle = async () => {
        const confirmed = window.confirm("Delete this card? \n You will not be able to recover it.")
        if(confirmed && card && card.id){
            try{
            deleteCard(card.id)
            }catch(error){
                return console.error
            }
        }
    };
    //instead of window.reload use pop();

    // console.log(card)
    
    return(
        <button type="button" className="btn btn-danger" onClick={deleteHandle}>
            <span className="oi oi-trash"></span>
        </button>
    )
}
export default DeleteCards;