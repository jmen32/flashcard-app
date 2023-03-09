import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api"


function CreateNewDeck(){

    
    const history = useHistory();
    const initialFormState = {
        name: "",
        description: ""
    }

    const [formData, setFormData] = useState({...initialFormState});
    
    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    async function handleSubmit (event){
        event.preventDefault();
        const abortController = new AbortController()
        const deck = await createDeck({...formData}, abortController.signal)
        history.push(`/deck/${deck.id}`)
        return deck
    }

    const handleCancel = (event) => {
        history.push("/")
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h2>Create Deck</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <br/>
                <input type="text" className="form-control" id="name" name="name" placeholder="Deck Name" onChange={handleChange} value={formData.name}/>
                </div>

                <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <br/>
                <textarea id="description" className="form-control" rows={4} name="description" placeholder="Brief description of the deck" onChange={handleChange} value={formData.description}/>
                </div>

                <button type="button" className="btn btn-secondary mr-1" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateNewDeck;