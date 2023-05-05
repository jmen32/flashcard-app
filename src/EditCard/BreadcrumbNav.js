import React from 'react'
import { Link } from 'react-router-dom'

export default function BreadcrumbNav({deck, card, AddCard, EditCard}) {
    return (
        <div>
            {deck && (
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                </li>
                {AddCard && (
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Card
                    </li>)}
                {EditCard && (
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card {card.id}
                    </li>
                )}
                </ol>
                </nav>
            )}
        </div>
    )
}
