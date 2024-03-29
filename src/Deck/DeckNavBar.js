import React from 'react'
import { Link } from 'react-router-dom'

export default function DeckNavBar({deck, DeckEdit}) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span>Home</Link></li>
          <li className="breadcrumb-item">{deck.name}</li> 
          {/* link */}
          {DeckEdit && (
            <li className="breadcrumb-item">Edit Deck</li>
          )}
        </ol>
      </nav>        
    </div>
  )
}
